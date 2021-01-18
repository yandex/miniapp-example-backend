import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import config from 'config';

import { Config } from '../config/types';
import { verifyJwtToken } from '../lib/jwt';
import { verifyOauthToken } from '../lib/oauth';
import logger from '../lib/logger';

const { key: KEY, options: OPTIONS } = config.get<Config['auth']>('auth');

function anonymousAuth(req: Request, next: NextFunction) {
    req.user = {
        id: null,
    };

    next();
}

type JwtTokenUserInfo = {
    psuid: string;
}

function jwtTokenAuth(token: string, req: Request, next: NextFunction) {
    try {
        const payload = verifyJwtToken<JwtTokenUserInfo>(token, KEY, OPTIONS);

        req.user = {
            id: payload.psuid,
        };

        next();
    } catch (error) {
        logger.error(error, 'JWT token validation failed');

        next(createError(401, 'Invalid JWT token'));
    }
}

async function oauthTokenAuth(authorizationHeader: string, req: Request, next: NextFunction) {
    try {
        const payload = await verifyOauthToken(authorizationHeader);

        req.user = {
            id: payload.psuid ?? payload.id,
        };

        next();
    } catch (error) {
        logger.error(error, 'OAuth token validation failed');

        next(createError(401, 'Invalid OAuth token'));
    }
}

type AuthMiddlewareOptions = {
    allowUnauthorized: boolean;
};

export function authMiddleware(options: AuthMiddlewareOptions) {
    const { allowUnauthorized } = options;

    return function(req: Request, _: Response, next: NextFunction) {
        let authorizationHeader = req.header('Authorization');

        if (!authorizationHeader) {
            if (allowUnauthorized) {
                return anonymousAuth(req, next);
            }

            return next(createError(401, 'Authorization header required'));
        }

        const isOAuthAuthorizationHeader = /^OAuth\s/i.test(authorizationHeader);

        if (isOAuthAuthorizationHeader) {
            oauthTokenAuth(authorizationHeader, req, next);
        } else {
            jwtTokenAuth(authorizationHeader, req, next);
        }
    };
}
