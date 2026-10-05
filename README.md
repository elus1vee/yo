# Йо!

Сайт бренда «Йо!»: Next.js 16 + Payload CMS 3 (админка на `/admin`) + PostgreSQL.

## Локальная разработка

```bash
cp .env.example .env     # заполнить PAYLOAD_SECRET (openssl rand -hex 32)
npm install
npm run db:up            # PostgreSQL в Docker, порт только на 127.0.0.1:5433
npm run payload -- migrate
npm run dev              # http://localhost:3000
```

Демо-контент и первый админ: `SEED_ADMIN_PASSWORD=... npm run seed`.

## Деплой на VPS (Ubuntu + Docker)

Все настройки и секреты — в `.env` (шаблон `.env.example`), в репозиторий он не попадает.

1. **Сервер.** Установить Docker (с плагином compose), открыть в файрволе только 22, 80, 443
   (`ufw allow 22,80,443/tcp && ufw allow 443/udp && ufw enable`). A-запись домена должна
   указывать на IP сервера.
2. **Код.** `git clone <репозиторий> /opt/yo && cd /opt/yo`
3. **Настройки.** `cp .env.example .env` и заполнить:
   - `POSTGRES_PASSWORD` — `openssl rand -hex 16` (только буквы и цифры);
   - `PAYLOAD_SECRET` — `openssl rand -hex 32`;
   - `NEXT_PUBLIC_SITE_URL=https://ваш-домен` и `DOMAIN=ваш-домен`;
   - `CONTACT_FORM_TO` и `SMTP_*` — почта для заявок с формы.
     Строку `DATABASE_URI` оставлять не нужно — в Docker приложение собирает её само.
4. **Запуск.** `docker compose up -d --build`. Миграции применяются автоматически при старте,
   HTTPS-сертификат Caddy получает сам. PostgreSQL наружу не публикуется.
5. **Контент.** Открыть `https://ваш-домен/admin` и создать первого администратора.
   Пока глобалы («Контакты», «О компании» и др.) не заполнены, сайт открывается, но без этих блоков.
   Чтобы перенести готовый контент с локальной машины:

   ```bash
   # на локальной машине
   docker exec yo-postgres-1 pg_dump -U yo -d yo --clean --if-exists --no-owner > yo.sql
   tar czf media.tar.gz media
   scp yo.sql media.tar.gz user@сервер:/opt/yo/

   # на сервере, в /opt/yo
   docker compose stop app
   docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < yo.sql
   tar xzf media.tar.gz -C /tmp && docker compose cp /tmp/media/. app:/app/media/
   docker compose run --rm -u root --no-deps --entrypoint chown app -R node:node /app/media
   docker compose start app
   ```

6. **Бэкапы.** `scripts/backup.sh` кладёт дамп базы и архив загрузок в `backups/` (хранит 14 дней).
   Добавить в cron (`crontab -e`): `0 3 * * * /opt/yo/scripts/backup.sh`, и копировать
   `backups/` за пределы сервера.

### Обновление

```bash
git pull && docker compose up -d --build
```

Смена домена (`NEXT_PUBLIC_SITE_URL`) требует пересборки — значение вшивается в сборку.

### Заметки

- Страницы сайта рендерятся на каждый запрос, поэтому правки из админки видны сразу, а образ
  собирается без базы данных.
- Логи: `docker compose logs -f app`.
