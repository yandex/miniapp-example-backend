import jwt, { Secret, VerifyOptions } from 'jsonwebtoken';

export function verify<T extends object>(token: string, secretKey: Secret, options?: VerifyOptions): T {
    return jwt.verify(token, secretKey, options) as T;
}
