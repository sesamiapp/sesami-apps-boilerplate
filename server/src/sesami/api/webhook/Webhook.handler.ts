import { NextFunction, Request, Response } from 'express';
import { validateHmac } from '../../authentication/Hmac.validation';
import { UnauthenticatedError } from '../../exceptions';
import { UninstallationService } from '../../installation';
import { logger } from '../../logger';
import { WebhookType } from './Webhook.type';


export class WebhookHandler {
    public static async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const hmac = req.body.hmac;

            if (
                !validateHmac(req.body.data, hmac)
            ) {
                return next(new UnauthenticatedError());
            }

            const event = req.body.event;
            if (event === WebhookType.UNINSTALL) {
                await UninstallationService.uninstall(
                    req.params.internalShopId,
                );
            }
            return res.status(200).send({ message: `webhook: ${event} received` });
        } catch (e) {
            logger.error(e);
            next(e);
        }
    }
}
