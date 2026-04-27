import { Router, type Request, type Response, type NextFunction } from 'express';
import { SesamiURL } from '../../config/URL.config';

const SESAMI_API_BASE_URL = new URL(SesamiURL.api).toString().replace(/\/+$/, '');

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

function buildAuthHeaders(method: string) {
    const isReadOnly = method === 'GET' || method === 'HEAD';
    return {
        'x-api-key': requiredEnv(
            isReadOnly ? 'read_SESAMI_API_KEY' : 'write_SESAMI_API_KEY',
        ),
        'x-client-id': requiredEnv(
            isReadOnly ? 'read_SESAMI_CLIENT_ID' : 'write_SESAMI_CLIENT_ID',
        ),
        'x-shop-id': requiredEnv('sesami_ADMIN_SHOP_ID'),
        'content-type': 'application/json',
    } as const;
}

async function forwardToSesami(
    req: Request,
    res: Response,
    next: NextFunction,
    targetUrl: string,
) {
    try {
        const method = req.method.toUpperCase();
        const headers = buildAuthHeaders(method);

        const upstream = await fetch(targetUrl, {
            method,
            headers,
            body:
                method === 'GET' || method === 'HEAD'
                    ? undefined
                    : JSON.stringify(req.body ?? {}),
        });

        const contentType = upstream.headers.get('content-type') || '';
        res.status(upstream.status);
        if (contentType) {
            res.setHeader('content-type', contentType);
        }

        const text = await upstream.text();
        return res.send(text);
    } catch (err) {
        return next(err);
    }
}

export const sesamiAdminProxyRoute: Router = Router();

sesamiAdminProxyRoute.get(
    '/resources',
    async (req: Request, res: Response, next: NextFunction) => {
        const shop = requiredEnv('sesami_ADMIN_SHOP_ID');
        const url = new URL(
            `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shop)}/resources`,
        );
        for (const [key, value] of Object.entries(req.query)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        }
        return forwardToSesami(req, res, next, url.toString());
    },
);

sesamiAdminProxyRoute.get(
    '/services',
    async (req: Request, res: Response, next: NextFunction) => {
        const shop = requiredEnv('sesami_ADMIN_SHOP_ID');
        const url = new URL(
            `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shop)}/services`,
        );
        for (const [key, value] of Object.entries(req.query)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        }
        return forwardToSesami(req, res, next, url.toString());
    },
);

sesamiAdminProxyRoute.get(
    '/services/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const shop = requiredEnv('sesami_ADMIN_SHOP_ID');
        const { id } = req.params;
        const url = `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shop)}/services/${encodeURIComponent(
            id,
        )}`;
        return forwardToSesami(req, res, next, url);
    },
);

sesamiAdminProxyRoute.patch(
    '/services/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const shop = requiredEnv('sesami_ADMIN_SHOP_ID');
        const { id } = req.params;
        const url = `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shop)}/services/${encodeURIComponent(
            id,
        )}`;
        return forwardToSesami(req, res, next, url);
    },
);

sesamiAdminProxyRoute.post(
    '/resources',
    async (req: Request, res: Response, next: NextFunction) => {
        const shop = requiredEnv('sesami_ADMIN_SHOP_ID');
        const url = `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shop)}/resources`;
        return forwardToSesami(req, res, next, url);
    },
);

