import { Request, Response } from 'express';

import Event from '../entities/Event';

export async function ping(req: Request, res: Response) {
    const count = await Event.count();

    res.send(`events count: ${count}`);
}
