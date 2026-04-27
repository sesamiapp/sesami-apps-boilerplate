import {
    HttpCode,
    HttpError,
    HttpErrorArgs,
} from './Error.interface'

export class ShopNotFoundById extends HttpError {
    constructor(
        metaData?: object,
        args: HttpErrorArgs = {
            httpCode: HttpCode.BAD_REQUEST,
            isOperational: true,
            description: 'Shop not found by ID',
            name: 'ShopNotFoundById',
        },
    ) {
        super({ ...args, metaData })
    }
}
