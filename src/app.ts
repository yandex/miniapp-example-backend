import 'reflect-metadata';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import config from 'config';
import cors, { CorsOptions } from 'cors';
import createError, { HttpError } from 'http-errors';
import compression from 'compression';

import { connect } from './lib/db';
import logger from './lib/logger';
import { ping } from './controllers/ping';
import { createPaymentController } from './controllers/payment';
import { getPaymentsController } from './controllers/payments';
import { updatePaymentStatus } from './controllers/payment-status';
import { updateUserInfoController } from './controllers/payment-user-info';
import { getUserInfoController } from './controllers/user-info';
import { asyncMiddleware } from './middleware/async';
import { authMiddleware } from './middleware/auth';

const app = express();

app.use(cors(config.get<CorsOptions>('cors')));
app.use(compression({ level: 9 }));
app.use(express.json());

connect(config.get('db.retries')).then(() => {
    app.post('/payment/status', asyncMiddleware(updatePaymentStatus));
    app.post('/payment/user-info', authMiddleware({ allowUnauthorized: true }), asyncMiddleware(updateUserInfoController));
    app.post('/payment', authMiddleware({ allowUnauthorized: true }), asyncMiddleware(createPaymentController));
    app.get('/payments', authMiddleware({ allowUnauthorized: false }), asyncMiddleware(getPaymentsController));
    app.get('/user-info', asyncMiddleware(getUserInfoController));
    app.get('/check', asyncMiddleware(ping));

    app.use(function(req, res, next) {
        next(createError(404, 'Not found', { url: req.url }));
    } as RequestHandler);

    // error handler
    app.use(function(err, req, res, _) {
        logger.error({ err });

        if (err instanceof HttpError) {
            return res.status(err.status).send(err);
        }
        // render the error page
        res.sendStatus(err.status || 500);
    } as ErrorRequestHandler);
}).catch((error: Error) => {
    logger.error(error);

    process.exit(1);
});

export default app;
