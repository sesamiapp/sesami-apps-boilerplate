import { NextFunction, Request, Response } from 'express';
import config from '../config/Build.config';
import { jwtAuthenticate } from './Passport.authenticate';
import { validateHmac } from './Hmac.validation';

export async function isAuthenticatedRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (config.environment === 'development') {
        return true;
    }

    if (
        !req.query.appId ||
        !req.query.locale ||
        !req.query.messageId ||
        !req.query.shopId ||
        !req.query.target ||
        !req.query.timestamp ||
        !req.query.token ||
        !req.query.hmac
    ) {
        return false;
    }

    const authenticated = await jwtAuthenticate(req, res, next);
    if (!authenticated) {
        return false;
    }

    const requestHmac = req.query.hmac as string;
    const timestamp = req.query.timestamp;
    delete req.query.hmac;
    delete req.query.timestamp;

    const query = {
        ...req.query,
        timestamp: timestamp,
    };

    return validateHmac(query, requestHmac);
}
