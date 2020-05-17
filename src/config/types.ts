import { AgentOptions } from 'http';
import { CorsOptions } from 'cors';
import { OptionsOfJSONResponseBody } from 'got';
import { VerifyOptions } from 'jsonwebtoken';

export interface Config {
    request: {
        options: Partial<OptionsOfJSONResponseBody>;
        agent: AgentOptions;
    };
    db: {
        retries: number;
    };
    payment: {
        baseUrl: string;
        token: string;
        notification: {
            key: string;
            options: VerifyOptions
        }
    };
    auth: {
        key: string;
        options: VerifyOptions;
    }
    cors: CorsOptions;
}
