import { Connection, createConnection } from 'typeorm';

import logger from './logger';

const DELAY = 500;

export async function connect(retries: number): Promise<Connection> {
    try {
        return await createConnection();
    } catch (error) {
        logger.error(error);

        if (retries === 0) {
            throw error;
        }

        await new Promise(resolve => {
            setTimeout(resolve, DELAY);
        });

        return await connect(retries - 1);
    }
}
