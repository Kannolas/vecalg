# Инициализация проекта

## `.env` файл

1) Создать файл `.env`

После создания `.env` файла скопировать переменные из `.env.example`

------
```.env
CREDENTIALS_AUTH=1
EXTERNAL_API_SERVICE=https://external.service.ru
```

| Переменная | Значения | Описание |
| - | -------- | --- |
| CREDENTIALS_AUTH | 0 / 1 | ```0 - FALSE``` / ```1 - TRUE``` |
| EXTERNAL_API_SERVICE | String | `URL` стороннего сервиса. Используется в примере для авторизации через NextAuth |

------
 
 
 
## Команды

1) Клонирование репозитория

```zsh
git clone https://github.com/job-inc/project-template.git
```

2) Установка зависимостей

```zsh
npm ci
```

3) Установка `github hooks`

```zsh
npm run prepare
```

4) Запуск проекта

```zsh
npm run dev
```
 
 
 
# Темизация

1) Заполняются 2 файла
- [dark.css](./src/styles/dark.css)
- [light.css](./src/styles/light.css)

------

```css
:root {
   --text-primary: #FFFFFF;
   --text-secondary: #f4f4f5;
}
```

------

2) С помощью команды `build:css` `.css` файлы трансформируются в `.css` файлы в `public/themes/dark(light).css`

> команда используется также в скриптах `npm run dev` / `npm run build`

3) В компоненте [Page](./src/components/page/page.tsx#L35) подгружается необходимая тема
