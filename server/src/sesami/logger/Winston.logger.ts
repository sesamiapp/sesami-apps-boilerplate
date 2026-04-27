import { createLogger, format, transports } from 'winston';

const timestampFormat = 'YYYY-MM-DD HH:mm:ss';

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'error',
            handleExceptions: true,
        }),
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: timestampFormat }),
        format.printf((info) => {
            return `[${info.timestamp}] [${info.stack?.split('\n')[0]}] ${info.level}: ${info.message}`;
        }),
    ),
});
