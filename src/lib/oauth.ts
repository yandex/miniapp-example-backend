import { get } from './request';

type OauthVerificationPayload = {
    id: string;
    login: string;
    psuid?: string;
    real_name?: string;
    display_name?: string;
    default_email?: string;
    default_avatar_id?: string;
}

export async function verifyOauthToken(authorizationHeader: string): Promise<OauthVerificationPayload> {
    const url = 'https://login.yandex.ru/info';
    const options = {
        headers: {
            Authorization: authorizationHeader,
        },
        searchParams: {
            format: 'json',
        },
    };

    const response = await get<OauthVerificationPayload>(url, options);

    return response.body;
}
