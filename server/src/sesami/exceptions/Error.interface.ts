export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    UNAUTHENTICATED = 403,
    CONFLICT = 409
}

export interface HttpErrorArgs {
    name?: string;
    httpCode: HttpCode;
    description: string;
    isOperational?: boolean;
    metaData?: object;
}

export class HttpError extends Error {
    public readonly name: string
    public readonly httpCode: HttpCode
    public readonly isOperational: boolean = true
    public readonly metaData?: object

    constructor(args: HttpErrorArgs) {
        super(args.description)

        this.name = args.name || 'Error'
        this.httpCode = args.httpCode

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational
        }
        this.metaData = args.metaData
    }
}
