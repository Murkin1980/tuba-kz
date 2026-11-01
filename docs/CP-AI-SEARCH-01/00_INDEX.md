# CP-AI-SEARCH-01 — AI/search visibility and qualified lead baseline

**Date:** 2026-11-01 (Almaty, KZ / UTC)
**Branch:** `arena/37b6d87c-tuba-kz` (from `229daea`)
**Target:** https://www.tuba.kz/
**Spec:** PR #2 `planning/ai-search-visibility-20261101` — MPE EXTEND_EXISTING, documentation-only
**Author:** Agent (Arena Mode) — read-only evidence, no merge/deploy
**Status:** READ-ONLY AUDIT COMPLETE — awaiting owner review

## Результат (RESULT)
**PARTIAL** — сайт технически доступен, Google Ads-ready и индексируем, но органическая видимость по 20 целевым запросам <5 % (кроме бренда), доступ к реальным метрикам Search Console отсутствует, измеримая AI-цитируемость и атрибуция лидов не подтверждены.

> Не блокирует: рекомендации ограничены ≤3 малыми правками существующего статического сайта. Все правки требуют отдельного подтверждения владельца (адрес, часы, условия замера, перевод на казахский).

## Что содержит папка
| Файл | Назначение |
|------|------------|
| `01_SITE_SEO_GEO_AUDIT.md` | Технический аудит главной, robots/sitemap, canonical, мета, schema, мобайл, доступность, факты |
| `02_GSC_AVAILABILITY.md` | Проверка Google Search Console — реальный доступ = DATA_UNAVAILABLE, официальная документация |
| `03_QUERIES_20_MATRIX.md` + `03_QUERIES_20_MATRIX.csv` | 20 запросов RU/KZ, методика, наблюдения 2026-11-01, лимиты |
| `04_IMPROVEMENTS_TOP3.md` | ≤3 улучшения с наибольшим влиянием на заявки |
| `05_BASELINE_KPI_14DAY_PLAN.md` | Baseline day-0, KPI, план сравнения через 14 дней, риски |
| `EVIDENCE.md` | Сводка доказательств, логи fetches, скрин-путь |
| `../governance/SCOPE-CHANGE-CONTROL.md` | Обязательный scope-контроль (unchanged) |

Соответствует критериям приёмки PR #2:
- датированный read-only аудит ✅
- 20-вопросная воспроизводимая матрица или честный blocker ✅
- наличие/отсутствие Search Console + официальный источник ✅
- ≤3 приоритизированных исправления ✅
- ограничения измерения лидов ✅
- 14-дневный план и PASS/PARTIAL/BLOCKED с доказательствами ✅
- Google Ads tag `AW-18220207101`, canonical `https://www.tuba.kz/`, consent, privacy, WhatsApp-формулировки — сохранены; новых сервисов/деплоя/merge — нет.

## Как верифицировать
```bash
# локальная копия (эта ветка)
node --check script.js
# Google Ads readiness (Windows, как в AGENTS.md)
powershell -ExecutionPolicy Bypass -File scripts/check-google-ads-readiness.ps1
# живые страницы — проверено через fetch (2026-11-01)
# https://www.tuba.kz/ -> 200 (через Cloudflare)
# https://www.tuba.kz/robots.txt -> 200
# https://www.tuba.kz/sitemap.xml -> 200
# https://www.tuba.kz/privacy-policy.html -> 200
```

Ограничения среды: прямые `curl` к www.tuba.kz из sandbox падают по TLS (`SSL_ERROR_SYSCALL`) из-за Cloudflare edge, но `fetch_page` (прокси Arena) отдаёт реальный HTML — это и использовано как evidence (см. `EVIDENCE.md`).

## Следующий шаг (stop for acceptance)
Владелец подтверждает:
1. фактический адрес/часы/условия выезда — можно ли публиковать в schema;
2. сознательное решение по блокировкам AI-краулеров в Cloudflare (сейчас `ai-train=no`, `Google-Extended` blocked);
3. нужен ли казахский `kk-KZ` вариант (перевод).

После `APPROVED` — внести ≤3 правки отдельным PR, повторно прогнать `check-google-ads-readiness.ps1` и `node --check`.
