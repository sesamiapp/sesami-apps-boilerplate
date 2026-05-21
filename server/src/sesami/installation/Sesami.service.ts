import { ShopNotFoundById } from '../exceptions';
import { logger } from '../logger';
import config from '../config/Build.config';
import { SesamiURL } from '../config/URL.config';
import { buildOfflineAuthHeaders } from '../authentication/SesamiProxyAuth';

export class SesamiService {
    public async getShopInformation(sesamiShopId: string): Promise<any> {
        try {
            const url =
                SesamiURL.api +
                SesamiURL.getShop.replace(':shopId', sesamiShopId);
            const headers = await buildOfflineAuthHeaders(sesamiShopId);
            const response = await fetch(url, {
                method: 'GET',
                headers,
            });
            if (!response.ok) {
                throw new ShopNotFoundById({ sesamiShopId, status: response.status });
            }
            return await response.json();
        } catch (error) {
            logger.error(`Error in getShopInformation: ${error}`);
            throw error;
        }
    }

    async getAPIKey(code: string, shopId: string) {
        try {
            const url = `${SesamiURL.api}${SesamiURL.getOfflineToken}`;
            const body = {
                code,
                shopId: shopId,
                clientId: config.sesamiClientId,
                clientSecret: config.sesamiClientSecret,
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            return await response.json();
        } catch (err) {
            throw err;
        }
    }
}
