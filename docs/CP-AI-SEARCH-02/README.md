# CP-AI-SEARCH-02 — Bounded Implementation (2026-11-01)

**Date:** 2026-11-01 23:41 ALMT (Asia/Almaty, UTC+5)
**Base:** `master` @ `229daea` + PR #2 spec + PR #3 audit (PARTIAL/PASS)
**Branch:** `arena/37b6d87c-tuba-kz` → PR #3 (updated)
**Mode:** `BOUNDED_IMPLEMENTATION` — minimal correct change, no new services, no DNS/Cloudflare/Google Ads changes, no unverified claims
**Result:** **PASS** — все требуемые правки выполнены, проверки пройдены, остановлено для приёмки

## Что сделано (минимальный diff)

| # | Задача из CP-AI-SEARCH-02 | Файл | Изменение | Обоснование |
|---|---------------------------|------|-----------|-------------|
| 1 | Исправить `lastmod` в sitemap | `sitemap.xml` | `homepage lastmod: 2026-06-13 → 2026-11-01` (дата изменения контента — уточнение адреса). `privacy lastmod: 2026-06-13` оставлен (контент не менялся, совпадает с видимой `Дата обновления: 13 июня 2026`). | Реальная дата изменения страницы, не дата деплоя без контента. Git history: оба URL созданы в 229daea 2026-09-22, но privacy видимая дата — 2026-06-13, поэтому homepage обновлён, privacy — нет. |
| 2 | Добавить 12 фотографий в image sitemap | `sitemap.xml` | Добавлен `xmlns:image` + 12 `<image:image>` внутри `https://www.tuba.kz/` (hero + 11 проектов/сервисов). Все URL — `https://www.tuba.kz/assets/...` с `%20` кодировкой. | Только существующие публичные assets из `index.html` (проверено в `assets/`). Без новых файлов. |
| 3 | Уточнить Schema.org адрес | `index.html` (JSON-LD + footer) | `streetAddress: "ул. Бенберина, 18" → "ул. Василия Бенберина, 18"` + footer `📍 Алматы, ул. Василия Бенберина, 18` | Подтверждённый владельцем адрес. Часы/координаты/цены — **не добавлены** (нет подтверждения, запрещено AGENTS.md). Schema ↔ видимый контент синхронизированы. |
| 4 | Canonical / Ads / privacy / consent / WhatsApp | `index.html`, `privacy-policy.html`, `robots.txt`, `script.js` | Проверено, **не менялось** — осталось PASS | Сохранение архитектуры |
| 5 | Cloudflare robots / ИИ-боты | `robots.txt` (локальный) + live fetch | Только чтение: live `Content-Signal: search=yes,ai-train=no,use=reference` + `Disallow: GPTBot/ClaudeBot/Google-Extended...` через Cloudflare Managed. Локальный `robots.txt` не менялся. Настройки Cloudflare не трогались. | Ограничение режима — только чтение |

## Проверки (обязательные)

```bash
node --check script.js          # PASS
python xml parse sitemap.xml     # PASS
Google Ads readiness (py emu)    # PASS — tag, canonical, consent, privacy, sitemap, no href="#", no risky claims, no non-canonical
```

Логи — в `EVIDENCE.md`.

## Ограничения соблюдены
- Новых сервисов, DNS, Cloudflare dashboard, Google Ads кампаний, форм, цен/скидок/брендов — **нет**
- Merge/deploy — **запрещены**, не выполнялись
- Все правки — обратимы, в существующих файлах

## Следующий шаг
Владелец принимает PR. После merge — верификация на проде: homepage 200, privacy 200, Ads tag, consent, canonical, AdsBot-Google 200 (см. AGENTS.md Deployment Gate).

## Связи
- Spec: PR #2 `planning/ai-search-visibility-20261101`
- Audit: PR #3 `arena/37b6d87c-tuba-kz` (00_INDEX…EVIDENCE в `docs/CP-AI-SEARCH-01/`)
- Implementation PR: тот же `arena/37b6d87c-tuba-kz` → PR #3 (обновлён) — отдельный от master
