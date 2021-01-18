import { Request, Response, NextFunction } from 'express';
import assert from 'http-assert';
import createError from 'http-errors';

import { verifyOauthToken } from '../lib/oauth';
import logger from '../lib/logger';

export async function getUserInfoController(req: Request, res: Response, next: NextFunction) {
    let authorizationHeader = req.header('Authorization');

    assert(authorizationHeader, 401, 'Authorization header required');
    authorizationHeader = authorizationHeader!;

    try {
        const {
            id: uid,
            real_name: name,
            login,
            default_email: email,
            psuid,
            default_avatar_id: avatar_id,
            display_name,
        } = await verifyOauthToken(authorizationHeader);

        res.json({
            uid,
            name,
            login,
            email,
            psuid,
            avatar_id,
            display_name,
        });
    } catch (error) {
        logger.error(error, 'OAuth token validation failed');

        next(createError(401, 'Invalid OAuth token'));
    }
}
