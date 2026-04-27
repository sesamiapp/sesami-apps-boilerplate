import { logger } from './Winston.logger'
import { Request, Response, NextFunction } from 'express'

export function winstonMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    logger.info(`${req.method} ${req.url}`)
    next()
}
