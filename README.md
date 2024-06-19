# Movie Web Client

Простое веб-приложение для просмотра информации о фильмах с использованием Next.js с использованием App Router, TypeScript и API Кинопоиск (https://kinopoisk.dev/).

## Функционал

### 1. Отображение списка фильмов

- Приложение отображает список фильмов, получаемых с помощью API.
- Фильмы отображаются постранично по 50 фильмов на страницу.
- Для каждого фильма отображается:
  - Постер фильма (если доступен).
  - Название фильма.
  - Год выпуска.
  - Рейтинг фильма.

### 2. Фильтрация списка фильмов

- Возможность фильтрации списка фильмов по следующим параметрам:
  - По жанру (выбор нескольких жанров).
  - По рейтингу (диапазон рейтинга).
  - По году выпуска (диапазон лет, начиная с 1990).

### 3. Просмотр детальной информации о фильме

- При клике на фильм из списка приложение переходит на страницу с детальной информацией об этом фильме.
- На странице фильма отображается:
  - Постер фильма (если доступен).
  - Название фильма.
  - Описание фильма.
  - Рейтинг фильма.
  - Дата выхода.
  - Список жанров.

### 4. Добавление фильмов в избранное

- Возможность добавления фильмов в список "избранное".
- Отдельная страница со списком избранных фильмов.
- Сохранение списка при перезагрузке страницы.

## При разработке были использованы следующие технологии

- Next.js, TypeScript.
- хуки и функциональные компоненты React.
- Axios для работы с HTTP-запросами
- Material UI, Tailwind CSS.
- Local Storage для сохранения избранных фильмов.

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/your-repository/movie-webclient.git
cd movie-webclient
```

### Установка зависимостей

```bash
npm install
```

### Запуск приложения

```bash
npm run dev
```

### Переменные окружения

- Создайте файл .env.local в корне проекта, скопировав содержимое из .env.default.

### Структура проекта

app/ - Страницы Next.js.
components/ - Компоненты React.
api/ - API-контроллеры для взаимодействия с внешними API.
common/ - Общие типы.
