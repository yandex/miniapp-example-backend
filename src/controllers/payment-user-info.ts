import { Request, Response } from 'express';
import assert from 'http-assert';
import { getManager } from 'typeorm';

import logger from '../lib/logger';
import Payment from '../entities/Payment';
import { sendPushNotification } from '../lib/push-notifications';

export async function updateUserInfoController(req: Request, res: Response) {
    const { userInfo: { name, email, phone }, paymentId, pushToken } = req.body;

    assert(paymentId, 400, 'Payment id required');

    await getManager().transaction(async manager => {
        let payments = await manager.find(Payment, {
            relations: ['event'],
            where: {
                apiPaymentId: paymentId,
                userId: req.user.psuid,
            },
        });

        assert(payments[0], 404, 'Payment not found');
        const payment = payments[0];

        payment.userInfo = { name, email, phone };

        await manager.save(payment);

        try {
            if (pushToken) {
                const { statusCode, statusMessage, body } = await sendPushNotification({
                    token: pushToken,
                    eventName: payment.event.title,
                });

                logger.info({
                    statusCode,
                    statusMessage,
                    body,
                }, 'Push notification sent');
            }
        } catch (error) {
            logger.error(error);
        }

        logger.info(payment.userInfo, 'Payment user info updated');

        res.status(200).json(payment);
    });
}
