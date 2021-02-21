Создана ветка `02-express` из ветки `master`.

Написан REST API для работы с коллекцией контактов. Для работы с REST API
использовала [Postman](https://www.getpostman.com/).

## Шаг 1

Добавила в проект пакеты [express](https://www.npmjs.com/package/express),
[morgan](https://www.npmjs.com/package/morgan) и
[cors](https://www.npmjs.com/package/cors).

## Шаг 2

В index.js веб сервер на express и добавила прослойки morgan и cors. Настроила
раутинг для работы с коллекцией контактов.

REST API поддерживаеты следующие рауты.

### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом contacts.json
- возвращает массив всех контактов в json-формате со статусом 200

### @ GET /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

### @ POST /api/contacts

- Получает body в формате `{name, email, phone}`
- Если в body нет каких-то обязательных полей, возарщает json с ключом
  `{"message": "missing required name field"}` и статусом 400
- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле
  contacts.json
- По результату работы функции возвращает обьект с добавленным id
  `{id, name, email, phone}` и статусом 201

### @ DELETE /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию `removeContact` для работы с json-файлом contacts.json
- если такой id есть, возвращает json формата `{"message": "contact deleted"}` и
  статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

### @ PATCH /api/contacts/:contactId

- Получает параметр `contactId`
- Получает body в json-формате c обновлением любых полей `name, email и phone`
- Если body нет, возарщает json с ключом `{"message": "missing fields"}` и
  статусом 400
- Если с body все хорошо, вызывает функцию `updateContact(contactId, body)`
  (напиши ее) для обновления контакта в файле contacts.json
- По результату работы функции возвращает обновленный обьект контакта и
  статусом 200. В противном случае, возвращает json с ключом
  `"message": "Not found"` и статусом 404

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок
