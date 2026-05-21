import { Router, type Request, type Response, type NextFunction } from 'express';
import { SesamiURL } from '../../config/URL.config';
import {
    buildProxyAuthHeaders,
    copyUpstreamQuery,
    resolveProxyShopId,
} from '../../authentication/SesamiProxyAuth';
import { HttpCode } from '../../exceptions/Error.interface';

const SESAMI_API_BASE_URL = new URL(SesamiURL.api).toString().replace(/\/+$/, '');

function appendQueryToUrl(url: URL, req: Request) {
    for (const [key, value] of Object.entries(copyUpstreamQuery(req))) {
        if (Array.isArray(value)) {
            for (const item of value) {
                url.searchParams.append(key, String(item));
            }
        } else {
            url.searchParams.set(key, String(value));
        }
    }
}

function isMissingShopIdError(err: unknown): err is Error {
    return (
        err instanceof Error &&
        err.message.startsWith('Missing shopId')
    );
}

async function forwardToSesami(
    req: Request,
    res: Response,
    next: NextFunction,
    targetUrl: string,
) {
    try {
        const method = req.method.toUpperCase();
        const headers = await buildProxyAuthHeaders(req, method);

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

async function handleSesamiProxy(
    req: Request,
    res: Response,
    next: NextFunction,
    buildTargetUrl: (shopId: string) => string,
) {
    try {
        const shopId = resolveProxyShopId(req);
        return forwardToSesami(req, res, next, buildTargetUrl(shopId));
    } catch (err) {
        if (isMissingShopIdError(err)) {
            return res.status(HttpCode.BAD_REQUEST).json({ message: err.message });
        }
        return next(err);
    }
}

export const sesamiAdminProxyRoute: Router = Router();

sesamiAdminProxyRoute.get(
    '/resources',
    async (req: Request, res: Response, next: NextFunction) => {
        return handleSesamiProxy(req, res, next, (shopId) => {
            const url = new URL(
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/resources`,
            );
            appendQueryToUrl(url, req);
            return url.toString();
        });
    },
);

sesamiAdminProxyRoute.get(
    '/services',
    async (req: Request, res: Response, next: NextFunction) => {
        return handleSesamiProxy(req, res, next, (shopId) => {
            const url = new URL(
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/services`,
            );
            appendQueryToUrl(url, req);
            return url.toString();
        });
    },
);

sesamiAdminProxyRoute.get(
    '/services/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/services/${encodeURIComponent(id)}`,
        );
    },
);

sesamiAdminProxyRoute.patch(
    '/services/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/services/${encodeURIComponent(id)}`,
        );
    },
);

sesamiAdminProxyRoute.post(
    '/resources',
    async (req: Request, res: Response, next: NextFunction) => {
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/resources`,
        );
    },
);

sesamiAdminProxyRoute.get(
    '/resources/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/resources/${encodeURIComponent(id)}`,
        );
    },
);

sesamiAdminProxyRoute.patch(
    '/resources/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/resources/${encodeURIComponent(id)}`,
        );
    },
);

sesamiAdminProxyRoute.delete(
    '/resources/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        return handleSesamiProxy(
            req,
            res,
            next,
            (shopId) =>
                `${SESAMI_API_BASE_URL}/api/v1/${encodeURIComponent(shopId)}/resources/${encodeURIComponent(id)}`,
        );
    },
);
