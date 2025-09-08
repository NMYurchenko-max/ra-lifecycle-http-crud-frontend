## Задание "React.Базовый CRUD без обновления при работе с HTTP. Тема жизненный цикл"

React, lificycle. Basic CRUD without update when working with HTTP.

========

[![CI](https://github.com/NMYurchenko-max/ra-lifecycle-http-crud-frontend/actions/workflows/web.yml/badge.svg)](https://github.com/NMYurchenko-max/ra-lifecycle-http-crud-frontend/actions/workflows/web.yml)

[![Deploy](https://nmyurchenko-max.github.io/ra-lifecycle-http-crud-frontend/)](https://nmyurchenko-max.github.io/ra-lifecycle-http-crud-frontend/)


========

REST‑сервер (Express) опубликован на Render:
- Service ID: srv-d2ur24juibrs73fvjf0g
- Публичный URL (prod): https://ra-lifecycle-http-crud-backend-7z3u.onrender.com

========

[Задание](https://github.com/netology-code/ra16-homeworks/blob/ra-51/lifecycle-http/crud/README.md)

Необходимо реализовать базовый CRUD без обновления при работе с HTTP.

##  Как это работает

- Список заметок: GET /notes
- Добавление: POST /notes (тело: { "content": "..." })
- Удаление: DELETE /notes/:id
- Обновление списка: повторный GET /notes

## Dev vs Prod

- Dev (Vite dev server):
  - Бэкенд: http://localhost:7070
  - Фронтенд использует относительные пути /notes и проксируется Vite (vite.config.ts -> server.proxy).
- Prod (GitHub Pages + Render):
  - Бэкенд: https://ra-lifecycle-http-crud-backend-7z3u.onrender.com
  - Фронтенд собирается с переменной окружения VITE_API_BASE_URL=https://ra-lifecycle-http-crud-backend-7z3u.onrender.com и делает запросы по абсолютному URL.
  - В vite.config.ts для GitHub Pages (repo pages) base должен быть = имени директории: /ra-lifecycle-http-crud-frontend/.

Пример вызовов на фронте:
- Dev: fetch('/notes') — проксируется на http://localhost:7070/notes
- Prod: fetch(`${import.meta.env.VITE_API_BASE_URL}/notes`)

Обратите внимание: Render на бесплатном плане может «просыпаться» 10–30 секунд. Рекомендуется включить таймаут/ретраи на фронтенде.

## Протокол обмена

Первоначальная загрузка:
- GET /notes — получение и отображение карточек.

Добавление:
1. Нажимаете «Добавить» => операция  POST /notes, тело:
```json
{ "content": "То, что было введено в поле ввода" }
```
2. Обновляете список карточек.

Удаление:
3. Нажимаете на крестик на карточке => операция  DELETE /notes/:id

4. Обновляете список карточек.

Принудитеольное обновление:
5. Нажимаете на кнопку «Обновить» => операция  GET /notes

