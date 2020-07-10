# Бэкенд для миниаппа покупки билетов

Приложение умеет:
* создавать платежи через платёжное API (создаются с параметром `mode: test`)
* авторизовать пользователя, используя JWT, выданный Платформой
* хранить историю заказов

## API
* `GET /payments` — получить историю платежей для пользователя. Для авторизации необходимо указать заголовок `Authorization: <JWT>`, где JWT — токен, выданный Платформой. Формат ответа: 
```ts
[
   {
        id: number,
        status: 'new' | 'in_moderation' | 'held' | 'in_progress' | 'moderation_negative' | 'in_cancel' | 'canceled' | 'rejected' | 'paid',
        apiResponseStatus: 'success' | 'fail',
        const: number,
        event: {
            id: string,
            title: string,
            price: number,
            currency: 'RUB',
            nds: 'nds_none' | 'nds_0' | 'nds_10' | 'nds_10_110' | 'nds_20' | 'nds_20_120'        
        }
   },
  ...
]
``` 

* `POST /payment` — создать платёж. Для авторизации необходимо указать заголовок `Authorization: <JWT>`, где JWT — токен, выданный Платформой. Ожидает запрос формата:
 ```ts
{
    eventId: string,
    amount: number
}
```
 Формат ответа:
```ts
{
    paymentToken: string,
    id: number,
    cost: number
}
```

* `POST /payment/status` — обновить статус платежа. Ожидает запрос формата `{ message: <JWT> }`, где JWT — токен, содержащий в теле обновленный статус платежа. В случае успешного обновления отвечает кодом 200.

* `POST /payment/user-info` — обновить информацию о пользователе, который совершил платеж.
Ожидает запрос формата
```ts
 {
    userInfo: { name: string, phone: string, email: string },
    paymentId: string,
    pushToken?: string
}
```
где `userInfo` — информация о пользователе, `paymentId` - идентификатор платежа.
В случае успешного обновления возвращает обновленную информацию по платежу.

## Оплата
Чтобы совершить оплату, нужно сделать запрос на `/payment`, пример тела запроса: 
```json
{
    "eventId": "event-cinema-id1",
    "amount": 1
}
```

В ответ с бэкенда придет `paymentToken`, который нужно передать в JS Api формы оплаты `const request = new PaymentRequest(...)`. При вызове `request.show()` покажется форма оплаты, в которую необходимо ввести данные тестовой карты:
* номер карты `5555555555554444`
* срок действия — любой в будущем
* CVC — любой

## Требования
Для локального запуска нужно установить Docker версии не ниже 18.02 и docker-compose.

## Разработка
Для запуска локально использовать команды `npm start` или `npm run start:docker` (запуск приложения в контейнере).

Для работы приложения нужно определить следующие переменные окружения:
* `PAYMENT_API_TOKEN` — API-ключ для доступа к платёжному API;
* `AUTH_SECRET_KEY` — секретный ключ [oauth-приложения](https://oauth.yandex.ru) для проверки подписи JWT;
* `PAYMENT_SECRET_KEY` — секретный ключ из платёжного API для проверки уведомлений о статусе платежа;
* `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — хост, порт, пользователь, пароль и имя базы данных.

Для запуска локально можно использовать файл [`.env`](https://www.npmjs.com/package/dotenv).

Доступные команды:
* запустить контейнер с базой: `docker-compose up -d --build postgres`, то же в `npm run start:db`
* очистить базу: `npm run db:clean`
* запустить приложение с базой: `npm run start:docker`
* остановить всё: `docker-compose down`

### Миграции
В проекте используется TypeORM с миграциями. После внесения изменений в файлы сущностей нужно создать миграцию, выполнив команду `npm run typeorm -- migration:generate -- -n <name of migration>`.
Применить миграцию можно командой `npm run typeorm -- migration:run`. Также миграции применяются при запуске сервиса.
