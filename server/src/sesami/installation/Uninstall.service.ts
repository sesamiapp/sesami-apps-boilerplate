import { ShopRepository } from './Shop.repository';
import { logger } from '../logger';

export class UninstallationService {
    private static shopRepository = new ShopRepository();

    public static async uninstall(shopId: string) {
        try {
            const deletedShop =
                await UninstallationService.shopRepository.delete(shopId);
            if (!deletedShop) {
                logger.error('uninstall failed');
            }
            return {
                message: 'uninstalled',
            };
        } catch (e) {
            logger.error(`uninstall failed:${e}`);
        }
    }
}
