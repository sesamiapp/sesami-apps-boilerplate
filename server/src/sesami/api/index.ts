import { Router } from 'express';
export const router: Router = Router();
export const ShopRouter: Router = Router({ mergeParams: true });
router.use('/shop/:shop_id', ShopRouter);
