import * as crypto from 'crypto';
import config from '../config/Build.config';

function sortObjectByKey(obj?: Record<string, any>): Record<string, any> {
    if (!obj) {
        return {};
    }
    return Object.keys(obj)
        .sort() // Sort keys alphabetically
        .reduce(
            (sortedObj, key) => {
                sortedObj[key] = obj[key];
                return sortedObj;
            },
            {} as Record<string, any>,
        );
}

export function validateHmac(input: object, hmac: string): boolean {
    const message = JSON.stringify(sortObjectByKey(input));
    const generatedHmac = crypto
        .createHmac('sha256', config.sesamiClientSecret)
        .update(message)
        .digest('hex');
    return generatedHmac === hmac;
}
