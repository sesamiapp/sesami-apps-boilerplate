# 🚀 Sesami App - Development & Production Guide

## 🛠 Prerequisites
- Requires **Docker Compose v2+**

## 🔧 Setting Up the Development Environment

### Start the Backend
Run the following command to start your backend:

```sh
docker compose up
```
Once running, your backend health check should be accessible at:
👉 http://localhost:3000/health

### Load the Frontend
Your frontend is available at: http://localhost:3000/

**Note**: This route requires authentication.In the development phase, you can disable authentication.
### Enabling/Disabling Authentication

Modify the `isOAuthEnable` property in:
```
./server/src/sesami/config/Build.config.ts
```
**Important**: Ensure `isOAuthEnable` is set to `true` before deploying to production.

📄 Environment Variables

🔹 Setting Up Your .env File 

Create a .env file in your project root and define the following variables:
```
PORT=3000
DATABASE_URL=your-database-url
SESAMI_CLIENT_ID=your-client-id
SESAMI_CLIENT_SECRET=your-client-secret
APP_DOMAIN=your-app-domain

# Proxy auth: env (read/write API keys) or offline (per-shop OAuth token from DB)
SESAMI_AUTH_MODE=env
read_SESAMI_API_KEY=your-read-api-key
read_SESAMI_CLIENT_ID=your-read-client-id
write_SESAMI_API_KEY=your-write-api-key
write_SESAMI_CLIENT_ID=your-write-client-id
sesami_ADMIN_SHOP_ID=your-shop-id
```

### Sesami API proxy authentication (`SESAMI_AUTH_MODE`)

The admin UI calls `/api/sesami/*`, which forwards to `https://api.sesami.co`. Use `SESAMI_AUTH_MODE` to choose how those upstream calls are authenticated:

| Mode | Value | Upstream headers | Shop in URL |
|------|-------|------------------|-------------|
| Env keys (default) | `env` | `read_SESAMI_API_KEY` / `write_SESAMI_API_KEY` and matching client IDs | `sesami_ADMIN_SHOP_ID` from `.env` |
| Offline token | `offline` | `shop.apiKey` from MongoDB + `SESAMI_CLIENT_ID` | `shopId` on each proxy request (`?shopId=` or `x-shop-id`) |

**`env` mode:** Set read/write API keys and `sesami_ADMIN_SHOP_ID` as in `.env.sample`. The client may pass `shopId`, but the server uses the env shop id.

**`offline` mode:** Complete the OAuth install flow first so the shop exists in the database with `apiKey` and `installationStatus=INSTALLED`. The client must send `shopId` on every `/api/sesami/*` request (the admin UI reads it from the iframe URL `shopId` query param). Never expose `shop.apiKey` to the browser.

Alternatively, you can pass these variables when running your container.

🚀 Production Build & Deployment

🔨 Building the Production Image

```shell
DOCKER_BUILDKIT=1 docker build . --target prod -t sesami-app
```

▶️ Running the Production Container
```shell
docker run -e PORT=3000 \
           -e DATABASE_URL="your-database-url" \
           -e SESAMI_CLIENT_ID="your-client-id" \
           -e SESAMI_CLIENT_SECRET="your-client-secret" \
           -e APP_DOMAIN="your-app-domain" \
           -p 3000:80 sesami-app
```
### ✅ Final Notes
* Always check your environment variables before running the application.
* Ensure authentication is enabled before deploying to production.
* If you encounter issues, check the container logs:

```shell
docker logs <container_id>
```