import config from '../config/Build.config';
import { ShopNotFoundById } from '../exceptions';
import { logger } from '../logger';
import { ShopRepository } from './Shop.repository';
import { SesamiURL } from '../config/URL.config';

export class SesamiService {
    private static shopRepository = new ShopRepository();

    public async getShopInformation(shopId: string): Promise<any> {
        try {
            const shop = await SesamiService.shopRepository.getById(shopId);
            if (!shop) {
                throw new ShopNotFoundById();
            }
            const apiKey = shop.apiKey;

            const url =
                SesamiURL.api + SesamiURL.getShop.replace(':shopId', shopId);
            const header = {
                'x-api-key': `${apiKey}`,
                'x-shop-id': `${shop.shopId}`,
                'x-client-id': `${config.sesamiClientId}`,
            };
            const response = await fetch(url, {
                method: 'GET',
                headers: header,
            });
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
