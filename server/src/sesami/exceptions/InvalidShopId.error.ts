import {
    HttpCode,
    HttpError,
    HttpErrorArgs,
} from './Error.interface'

export class InvalidShopId extends HttpError {
    constructor(
        metaData?: object,
        args: HttpErrorArgs = {
            httpCode: HttpCode.BAD_REQUEST,
            isOperational: true,
            description: 'Invalid shop ID',
            name: 'InvalidShopId',
        },
    ) {
        super({ ...args, metaData })
    }
}
