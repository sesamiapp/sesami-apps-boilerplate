ARG NODE_VERSION=20.9.0


FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 80

FROM base as dev
ARG DATABASE_URL
ENV PRISMA_CLI_BINARY_TARGETS linux-musl-openssl-3.0.x
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.npm \
    yarn install --frozen-lockfile
USER node
CMD yarn prisma:generate && yarn dev

FROM base as build-deps
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM base as prod-deps
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile  --production

FROM build-deps as build
COPY --chown=node:node . ./
RUN yarn prisma:generate
RUN yarn build

FROM base as prod
WORKDIR /usr/src/app
COPY --from=prod-deps /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 80

CMD ["yarn", "start"]

