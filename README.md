Requires docker compose 2+

## Spin up a dev env:
`docker compose up`

You should get an "OK" message from: http://localhost:3000/health.

### Load Frontend
Your frontend is accessible at: http://localhost:3000/. 

This route requires authentication. You can enable or disable authentication by modifying the `isOAuthEnable` property in the `./server/src/sesami/config/Build.config.ts` file.

**Note:**

Ensure that the `isOAuthEnable` property is set to `true` before deploying your app to the production environment.

#### Production build
DOCKER_BUILDKIT=1  docker build . --target prod -t sesami-app  

#### Production run command
docker run -e DATABASE_URL="<DATABASE_URL>" -p 3000:80 sesami-app