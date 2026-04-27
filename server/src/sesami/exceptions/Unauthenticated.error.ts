import {
    HttpCode,
    HttpError,
    HttpErrorArgs,
} from './Error.interface'

export class UnauthenticatedError extends HttpError {
    constructor(
        metaData?: object,
        args: HttpErrorArgs = {
            httpCode: HttpCode.UNAUTHENTICATED,
            isOperational: true,
            description: 'Invalid token',
            name: 'UNAUTHENTICATED',
        },
    ) {
        super({ ...args, metaData })
    }
}
