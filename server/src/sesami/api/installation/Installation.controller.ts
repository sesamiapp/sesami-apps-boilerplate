import { NextFunction, Request, Response } from 'express';

import { InstallationService } from '../../installation';
import config from '../../config/Build.config';
import { SesamiURL } from '../../config/URL.config';

export class InstallationController {
    public static async initiateInstallation(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            if (!req.query.shopId || !req.query.hmac) {
                return res.status(400).json({ message: 'Invalid request' });
            }
            const initiateResult =
                await InstallationService.initiateInstallation(
                    req.query.shopId as string,
                    req.query.hmac as string,
                    req.query.timestamp as string,
                );
            if (initiateResult.done) {
                return res.status(300).redirect(
                    `${SesamiURL.api}api/v1/oauth/authorization?clientId=:clientId&shopId=:shopId&scopes[]=:scopes&redirectUri=:redirectUri`
                        .replace(':shopId', req.query.shopId as string)
                        .replace(
                            ':redirectUri',
                            `${config.baseUrl}oauth/call-back`,
                        )
                        .replace(':scopes', String(initiateResult.scopes))
                        .replace(':clientId', config.sesamiClientId),
                );
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }
        } catch (err) {
            next(err);
        }
    }

    public static async authorization(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            if (
                !req.query.shopId ||
                !req.query.code ||
                !req.query.hmac ||
                !req.query.timestamp
            ) {
                res.status(400).json({ message: 'Invalid request' });
            }

            const authorizationResult = await InstallationService.authorization(
                req.query.shopId as string,
                req.query.code as string,
                req.query.hmac as string,
                req.query.timestamp as string,
            );

            if (authorizationResult.done) {
                res.status(200).redirect(`${SesamiURL.admin}app`);
            } else {
                res.status(400).json({ message: 'Invalid request' });
            }
        } catch (err) {
            next(err);
        }
    }
}
