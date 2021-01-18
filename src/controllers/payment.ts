import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import assert from 'http-assert';
import { getManager } from 'typeorm';

import Event from '../entities/Event';
import Payment from '../entities/Payment';
import Delivery from '../entities/Delivery';
import logger from '../lib/logger';
import { createPayment, CreateOptions } from '../lib/payment';

export async function createPaymentController(req: Request, res: Response, next: NextFunction) {
    const { eventId, deliveryId, amount: rawAmount } = req.body;
    const userId = req.user.id;
    const amount = Number(rawAmount);

    assert(amount > 0, 400, 'Amount should be positive number');

    await getManager().transaction(async manager => {
        let event = await manager.findOne(Event, { where: { id: eventId } });
        let delivery = await manager.findOne(Delivery, { where: { id: deliveryId } });
        let deliveryPrice = delivery?.price ?? 0;

        assert(event, 404, 'Event not found');
        event = event!;

        const options: CreateOptions = {
            caption: 'Покупка билета',
            description: event.title,
            items: [
                {
                    amount,
                    nds: event.nds,
                    name: event.id,
                    price: event.price.toString(),
                    currency: event.currency,
                },
            ],
        };

        if (delivery && deliveryPrice) {
            options.items.push({
                amount: 1,
                nds: delivery.nds,
                name: delivery.id,
                price: delivery.price.toString(),
                currency: delivery.currency,
            });
        }

        const payment = new Payment();
        payment.amount = amount;
        payment.event = event;
        payment.cost = event.price * amount + deliveryPrice;

        if (userId) {
            payment.userId = userId;
        }

        await manager.save(payment);

        try {
            const response = await createPayment(options);

            payment.apiPaymentId = response.data.order_id;
            payment.status = response.data.pay_status;
            payment.apiResponseStatus = response.status;

            res.status(201).json({
                paymentToken: response.data.pay_token,
                id: response.data.order_id,
                cost: payment.cost,
            });
        } catch (error) {
            logger.error(error);

            if (error.response?.body?.status) {
                payment.apiResponseStatus = error.response.body.status;
            }

            next(createError(500));
        } finally {
            await manager.save(payment);

            logger.info(payment, 'Payment created');
        }
    });
}
