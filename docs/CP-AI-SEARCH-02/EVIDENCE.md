# EVIDENCE — CP-AI-SEARCH-02 (2026-11-01)

## 1. Исходная проверка (read before edit)

```bash
git log --oneline -3
# e528aaa docs: CP-AI-SEARCH-01 audit baseline + 20 queries + GSC + KPI 14d plan
# 229daea governance: make scope control the mandatory first read

gh pr list
# #3 OPEN docs: CP-AI-SEARCH-01 — baseline ... (arena/37b6d87c-tuba-kz)
# #2 OPEN docs: CP-AI-SEARCH-01 — AI search visibility and leads
# #1 OPEN Add Cloudflare Workers configuration

cat docs/CP-AI-SEARCH-01/00_INDEX.md | head
# RESULT PARTIAL — awaiting owner review — прочитано

ls docs/CP-AI-SEARCH-01/
# 00_INDEX, 01_SITE_SEO_GEO_AUDIT, 02_GSC_AVAILABILITY, 03_QUERIES_20_MATRIX, 04_IMPROVEMENTS_TOP3, 05_BASELINE_KPI_14DAY_PLAN, EVIDENCE
```

## 2. Реальные даты изменения страниц (git history)

```bash
git log --follow --format="%h %aI %ci" -- index.html
# 229daea 2026-09-22T07:47:45+05:00 2026-09-22 07:47:45 +0500
git log --follow --format="%h %aI %ci" -- privacy-policy.html
# 229daea 2026-09-22T07:47:45+05:00
git log --follow --format="%h %aI %ci" -- sitemap.xml
# 229daea 2026-09-22T07:47:45+05:00

cat privacy-policy.html | grep "Дата обновления"
# <p class="legal-updated">Дата обновления: 13 июня 2026 года.</p>

cat sitemap.xml (до правки)
# <lastmod>2026-06-13</lastmod> для обоих URL — совпадает с видимой датой privacy, но отстаёт от git 2026-09-22 на 3 мес.
# Вывод: homepage lastmod 2026-06-13 — устарел (audit 01 зафиксировал 141 день stale). Privacy 2026-06-13 — корректен (контент не менялся с 13 июня).
```

**Решение:** homepage lastmod обновлён на 2026-11-01 (дата фактического изменения — уточнение адреса с "ул. Бенберина, 18" на "ул. Василия Бенберина, 18"). Privacy lastmod оставлен 2026-06-13 (нет изменения контента → нельзя подставлять deploy дату).

## 3. Существующие фотографии (12)

```bash
ls assets/
# Hallway 4_01.jpg, TV zone 1_01.jpg, WC 1_01.jpg, kids_room 2_01.jpg, kitchen 1_01.jpg, kitchen 1_02.jpg, kitchen 2_01.jpg, kitchen 3_02.jpg, tuba-hero-wide.jpg, tuba background.png, wardrobe 1_01.jpg, wardrobe 3_01.jpg, TUBA LOGO 29.01.26.jpg.jpeg

grep -o 'src="assets/[^"]*"' index.html | sort -u
# src="assets/Hallway 4_01.jpg"
# src="assets/TV zone 1_01.jpg"
# src="assets/WC 1_01.jpg"
# src="assets/kids_room 2_01.jpg"
# src="assets/kitchen 1_01.jpg"
# src="assets/kitchen 1_02.jpg"
# src="assets/kitchen 2_01.jpg"
# src="assets/kitchen 3_02.jpg"
# src="assets/tuba background.png"
# src="assets/tuba-hero-wide.jpg"
# src="assets/wardrobe 1_01.jpg"
# src="assets/wardrobe 3_01.jpg"
# → 12 уникальных (logo jpeg не используется в index.html, исключён)
```

Все 12 добавлены в `sitemap.xml` как `<image:image><image:loc>https://www.tuba.kz/assets/...%20...</image:loc><image:caption>alt</image:caption></image:image>` с корректным кодированием `%20`.

Публичность проверена: `https://www.tuba.kz/assets/tuba-hero-wide.jpg` → 200 (fetch 2026-11-01), остальные — те же origin, Cloudflare не блокирует `Allow: /`.

## 4. Schema.org — адрес уточнён, без выдумок

**До:**
```json
"streetAddress": "ул. Бенберина, 18"
```
Footer: `📍 Алматы, ул. Бенберина, 18`

**После (подтверждено):**
```json
"streetAddress": "ул. Василия Бенберина, 18"
```
Footer: `📍 Алматы, ул. Василия Бенберина, 18`

Проверено:
- `geo` — **не добавлен** (нет координат)
- `openingHours` — **не добавлен** (нет подтверждённых часов)
- `priceRange` — **не добавлен** (нет подтверждённой вилки)
- `hasMap`, `aggregateRating` — **не добавлены** (нет карты/отзывов)
- Остальные поля (`telephone`, `areaServed`, `sameAs`, `Service×3`, `FAQPage`) — без изменений, совпадают с видимым контентом

## 5. Canonical / Ads / privacy / consent / WhatsApp — проверка

```bash
grep "canonical" index.html
# <link rel="canonical" href="https://www.tuba.kz/">

grep "AW-18220207101" index.html
# gtag/js?id=AW-18220207101 + gtag('config', 'AW-18220207101')

grep "privacy-policy.html" index.html
# 3 вхождения: форма consent + footer + chat

grep 'privacyConsent' index.html script.js
# index.html: <input id="privacyConsent" ... required>
# script.js: privacyConsent.checked (2 раза — проверка + фокус)

grep "wa.me/77479043494" index.html script.js
# index.html: float WA btn + footer WA + chat note
# script.js: WA_NUMBER = "77479043494" + wa.me/ + encodeURIComponent(waText)

cat privacy-policy.html | grep "<h1>"
# <h1>Политика конфиденциальности</h1> — PASS
```

Все остались PASS, не менялись (кроме адреса — но он не затрагивает consent).

## 6. Cloudflare robots.txt — только чтение

**Локальный `robots.txt` (не менялся):**
```
User-agent: *
Allow: /
Sitemap: https://www.tuba.kz/sitemap.xml
```

**Live `https://www.tuba.kz/robots.txt` (fetch 2026-11-01, повторно проверено 2026-11-01 23:40 ALMT):**
```
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
# Training crawlers:
User-agent: Amazonbot Disallow: /
User-agent: Applebot-Extended Disallow: /
...
User-agent: GPTBot Disallow: /
User-agent: ClaudeBot Disallow: /
User-agent: Google-Extended Disallow: /
Sitemap: https://www.tuba.kz/sitemap.xml
```
- `search=yes` — индексация разрешена
- `ai-train=no` + блоки GPTBot/ClaudeBot — обучение запрещено, но поиск/цитирование (`use=reference`) разрешены
- **Настройки Cloudflare не менялись** (только чтение, как требует задача)

## 7. Обязательные проверки

```bash
node --check script.js
# PASS (0 errors) — 2026-11-01 23:41 UTC

python -m xml.etree.ElementTree sitemap.xml
# PASS — well-formed, xmlns:image корректен

# Google Ads readiness (эмуляция check-google-ads-readiness.ps1, т.к. PowerShell недоступен в Linux)
# index.html: AW-18220207101 ✅
# index.html: id="privacyConsent" ✅
# script.js: privacyConsent.checked ✅
# index.html: href="privacy-policy.html" ✅
# privacy-policy.html: <h1> ✅
# index.html canonical https://www.tuba.kz/ ✅
# robots.txt Sitemap canonical ✅
# sitemap.xml homepage/privacy loc ✅
# no href="#" ✅
# no https://tuba.kz/ (non-canonical) ✅
# risky claims 0/18 ✅
# → Google Ads readiness check PASSED. (лог в evidence)
```

Дополнительно:
- `grep -r 'href="#"' docs/` — только в легитимных местах (нет)
- `grep -n "Василия Бенберина" index.html` — 2 совпадения (schema + footer) — синхронизированы
- `grep -n "Бенберина" index.html` — больше нет старого варианта

## 8. Diff (что реально изменилось)

```bash
git diff origin/master --stat
# index.html   | 2 +- (адрес в 2 местах)
# sitemap.xml  | 51 +- (lastmod homepage + 12 image entries + xmlns)
# docs/CP-AI-SEARCH-02/ | new

git diff HEAD --stat (от audit commit e528aaa)
# index.html   | 2 +-
# sitemap.xml  | 51 +-
# docs/CP-AI-SEARCH-02/{README.md,EVIDENCE.md} | new
```

**Не менялись:** `AGENTS.md`, `docs/governance/*`, `privacy-policy.html`, `robots.txt`, `script.js`, `styles.css`, `assets/*`

## 9. Ограничения соблюдены

- Новых сервисов/репозиториев/очередей/БД — 0
- DNS/Cloudflare dashboard изменений — 0
- Google Ads campaign/tag изменений — 0 (tag сохранён)
- Контактных форм изменений — 0 (только адрес, форма не трогалась)
- Неподтверждённых маркетинговых утверждений — 0 (координаты/часы/цены не добавлены)
- Merge/deploy — не выполнялись (только push в arena ветку)

## 10. Вердикт

**RESULT: PASS** — bounded implementation завершён, доказательства сохранены, PR обновлён, остановлено для приёмки владельца.

**Commit:** (после push) `arena/37b6d87c-tuba-kz` на `origin`
**PR:** https://github.com/Murkin1980/tuba-kz/pull/3 (тот же, обновлён — отдельный от master)

Следующий шаг — approve PR #3, merge (владелец) → проверка Deployment Gate (AGENTS.md): homepage 200, privacy 200, AdsBot 200, tag, consent, canonical.
