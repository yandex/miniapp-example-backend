import config from 'config';

import { Currency, NDS } from '../entities/Event';
import { Status } from '../entities/Payment';

import { post } from './request';

export type Product = {
    product_id?: number;
    name: string;
    price: string;
    nds: NDS;
    currency: Currency;
    amount: number;
}

export type CreateOptions = {
    caption: string;
    description: string;
    items: Product[];
    user_email?: string;
    user_description?: string;
}

export enum ApiResponseStatus {
    Success = 'success',
    Fail = 'fail',
}

export type CreateResponse = {
    code: number;
    status: ApiResponseStatus;
    data: {
        pay_status: Status;
        currency: Currency;
        revision: number;
        caption: string;
        updated: string;
        order_id: number;
        price: number;
        items: Product[];
        description: string;
        pay_token: string;
        active: boolean;
        created: string;
        closed: string;
        mode: string;
    }
}

export async function createPayment(options: CreateOptions) {
    const url = `${config.get<string>('payment.baseUrl')}/order`;
    const opts = {
        json: {
            ...options,
            // Создаём тестовый платеж
            mode: 'test',
        },
        headers: {
            Authorization: config.get<string>('payment.token'),
        },
    };

    const response = await post<CreateResponse>(url, opts);

    return response.body;
}
