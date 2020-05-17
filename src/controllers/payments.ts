import { Request, Response } from 'express';

import Payment from '../entities/Payment';

export async function getPaymentsController(req: Request, res: Response) {
    const payments = await Payment.find({
        select: ['id', 'status', 'apiResponseStatus', 'cost'],
        relations: ['event'],
        where: { userId: req.user.psuid },
    });

    res.json(payments);
}
