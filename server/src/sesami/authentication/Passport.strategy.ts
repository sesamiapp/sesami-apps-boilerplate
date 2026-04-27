import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { logger } from '../logger';
import config from '../config/Build.config';
import { ShopRepository, InstallationStatus } from '../installation';

const urlStrategyOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: config.sesamiClientSecret
};

const shopRepository = new ShopRepository();
export const JwtURLStrategy = new Strategy(urlStrategyOptions,async (jwt_payload, done) => {
    try {
        const { clientId, shopId } = jwt_payload;

        const shop = await shopRepository.getBySesamiId(shopId);
        if(!shop) {
            return done(null, false, { message: 'Invalid shopId' });
        }

        const isInvalidClientId = clientId !== config.sesamiClientId;
        const isInvalidShopStatus = !shop ||
            (shop.installationStatus !== InstallationStatus.INSTALLED && !shop.lastGetPermissionRetry) ||
            !shop.scope;

        if (isInvalidClientId || isInvalidShopStatus) {
            logger.warn(`Invalid clientId or shop: clientId=${clientId}, shopId=${shopId}`);
            return done(null, false, { message: 'Invalid clientId or shop status' });
        }

        return done(null, jwt_payload);
    } catch (err) {
        logger.error('Error in JWT strategy:', err);
        return done(err, false);
    }
})