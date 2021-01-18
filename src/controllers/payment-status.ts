import { Request, Response } from 'express';
import config from 'config';
import assert from 'http-assert';
import { getManager } from 'typeorm';

import { verifyJwtToken } from '../lib/jwt';
import logger from '../lib/logger';
import Payment, { Status as PaymentStatus } from '../entities/Payment';
import { Config } from '../config/types';

type OrderStatusNotification = {
    uid: number;
    updated: string;
    order_id: number;
    new_status: PaymentStatus;
}

const { key: KEY, options: OPTIONS } = config.get<Config['payment']['notification']>('payment.notification');

export async function updatePaymentStatus(req: Request, res: Response) {
    const { message: token } = req.body;

    try {
        const notification = verifyJwtToken<OrderStatusNotification>(token, KEY, OPTIONS);

        await getManager().transaction(async manager => {
            let payments = await manager.find(Payment, { where: { apiPaymentId: notification.order_id } });

            assert(payments.length === 1, 409);
            const payment = payments[0];

            payment.status = notification.new_status;

            await manager.save(payment);

            logger.info(notification, 'Payment updated');

            res.sendStatus(200);
        });
    } catch (err) {
        logger.error({ token }, 'Failed to update payment status');

        throw err;
    }
}
