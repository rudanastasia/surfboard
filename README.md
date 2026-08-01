# Surfboard

Одностраничный лэндинг магазина серфбордов. Учебный фронтенд-проект: вёрстка на HTML/SCSS, интерактив на vanilla JS и jQuery.

Демо: https://rudanastasia.github.io/surfboard/

## Технологии

- HTML5, SCSS (компилируется в `css/main.css`)
- Vanilla JS + jQuery 3.4
- bxSlider (https://github.com/stevenwanderski/bxslider-4) — слайдер карточек досок
- IMask.js (https://imask.js.org/) — маски ввода в форме заказа (телефон)
- YouTube IFrame API — видеоплеер в разделе «Как мы работаем»
- Yandex Maps API v3 — карта с адресом магазина
- [Formspree](https://formspree.io/) — приём заявок из формы заказа без бэкенда
- ESLint + Prettier — линтинг и форматирование

## Структура проекта

```
├── index.html          # разметка страницы
├── css/                # SCSS + скомпилированный main.css
├── js/script.js        # скрипты
├── img/                # изображения и иконки
└── eslint.config.mjs   # конфигурация ESLint
```

## Установка и запуск

```bash
npm install
```

Проект статический, сборки не требует. Открывать `index.html` нужно локальный сервер (например, Live Server в VS Code), а не двойным кликом (`file://`) — иначе YouTube IFrame API не заработает.

SCSS компилируется в `css/main.css` через Prepros.

## Скрипты

| Команда                | Назначение                              |
| ---------------------- | --------------------------------------- |
| `npm run lint`         | проверить JS на ошибки ESLint           |
| `npm run lint:fix`     | автоматически исправить то, что чинится |
| `npm run format`       | отформатировать проект Prettier         |
| `npm run format:check` | проверить форматирование без изменений  |
