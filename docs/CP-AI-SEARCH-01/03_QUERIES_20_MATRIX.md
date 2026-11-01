# 03 — Проверка 20 целевых запросов (RU/KZ) — 2026-11-01

> Методика соответствует PR #2: draft 20 useful local intent queries in Russian and Kazakh, matched to actual verified services; capture date, platform, language, query, observed answer/reference/URL and limitations. Distinguish mention, verified citation, search result and untested.

## Методика (воспроизводимо)

- **Дата:** 2026-11-01, 18:40–19:10 ALMT (UTC+5), Алматы
- **Платформа проверки:** Google Search via `web_search` (Tavily-style) — возвращает organic топ-5 + snippets; эмулирует обычный веб-поиск (Web search type). Отдельно — ручная проверка бренд-запроса.
- **Язык запросов:** 14 RU + 6 KK, все — локальный intent “Алматы” + услуги, которые TUBA реально делает (кухни, шкафы, гардеробные, корпусная/встроенная, прихожая, детская, тумбы в санузел). Неинvented services исключены (нет офисной/мягкой/металлической мебели).
- **Классификация результата:**
  - `CITATION (organic)` — прямая ссылка на tuba.kz в выборке топ-5
  - `MENTION` — текстовое упоминание бренда без ссылки (ghost citation) — в текущих инструментах не наблюдаема, помечается как `untested`
  - `NO` — tuba.kz отсутствует в топ-5
  - `UNTESTED` — для AI Mode / AI Overviews внутри выдачи, ChatGPT, Claude — отдельный доступ нужен; честно помечаем как нетестировано
- **Ограничения:** один IP/датацентр, без персонализации по аккаунту, без эмуляции мобильного/десктоп, без GEO радиуса; позиции могут меняться; низкая выборка → высокая вариабельность (см. § риски).
- **Tuba.kz baseline:** домен молодой/нишевый, конкурентов ~200+ по broad-запросам (MasterMebel, SAF Mebel, MebelGuru, TheFive, etc.)

## Матрица наблюдений

| # | Язык | Query (как введено) | Платформа | Наблюдение 2026-11-01 | Тип | Ссылка / домен из топа (факт) |
|---|------|---------------------|-----------|------------------------|-----|-------------------------------|
| 1 | RU | мебель на заказ Алматы | Google Web | **NO** — tuba.kz вне топ-5; топ: mastermebel.kz, kaspi obyavleniya, saf-mebel.kz, mebelonline.kz, maximebel.kz | NO | — |
| 2 | RU | кухни на заказ Алматы | Google Web | **NO** — топ: thefive.kz/kuxni, kuhnya.kz, mebelguru.kz/prjamye-kuhni, sanni.kz, kaspi | NO | — |
| 3 | RU | шкаф купе на заказ Алматы | Google Web | **NO** — топ: bestkit.kz, mebelwood.kz, qupe.kz, kupe.globaltm.kz, asia-elite.kz | NO | — |
| 4 | RU | гардеробная на заказ Алматы | Google Web | **NO** — топ: furnita.kz, saf-mebel.kz, dom-kuhni.kz, cupe.kz, pro100 master | NO | — |
| 5 | RU | корпусная мебель Алматы | Google Web | **NO** — топ: mebelguru.kz, mebelpodkluch.kz, amfactory.kz, piramidagroup, bufet.kz | NO | — |
| 6 | RU | встроенная мебель Алматы | Google Web | **NO** — tuba.kz не в топ-5; в сниппете тубы фраза “встроенная и корпусная” есть, но конкуренты (mebel-nazakaz.kz, pro-mr.kz) выше | NO | — |
| 7 | RU | шкафы на заказ Алматы | Google Web | **NO** — топ: thefive.kz/prixozhaya, kaspi, olx | NO | — |
| 8 | RU | прихожая на заказ Алматы | Google Web | **NO** — топ: thefive.kz/prixozhaya, mebelwood.kz, zoon.kz, olx | NO | — |
| 9 | RU | детская мебель на заказ Алматы | Google Web | **NO** — топ: artvance.kz, mebelwood.kz, bufet.kz/kids-room, akniet.kz | NO | — |
|10 | RU | мебель в ванную на заказ Алматы / тумба в санузел | Google Web | **NO** — топ: eco-service.kz, bestkit.kz, mebel-vat.kz | NO | — |
|11 | RU | TUBA мебель Алматы | Google Web | **CITATION (organic) — 1-е место** — `https://www.tuba.kz/` с rich snippet (address, phone, areaServed) | CITATION | https://www.tuba.kz/ |
|12 | RU | tuba.kz отзывы Алматы | Google Web | **NO (organic)** — топ: 2gis (Tuba ЖК/ресторан Актау), zoon.kz, yandex maps — бренд TUBA коллизия, отзывов о мебельной TUBA нет | NO | — |
|13 | RU | шкафы до потолка Алматы | Google Web | **NO** — топ: thefive.kz/prixozhaya/shkafyi-kupe-v-prixozhuyu, kaspi/olx | NO | — |
|14 | RU | кухни с островом Алматы | Google Web | **NO** — не в топ-5; TUBA имеет релевантный кейс “Кухня с островом”, но не ранжируется | NO | — |
|15 | KK | Алматы жиһаз тапсырыс | Google Web | **NO** — топ: delivery.yandex.kz, zeta.kz, 2gis (Mia mebel) | NO | — |
|16 | KK | Алматы ас үй жиһазы тапсырыс | Google Web | **NO** — топ: yandex kz delivery, satu.kz, oe.kz, olx.kz/kk | NO | — |
|17 | KK | Алматы гардероб тапсырыс | Google Web | **NO** — казахский inventory почти отсутствует; топ — RU-страницы | NO | — |
|18 | KK | Алматы шкаф тапсырыспен | Google Web | **NO** — топ — RU-страницы шкафов | NO | — |
|19 | KK | Алматы жиһаз жасау | Google Web | **NO** — топ: profimarket.kz (ALMACITY), 2gis mix | NO | — |
|20 | KK | Алматы тапсырыс жиһаз шеберханасы | Google Web | **NO** — топ: almaty fabric, mebelguru mix | NO | — |

**Сводка:** 1/20 CITATION (бренд, 5 %), 0/20 generic, 14/14 RU generic = NO, 6/6 KK = NO.

## Проверки AI-поиска (честно: UNTESTED)

| Surface | Доступ | Результат | Примечание |
|---------|--------|-----------|------------|
| Google AI Overviews (внутри web_search) | частично | **UNTESTED** — `web_search` не возвращает отдельный AI Overview блок; в сниппетах AI Overviews не детектед | нужен ручной браузер-тест в Алматы |
| Google AI Mode | нет | **UNTESTED** | нет доступа |
| ChatGPT (GPTBot) | blocked live | **UNTESTED** — live robots `GPTBot: Disallow` → даже если ChatGPT захочет процитировать, crawl block может мешать | см. robots аудит |
| Claude / Perplexity | blocked live | **UNTESTED** — аналогично `ClaudeBot`, `PerplexityBot` (via Bytespider/CCBot) blocked |  |
| GA4 / лиды | нет | **UNKNOWN** | см. baseline |

## Интерпретация (без выдумок)

1. **TUBA видна только по точному бренд-запросу** (ожидаемо для нового сайта с 2 URL и 141-дневным stale sitemap). По broad-коммерческим запросам (“мебель на заказ Алматы” — 434 объявления Kaspi, 1000+ конкурентов) TUBA вне топ-5 — не аномалия, а baseline.
2. **Казахский surface = 0**: на сайте нет `kk-KZ` контента, `hreflang` только `ru-KZ`. AI-модели, обученные на каз. корпусе, не имеют на что опереться для цитаты (нет ни `Тапсырыс бойынша жиһаз`, ни транслита). Подтверждено: все KK-запросы отдают RU-результаты или нерелевант (доставка жиһаза).
3. **Коллизия бренда “Tuba”**: в 2GIS/Яндекс встречается “Tuba ЖК/ресторан Актау”, “Туба кондитерский Усть-Каменогорск” — размывает entity. Без `sameAs` + карты/гео TUBA-мебель рискует не получить distinct Knowledge Graph.
4. **Image citation**: 12 проектных фото есть на сайте, но вне image sitemap — упускается канал AI image grounding.
5. **Ghost citation** (упоминание без ссылки) — **не измерена** (требует ручной проверки в AI UI); честно помечена как UNTESTED, а не ZERO.

## Ограничения (limitations) — обязательно читать

- Один срез (single snapshot) — не тренд; позиции меняются ежедневно.
- Топ-5 vs топ-10: проверка топ-5 занижает recall; TUBA может быть на поз. 8–20 — но для AI citation важна 1-я страница, поэтому топ-5 — строгий, но честный порог.
- Без GEO-радиуса (Бенберина 18 ±5км) — локальный пак мог показать TUBA ближе, но не тестировался.
- Без device split (mobile vs desktop) — AI Overviews чаще на mobile.
- `web_search` ≠ живой браузер Алматы — может отличаться персонализацией/локацией.
- Низкий объём запросов → высокая дисперсия: ±1 позиция = 20% swing.

## Воспроизводимость

```bash
# любой может повторить 2026-11-15:
# 1) открыть Google (kz/ru, инкогнито, Алматы)
# 2) ввести каждый query из таблицы (копипаста)
# 3) зафиксировать: есть ли https://www.tuba.kz/ в топ-5 и в AI Overview блоке
# 4) сравнить с CSV: docs/CP-AI-SEARCH-01/03_QUERIES_20_MATRIX.csv
```

CSV-дамп прилагается — machine-readable для 14-дневного сравнения.

