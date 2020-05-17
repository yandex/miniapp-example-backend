import http from 'http';
import https from 'https';
import config from 'config';
import got, { OptionsOfJSONResponseBody, Response } from 'got';
import merge from 'lodash/merge';

import logger from './logger';

const agent = {
    http: new http.Agent(config.get('request.agent')),
    https: new https.Agent(config.get('request.agent')),
};

const defaultOptions: Partial<OptionsOfJSONResponseBody> = {
    ...config.get('request.options'),
    method: 'GET',
    agent,
    // https://github.com/sindresorhus/got/issues/1175
    dnsCache: false,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

async function request<T extends object>(
    url: string,
    options: Partial<OptionsOfJSONResponseBody>,
): Promise<Response<T>> {
    const opts = merge({}, defaultOptions, options) as OptionsOfJSONResponseBody;

    try {
        const response = await got<T>(url, opts);

        logger.info('%d: %s %s', response.statusCode, opts.method?.toUpperCase(), url);

        return response;
    } catch (err) {
        const response = err.response ?? {};

        logger.error(response.body, '%d: %s %s', response.statusCode, opts.method?.toUpperCase(), url);

        throw err;
    }
}

export async function get<T extends object>(url: string, options: Partial<OptionsOfJSONResponseBody>) {
    return request<T>(url, options);
}

export async function post<T extends object>(url: string, options: Partial<OptionsOfJSONResponseBody>) {
    const opts = {
        ...options,
        method: 'POST',
    } as Partial<OptionsOfJSONResponseBody>;

    return request<T>(url, opts);
}
