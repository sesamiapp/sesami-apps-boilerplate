ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
EXPOSE 80


# -------------------------
# Dev stage
# -------------------------
FROM base AS dev
ARG DATABASE_URL
ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x

# Install deps (as root during build)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.npm \
    yarn install --frozen-lockfile

# IMPORTANT: allow USER node to modify Prisma client files
RUN chown -R node:node /usr/src/app/node_modules

USER node

# Force Prisma 6 generate (MongoDB-friendly) and then start dev server
CMD sh -lc "npx prisma@6 generate && yarn dev"


# -------------------------
# Build deps stage
# -------------------------
FROM base AS build-deps
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock

# Install as root then fix ownership (so generate/build can run as node if needed)
RUN yarn install --frozen-lockfile
RUN chown -R node:node /usr/src/app/node_modules


# -------------------------
# Prod deps stage
# -------------------------
FROM base AS prod-deps
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production


# -------------------------
# Build stage
# -------------------------
FROM build-deps AS build
COPY --chown=node:node . ./

USER node
RUN npx prisma@6 generate
RUN yarn build


# -------------------------
# Production runtime stage
# -------------------------
FROM base AS prod
WORKDIR /usr/src/app

COPY --from=prod-deps /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 80
CMD ["yarn", "start"]
