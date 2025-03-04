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
```
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