import { Response } from 'express';
import { HttpCode, HttpError } from './Error.interface';
import { logger } from '../logger';

class ErrorHandler {
    private isTrustedError(error: Error | HttpError): boolean {
        if (error instanceof HttpError) {
            return error.isOperational;
        }

        return false;
    }

    public handleError(error: Error | HttpError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as HttpError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }

    private handleTrustedError(error: HttpError, response: Response): void {
        response.status(error.httpCode).json({
            message: error.message,
            metaData: error.metaData,
            name: error.name ?? '',
        });
    }

    private handleCriticalError(
        error: Error | HttpError,
        response?: Response,
    ): void {
        logger.error(error);
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
                errorName: (error as any)?.name ?? 'Error',
                errorMessage: (error as any)?.message ?? String(error),
                test: true,
            });
        }
    }
}

export const errorHandler = new ErrorHandler();
