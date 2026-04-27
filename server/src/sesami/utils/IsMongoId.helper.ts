import { ObjectId } from 'mongodb';
import Joi, { CustomHelpers } from 'joi';

export const _isValidObjectId = (value: string, helper:CustomHelpers<string>) => {
    if (!ObjectId.isValid(value)) {
        return helper.message({
            custom: 'Invalid ObjectId'
        })
    }
    return value;
}

export function isValidMongoId(id: string) {
    return Joi.string().custom(_isValidObjectId).validate(id);
}
