# 02 — Доступность Google Search Console и официальная отчётность по AI

> 2026-11-01, без доступа к аккаунту владельца. Проверка по актуальной документации Google.

## 1. Реальный доступ к данным — DATA_UNAVAILABLE

| Проверка | Результат |
|----------|-----------|
| Доступ к property `https://www.tuba.kz/` / `www.tuba.kz` (Search Console) | **нет** — в sandbox отсутствуют OAuth, verified property, делегирование |
| Скриншоты Performance / Clicks / Impressions / CTR для tuba.kz | **не существуют** — не выдуманы |
| Экспорт BigQuery / API / CSV | **нет** |
| Органические clicks/impressions/CTR/позиция по страницам/запросам | **DATA_UNAVAILABLE** |
| Generative AI performance (AI Overviews / AI Mode impressions) | **DATA_UNAVAILABLE** |

**Обязательство:** никаких цифр по GSC в этом отчёте не приводится (кроме тех, что взяты из публичной документации Google).

## 2. Что говорит официальная документация Google (проверено 2026-11-01)

### 2.1 Где учитывается AI-трафик
> “Sites appearing in AI features (such as AI Overviews and AI Mode) are included in the overall search traffic in Search Console. In particular, they're reported on in the Performance report, within the “Web” search type.”
> — `developers.google.com/search/docs/appearance/ai-features` (Measuring the performance of your site, обновлено 2025-05-21)

**Смысл:** отдельного фильтра “только AI” в стандартном Performance-отчёте **нет** (по сост. на декабрь 2025). Клики/показы из AI Overviews и AI Mode попадают в общие Web-метрики.

### 2.2 Новый Generative AI performance report (Search)
Google анонсировал **03.06.2026**, раскатка worldwide **31.08.2026** (источники: support.google.com/webmasters/answer/16984139; Google Search Central):

| Параметр | Текущее состояние (на 2026-09-11) |
|----------|-------------------------------|
| **Что показывает** | **Impressions only** — сколько раз ссылка на сайт показана в AI Overviews / AI Mode |
| **Что НЕ показывает** | clicks, CTR, position — отсутствуют; query — отсутствует |
| **Разбивки** | Pages, Countries, Devices, Dates (по canonical URL) |
| **Фильтр AI Overviews vs AI Mode** | **нет** — объединённый счётчик |
| **API / BigQuery** | **нет** — только UI + ручной CSV |
| **Где находится** | Search Console → Performance → Search results → Generative AI (Beta) |

> “The report includes data about how your site performs in generative AI features on Google Search ... Impressions are how many times links to your site were shown ...”
> — Google Search Console Help: *Generative AI performance report (Search)*

**Важно:** эти impressions **уже были** в общих Web-impressions; новый отчёт — лишь срез, а не +новые показы.

### 2.3 Частые заблуждения (официально опровергнуты)
| Миф | Факт |
|-----|------|
| “AI-трафик отделён в отдельный Search Appearance” | **Нет** — AI Mode/AI Overviews включены в Web totals (Search Engine Land, Google docs) |
| “Нужен `llms.txt` или спец-схема для AI Overviews” | **Нет** — “no additional technical requirements” (Google AI features page) |
| “Google-Extended блокирует AI Overviews” | **Нет** — он контролирует лишь обучение Gemini, не Search (таблица в доке) |
| “GSC покажет query для AI-цитат” | **Нет** — в Generative AI report нет измерения query |
| “GSC измеряет ChatGPT/Perplexity” | **Нет** — только Google Search/Discover |

## 3. Что это значит для tuba.kz

1. **Без доступа к GSC нельзя утверждать** сколько clicks/CTR у tuba.kz сейчас, есть ли AI-impressions, и почему. Любая цифра была бы выдумкой — отчёт этого не делает.
2. Даже **с доступом** нельзя было бы сказать “+12% пришло из AI Overviews” — такого измерения в GSC нет; нужен комплекс (GSC Web trends + ручная выборка SERP + GA4).
3. Для tuba.kz как для малого локального сайта с 2 URL (home + privacy) характерны низкие объёмы → Generative AI report может быть **пустым** (“not all properties have access, low-impression properties may see nothing”) — это нормально.

## 4. Использованные источники (невыдуманные)
- https://developers.google.com/search/docs/appearance/ai-features — AI features and your website (Measuring performance)
- https://support.google.com/webmasters/answer/16984139 — Generative AI performance report (Search)
- https://www.elmohq.com/blog/search-console-ai-visibility — Search Console AI Visibility (09.09.2026)
- https://auspia.ai/blog/google-search-console-ai-performance-report-guide — How GSC Counts AI Overviews
- https://lobodigital.co.uk/search-console-ai-overview-data/ — Does GSC Show AI Overview Data?
- Плюс 3 backup-гайда (seoneurons, imasters, dev.to) — все подтверждают: **impressions-only, no query, no click, combined**.

## 5. Что запросить у владельца для честного доступа
- Invite `viewer` на property `https://www.tuba.kz/` в Search Console (email агента указывать нельзя — это статическая среда Arena; владелец сам открывает доступ и снимает CSV/скрины).
- Если аккаунт на домене `tuba.kz` (Domain property) — дать доступ на него.
- Подключить GA4 property к Search Console (для связки GSC+Analytics по совету Google).
- Проверить Settings → Generative AI report availability (Beta) — доступен ли отдельный таб.

> До получения доступа любые утверждения вида “AI Overviews дают X кликов” остаются **UNKNOWN**.

## 6. Вывод секции
**GSC AVAILABILITY = DATA_UNAVAILABLE (честно зафиксировано)**
Отчёт не содержит выдуманных метрик. Для воспроизводимой оценки используется **ручная 20-запросная выборка** (см. `03_QUERIES_20_MATRIX.md`) + план подключения GSC на будущее.
