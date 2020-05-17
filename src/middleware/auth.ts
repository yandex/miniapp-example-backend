import { NextFunction, Request, Response } from 'express';
import assert from 'http-assert';
import createError from 'http-errors';
import config from 'config';

import { Config } from '../config/types';
import { verify } from '../lib/jwt';
import logger from '../lib/logger';

export type JWTPayload = {
    psuid: string;
}

const { key: KEY, options: OPTIONS } = config.get<Config['auth']>('auth');

export default function(req: Request, res: Response, next: NextFunction) {
    let token = req.header('Authorization');

    assert(token, 401, 'Authorization required');
    token = token!;

    try {
        const payload = verify<JWTPayload>(token, KEY, OPTIONS);

        req.user = {
            psuid: payload.psuid,
        };

        next();
    } catch (error) {
        logger.error(error, 'Token validation failed');

        next(createError(401, 'Invalid token'));
    }
}
