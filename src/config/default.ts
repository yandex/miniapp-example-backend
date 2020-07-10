import { Config } from './types';

const config: Config = {
    request: {
        options: {
            timeout: 3 * 1000,
        },
        agent: {
            keepAlive: true,
            keepAliveMsecs: 1000,
            maxSockets: 1024,
            maxFreeSockets: 16,
        },
    },
    db: {
        retries: 3,
    },
    payment: {
        baseUrl: 'https://pay-sdk.yandex.net/v1',
        token: process.env.PAYMENT_API_TOKEN ?? '',
        notification: {
            key: process.env.PAYMENT_SECRET_KEY ?? '',
            options: {
                algorithms: ['HS256', 'HS384', 'HS512'],
            },
        },
    },
    pushNotifications: {
        baseUrl: 'https://floyd.chats.yandex.ru/ycm/v1/jsonrpc/',
        key: process.env.PLATFORM_API_KEY ?? '',
        appId: 100375,
        templateName: '820157',
    },
    auth: {
        key: process.env.AUTH_SECRET_KEY ?? '',
        options: {
            algorithms: ['HS256'],
            issuer: 'oauth-internal.yandex.ru',
        },
    },
    cors: {
        origin: [
            'https://yandex.github.io',
            /https:\/\/.+\.yandex\.ru/,
            /http:\/\/localhost(:\d+)?/,
        ],
        maxAge: 86400,
    },
};

module.exports = config;
