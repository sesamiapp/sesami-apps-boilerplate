import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UnauthenticatedError } from '../exceptions';
import { JwtURLStrategy } from './Passport.strategy';
import { logger } from '../logger';
import Config from '../config/Build.config';

export async function jwtAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (Config.environment === 'development') {
        return true;
    }

    let isAuthenticated: boolean = true;
    passport.authenticate(
        JwtURLStrategy,
        { session: false },
        (error: any, user: any, info: any) => {
            if (error || !user || info instanceof Error) {
                logger.warn('Authentication failed:', { error, info });
                isAuthenticated = false;
                return next(new UnauthenticatedError());
            }
            req.user = user;
        },
    )(req, res, next);
    return isAuthenticated;
}
