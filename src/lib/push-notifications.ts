import config from 'config';

import { post } from './request';

type PushNotificationsOptions = Record<string, unknown>;

export async function sendPushNotification({ token, eventName }: PushNotificationsOptions) {
    const options = {
        headers: {
            'X-Ya-Api-Key': config.get<string>('pushNotifications.key'),
        },
        json: {
            jsonrpc: '2.0',
            id: '0',
            method: 'send_message',
            params: {
                app_id: config.get<string>('pushNotifications.appId'),
                token,
                category: 'STATUS',
                template_name: config.get<string>('pushNotifications.templateName'),
                template_params: {
                    event_name: eventName,
                },
                meta: {},
            },
        },
    };

    return post(config.get<string>('pushNotifications.baseUrl'), options);
}
