import * as process from 'process';

export type SesamiAuthMode = 'env' | 'offline';

function parseSesamiAuthMode(value: string | undefined): SesamiAuthMode {
    const mode = (value || 'env').toLowerCase();
    if (mode === 'env' || mode === 'offline') {
        return mode;
    }
    throw new Error(
        `Invalid SESAMI_AUTH_MODE "${value}". Expected "env" or "offline".`,
    );
}

const normalizedURL = (url: string): string => {
    let result = url;
    if (!result.endsWith('/')) {
        result += '/';
    }
    return result;
};

export default {
    port: process.env.PORT || 80,
    environment: process.env.NODE_ENV || 'development',
    sesamiClientId: String(process.env.SESAMI_CLIENT_ID),
    sesamiClientSecret: String(process.env.SESAMI_CLIENT_SECRET),
    baseUrl: normalizedURL(String(process.env.APP_DOMAIN)),
    isOAuthEnable: false, // change to true in production or when you want to test oauth flow
    sesamiAuthMode: parseSesamiAuthMode(process.env.SESAMI_AUTH_MODE),
};
