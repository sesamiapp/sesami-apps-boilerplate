import { logger } from '../../logger';
import { NextFunction, Request, Response } from 'express';
import { InvalidShopId, ShopNotFoundById } from '../../exceptions';
import { ShopRepository } from '../../installation';
import { isValidMongoId } from '../../utils/IsMongoId.helper';

const shopRepository = new ShopRepository();

const resolveShopId = (req: Request): string | null => {
    let shopId = null;
    if (req.params && req.params['shopId']) {
        shopId = req.params['shopId'];
    } else if (req.query && req.query['shopId']) {
        shopId = req.query['shopId'];
    } else if (req.body && req.body['shopId']) {
        shopId = req.body['shopId'];
    } else if (req.body?.data?.shopId) {
        shopId = req.body.data.shopId;
    }
    return shopId;
};

export async function ShopIdValidationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const sesamiShopId = resolveShopId(req);
        if (!sesamiShopId) {
            throw new InvalidShopId();
        }
        const { error } = isValidMongoId(sesamiShopId);
        if (error) {
            throw new InvalidShopId();
        }

        const shopExists = await shopRepository.getBySesamiId(sesamiShopId);
        if (!shopExists) {
            throw new ShopNotFoundById();
        } else {
            req.params.internalShopId = shopExists.id;
        }
        next();
    } catch (err) {
        if (err == 'P2023') {
            next(new InvalidShopId());
        }
        logger.error(err);
        next(err);
    }
}
