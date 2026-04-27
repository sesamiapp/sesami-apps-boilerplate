import { ShopRepository } from './Shop.repository';
import { SesamiService } from './Sesami.service';
import { ShopNotFoundById } from '../exceptions';
import { validateHmac } from '../authentication/Hmac.validation';

export enum InstallationStatus {
    INITIATED = 'INITIATED',
    INSTALLED = 'INSTALLED',
    AUTHORIZED = 'AUTHORIZED',
    UNINSTALLED = 'UNINSTALLED',
}

export const CURRENT_APP_PERMISSIONS = 'Shop:Read';

export class InstallationService {
    private static shopRepository = new ShopRepository();
    private static sesamiService = new SesamiService();

    static async isShopInstalled(shopId: string) {
        const shop =
            await InstallationService.shopRepository.getBySesamiId(shopId);
        if (!shop) {
            return false;
        }
        return shop && shop.installationStatus === InstallationStatus.INSTALLED;
    }

    static async initiateInstallation(
        shopId: string,
        hmac: string,
        timestamp: string,
    ) {
        const shop =
            await InstallationService.shopRepository.getBySesamiId(shopId);

        if (!validateHmac({ shopId: shopId, timestamp: timestamp }, hmac)) {
            return { done: false };
        }

        await InstallationService.shopRepository.createOrUpdate(shopId, {
            installationStatus: InstallationStatus.INITIATED,
        });
        const scopes = CURRENT_APP_PERMISSIONS;

        return { scopes, shop, done: true };
    }

    static async authorization(
        shopId: string,
        code: string,
        hmac: string,
        timestamp: string,
    ) {
        try {
            const shop = await this.shopRepository.getBySesamiId(shopId);
            if (!shop) {
                throw new ShopNotFoundById();
            }

            if (
                !validateHmac(
                    { code, shopId: shopId, timestamp: timestamp },
                    hmac,
                )
            ) {
                return { done: false };
            }

            if (shop.installationStatus !== InstallationStatus.INITIATED) {
                return { done: false };
            }

            const updatedShop = await InstallationService.shopRepository.update(
                shop.id,
                {
                    installationStatus: InstallationStatus.AUTHORIZED,
                    scope: CURRENT_APP_PERMISSIONS,
                    lastGetPermissionRetry: null,
                },
            );

            if (!updatedShop) {
                throw new ShopNotFoundById();
            }

            await this.requestApiKey(shopId, code);

            return { shopId, code, hmac, done: true };
        } catch (error) {
            throw error;
        }
    }

    static async requestApiKey(shopId: string, code: string) {
        const apiKey = await this.sesamiService.getAPIKey(code, shopId);
        if (apiKey.token) {
            const updatedShop = await this.shopRepository.updateBySesamiId(
                shopId,
                {
                    apiKey: apiKey.token,
                    installationStatus: InstallationStatus.INSTALLED,
                },
            );

            if (!updatedShop) {
                throw new ShopNotFoundById();
            }
        }
        return true;
    }
}
