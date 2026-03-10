# Notes App (React Native + Expo)

Мобильное приложение для создания, редактирования и публикации заметок. Приложение реализовано на **React Native + Expo**, с использованием **Redux Toolkit**, **RTK Query** и нескольких популярных библиотек для удобного интерфейса и производительности.

---

## Основные функции

- **Регистрация и авторизация по токену**
  - Автоматическая авторизация, если токен действителен.
- **Создание и редактирование заметок**
  - Можно менять заголовок и тело заметки.
  - Изменять цвет фона заметки.
  - Делать заметку публичной или оставлять приватной.
- **Вкладки с заметками**
  - `Мои заметки` – отображаются только ваши.
  - `Публичные заметки` – отображаются заметки других пользователей, помеченные как публичные.
- **Поиск заметок** – по заголовку и содержимому.

---

## Скриншоты

<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/97245467-78bd-4342-b23c-d2d3d0b20d3b" width="200" /><br>
      <em>Форма входа</em>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/79813975-4ca1-44b4-b1ea-10c481ef881b" width="200" /><br>
      <em>Форма регистрации</em>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2ada0ddd-7e88-4602-921d-5b4f9b9bbf2d" width="200" /><br>
      <em>Экран с заметками</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1ce6e58c-1859-471e-bee7-b36758764e9a" width="200" /><br>
      <em>Экран с публичными заметками</em>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/410596f0-29ae-458c-9695-14e4619f53e2" width="200" /><br>
      <em>Редактор заметок</em>
    </td>
    <td></td>
  </tr>
</table>

---

## Используемые библиотеки

- **@react-navigation/native / native-stack / material-top-tabs** – навигация по экрану и вкладкам приложения.
- **@reduxjs/toolkit + react-redux** – глобальное управление состоянием приложения.
- **RTK Query** – для взаимодействия с API бэкенда (регистрация, авторизация, заметки).
- **expo-linear-gradient** – градиентные элементы интерфейса.
- **expo-secure-store** – безопасное хранение токена на устройстве.
- **@react-native-seoul/masonry-list / react-native-masonry-list** – сетка карточек заметок в стиле Masonry.
- **react-native-safe-area-context / react-native-screens** – корректная работа интерфейса на устройствах с вырезами и разными экранами.

---

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Запуск приложения:
```bash
npm start       # или expo start
npm run android # для Android
npm run ios     # для iOS
```

4. Создайте `.env` файл в корне проекта и добавьте:
```env
EXPO_PUBLIC_BASE_URL=<адрес вашего бэкенда>/api/
```

---

## Архитектура

- **Redux Toolkit + RTK Query** для управления состоянием и работы с сервером.
- **Masonry List** для сетки заметок с динамическим размером.
- **React Navigation** для навигации между вкладками и экранами.
- **Expo Secure Store** для безопасного хранения токена авторизации.

---

## Бэкенд и база данных

Сервер и база данных реализованы @1DamnDaniel3.
Репозиторий бэкенда: [https://github.com/1DamnDaniel3/notes_backend](https://github.com/1DamnDaniel3/notes_backend)

---

## Технологии

- React Native + Expo
- TypeScript
- Redux Toolkit + RTK Query
- React Navigation
- Expo Secure Store
- Masonry List (карточки заметок)
- React Native Paper (UI компоненты)

---

## Планы на развитие:
- Отображение никнеймов в публичных заметках
- В своих заметках обозначать опубликованные значком глаза
- Добавить пагинацию на экран с публичными заметками
### Грандиозные идеи:
- добавить возможность создавать группы и публиковать заметки в них

---

## Лицензия

Приложение закрытое / личное использование.

