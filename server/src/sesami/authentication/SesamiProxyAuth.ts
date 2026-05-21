import type { Request } from 'express';
import config from '../config/Build.config';
import { InstallationStatus } from '../installation/Installation.service';
import { ShopRepository } from '../installation/Shop.repository';
import { ShopNotFoundById, UnauthenticatedError } from '../exceptions';

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export function resolveShopId(req: Request): string | undefined {
    const fromQuery = req.query.shopId;
    if (typeof fromQuery === 'string' && fromQuery.length > 0) {
        return fromQuery;
    }
    const fromHeader = req.headers['x-shop-id'];
    if (typeof fromHeader === 'string' && fromHeader.length > 0) {
        return fromHeader;
    }
    return undefined;
}

export function copyUpstreamQuery(
    req: Request,
): Record<string, string | string[]> {
    const query: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(req.query)) {
        if (key === 'shopId' || value === undefined || value === null) {
            continue;
        }
        query[key] = value as string | string[];
    }
    return query;
}

export function resolveProxyShopId(req: Request): string {
    if (config.sesamiAuthMode === 'offline') {
        const shopId = resolveShopId(req);
        if (!shopId) {
            throw new Error('Missing shopId. Provide shopId query param or x-shop-id header.');
        }
        return shopId;
    }
    return requiredEnv('sesami_ADMIN_SHOP_ID');
}

export function buildEnvAuthHeaders(method: string) {
    const isReadOnly = method === 'GET' || method === 'HEAD';
    const shopId = requiredEnv('sesami_ADMIN_SHOP_ID');
    return {
        'x-api-key': requiredEnv(
            isReadOnly ? 'read_SESAMI_API_KEY' : 'write_SESAMI_API_KEY',
        ),
        'x-client-id': requiredEnv(
            isReadOnly ? 'read_SESAMI_CLIENT_ID' : 'write_SESAMI_CLIENT_ID',
        ),
        'x-shop-id': shopId,
        'content-type': 'application/json',
    } as const;
}

const shopRepository = new ShopRepository();

export async function buildOfflineAuthHeaders(shopId: string) {
    const shop = await shopRepository.getBySesamiId(shopId);
    if (!shop) {
        throw new ShopNotFoundById({ shopId });
    }
    if (
        shop.installationStatus !== InstallationStatus.INSTALLED ||
        !shop.apiKey
    ) {
        throw new UnauthenticatedError({
            shopId,
            reason: 'Shop is not installed or missing offline API key',
        });
    }
    return {
        'x-api-key': shop.apiKey,
        'x-client-id': config.sesamiClientId,
        'x-shop-id': shop.shopId,
        'content-type': 'application/json',
    } as const;
}

export async function buildProxyAuthHeaders(req: Request, method: string) {
    if (config.sesamiAuthMode === 'offline') {
        const shopId = resolveProxyShopId(req);
        return buildOfflineAuthHeaders(shopId);
    }
    return buildEnvAuthHeaders(method);
}
