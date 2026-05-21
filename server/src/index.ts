import './loadEnv';
import config from './sesami/config/Build.config';
import { app, prisma } from './application';
import { logger } from './sesami/logger';
import ViteExpress from 'vite-express';

async function main() {
    prisma.$connect();
    ViteExpress.listen(app, parseInt(`${config.port}`), () =>
        console.info(`Server is listening on port ${config.port}...`),
    );

    logger.info(`app starts on ${config.environment} environment.`);
}

main();
