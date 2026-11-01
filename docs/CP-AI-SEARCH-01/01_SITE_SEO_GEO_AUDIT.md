# 01 — Аудит сайта, SEO, GEO и готовности к AI-поиску (2026-11-01)

> Read-only, без изменений кода. Проверено на живых страницах через Arena fetch + локальный `index.html` (229daea). Время: 2026-11-01 18:30 ALMT (UTC+5).

## 1. Живая доступность (публичные URL)
| URL | Ожидаем | Факт 2026-11-01 | Примечание |
|-----|---------|----------------|------------|
| `https://www.tuba.kz/` | 200, `index,follow` | **200** (fetch OK), `index,follow,max-image-preview:large` | hero + контент совпадает с `index.html` из репо |
| `https://www.tuba.kz/robots.txt` | `Allow: /` + sitemap canonical | **200** — см. расхождение ниже | live содержит Cloudflare Managed блок |
| `https://www.tuba.kz/sitemap.xml` | 2 URL, www host | **200**, 2 URL | `lastmod 2026-06-13` — устарел на **141 день** |
| `https://www.tuba.kz/privacy-policy.html` | 200, H1, ru-KZ | **200** | соответствует репо, дата 13.06.2026 |
| `https://www.tuba.kz/llms.txt` | опционально | **404 / пусто** | отсутствует |
| `https://tuba.kz/` (без www) | redirect на www | **не проверен из sandbox (TLS block)**, но canonical везде `www` | проверить после деплоя через внешний чекер |

**Evidence:** `fetch_page https://www.tuba.kz/` вернул заголовок `TUBA — Корпусная и встроенная мебель на заказ в Алматы`, H1 `Мебель на заказ в Алматы`, все 6 секций. Логи — в `EVIDENCE.md`.

## 2. Canonical и хост-консистентность — PASS
- `<link rel="canonical" href="https://www.tuba.kz/">` — везде.
- `og:url=https://www.tuba.kz/`, `og:image=https://www.tuba.kz/assets/...`, `sitemap.xml` — `https://www.tuba.kz/`.
- `robots.txt` (live): `Sitemap: https://www.tuba.kz/sitemap.xml` ✅
- `privacy-policy.html`: canonical `https://www.tuba.kz/privacy-policy.html` ✅
- **Найдено:** ни одного `https://tuba.kz/` (без www) в репо — `Reject-Match` из `check-google-ads-readiness.ps1` проходит.
- **Замечание:** `robots.txt` в репо короткий (4 строки), а live — расширен Cloudflare. Это не ошибка репо, а управляемая настройка Cloudflare (см. §5).

## 3. Мета и Open Graph — PASS с 1 рекомендацией
| Тег | Значение | Норма | Вердикт |
|-----|----------|-------|---------|
| `<title>` | `TUBA — Корпусная и встроенная мебель на заказ в Алматы` (54 симв.) | 30–60 | ✅ |
| `meta description` | `Мебель на заказ в Алматы от TUBA. Проектируем и изготавливаем кухни, шкафы, гардеробные и корпусную мебель по индивидуальным размерам.` (134 симв.) | 120–160 | ✅ |
| `meta robots` | `index,follow,max-image-preview:large` | должен быть index | ✅ |
| `og:type` | `website` |  | ✅ |
| `og:title` | `TUBA — Корпусная мебель на заказ в Алматы` |  | ✅ |
| `og:description` | `Индивидуальное проектирование ... в WhatsApp.` |  | ✅ |
| `og:image` | `https://www.tuba.kz/assets/tuba-hero-wide.jpg` 1920×634 | ≥1200×630 | ✅ (но в OG нет `alt` дубля в HTTP заголовках) |
| `og:locale` | `ru_KZ` |  | ✅ |
| `twitter:card` | `summary_large_image` |  | ✅ |
| `hreflang` | только `ru-KZ` → `https://www.tuba.kz/` | нужен `kk-KZ` для каз. запросов | ⚠️ см. улучшение #3 |
| `author` | `tuba.kz` |  | ✅ |

## 4. Структура контента — PASS
- **H1 един:** `Мебель на заказ в Алматы` ✅
- **H2:** 5 (Что мы производим, Реализованные кейсы, Создаем мебель в 4 шага, Онлайн-заявка, FAQ) ✅
- **Навигация:** 5 якорей `#services #portfolio #process #faq #contact` + tel, WhatsApp, Instagram — все `href` валидны, **ни одного `href="#"`** ✅
- **Изображения:** 12 проектов + hero; 11 с `loading="lazy"`, hero `eager+fetchpriority:high` ✅; `alt` заполнены, кроме декоративного логотипа (`alt=""` допустимо) ✅
- **Форма:** `id="leadForm"`, `privacyConsent` required, `isValidPhone` (11 цифр), `privacyConsent.checked` проверяется в `script.js` — WhatsApp открывается только после согласия ✅
- **Чат-виджет:** отдельный flow, согласие через текст ссылки на политику ✅
- **Дубли:** FAQ на странице (4 `<details>`) и `FAQPage` в JSON-LD — совпадают по смыслу, без выдуманных гарантий ✅

## 5. robots.txt — РАСХОЖДЕНИЕ (важно для AI-видимости)

**Репо** (`robots.txt`):
```
User-agent: *
Allow: /
Sitemap: https://www.tuba.kz/sitemap.xml
```

**Live** (2026-11-01, fetch):
```
# BEGIN Cloudflare Managed content
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

# Training crawlers — Blocked:
Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot,
Diffbot, Google-Extended, GPTBot, omgili, anthropic-ai, Claude-Web,
cohere-ai, MistralAI-Training, meta-externalagent, GoogleOther, ...
# END Cloudflare Managed Content

User-agent: *
Allow: /
Sitemap: https://www.tuba.kz/sitemap.xml
```

**Что означает:**
- `Content-Signal: search=yes,ai-train=no,use=reference` — разрешает поисковое индексирование и цитирование, запрещает обучение моделей — корректно для желающих остаться в поиске, но не в датасетах.
- Блокировка `GPTBot / ClaudeBot / Google-Extended / Bytespider / CCBot` **препятствует индексации для ChatGPT, Claude, Perplexity и др.**, но **не мешает Google Search / AI Overviews** (Googlebot, Google-CloudVertexBot частично, AdsBot — не заблокированы).
- Если цель CP-AI-SEARCH-01 — быть найденным в AI-ответах ChatGPT/Perplexity — текущая конфигурация **снижает шансы** (GPTBot Disallow). Если цель — только Google AI Overviews — текущая конфигурация **сохраняет** видимость (search=yes).
- **Рекомендация:** зафиксировать решение владельца в документации (см. `04_IMPROVEMENTS_TOP3.md`).

## 6. sitemap.xml — WARNING
```xml
<url><loc>https://www.tuba.kz/</loc><lastmod>2026-06-13</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
<url><loc>https://www.tuba.kz/privacy-policy.html</loc><lastmod>2026-06-13</lastmod><changefreq>yearly</changefreq><priority>0.2</priority></url>
```
- Формат валиден, хост canonical ✅
- **lastmod 141 день в прошлом** (06-13 → 11-01) при `changefreq: weekly` — сигнал свежести для краулеров/GEO stale.
- Нет `<image:image>` для 12 фото проектов (упускается image search + GEO image citation).
- Нет `xhtml:link rel="alternate" hreflang`.

## 7. Structured Data (JSON-LD) — PASS, но неполно
```json
@type: [FurnitureStore, LocalBusiness]
name: TUBA — Мебель на заказ в Алматы
url: https://www.tuba.kz/
telephone: +77479043494
address: { streetAddress: ул. Бенберина, 18, addressLocality: Алматы, addressCountry: KZ }
areaServed: Алматы
sameAs: [wa.me/..., instagram.com/tuba_almaty]
Service×3: Кухни/Шкафы/Гардеробные — provider→#business, areaServed Алматы
FAQPage: 4 вопроса (совпадают с видимыми <details>)
```
**Проверки:**
- Совпадает с видимым адресом/телефоном в footer ✅
- `provider.@id` консистентен ✅
- FAQ ответы без unsupported claims (нет «гарантия 10 лет», «бесплатный замер» — формулировки нейтральные: «условия согласовываются», «фиксируется в договоре») ✅

**Отсутствует (опционально, но влияет на GEO/local pack):**
- `geo` (latitude/longitude для Бенберина 18) — снижает точность локального ранжирования
- `openingHours` / `openingHoursSpecification` — нет в видимом контенте, поэтому отсутствие честно, но если часы есть — стоит добавить после подтверждения владельца
- `priceRange` (например, `₸₸`) — помогает AI понять ценовой сегмент
- `hasMap` (ссылка на 2GIS/Google Maps)
- `aggregateRating` — **не добавлять без реальных отзывов** (guard в `google-ads-risky-claims.txt`)
- `inLanguage: ["ru-KZ","kk-KZ"]` — сейчас только `ru-KZ` в privacy

**GEO-индекс-годность:** Google docs (developers.google.com/search/docs/appearance/ai-features) прямо: «нет отдельного техтребования для AI Overviews — достаточно быть проиндексированным и иметь snippet». Текущий JSON-LD достаточен для Eligibility, но беднее конкурентов (у SAF Mebel, MebelGuru, Furnita есть `priceRange`, `geo`, каталоги).

## 8. Мобильный опыт и доступность — PASS
- `viewport` present ✅
- Skip-link ✅, `aria-label` на nav, `aria-expanded` на burger/chat, `aria-modal` на lightbox ✅
- Темный/светлый toggle (localStorage) ✅, burger overlay `overflow:hidden` ✅
- `IntersectionObserver` reveal (threshold 0.05) — не блокирует контент ✅
- Кнопки ≥40px, FAB WhatsApp 56px, chat 56px — соответствие 44px guideline ✅
- `lang="ru"` на `<html>` (но `ru-KZ` в OG/locale — небольшое расхождение; идеально `lang="ru-KZ"`) — minor.

## 9. Факты и рекламные риски — PASS
- `scripts/google-ads-risky-claims.txt` (18 паттернов) — **0 совпадений** в `index.html + script.js + privacy-policy.html + robots/sitemap` ✅
  - Список: `скидк`, `№\s*1`, `самые низкие`, `лучшая мебель`, `до 10 лет`, `15 лет`, `с 2011`, `бесплатн.* замер`, `от 10 до 15`, `передов* немецк`, `Blum`, `Hettich`, `Egger`...
- Все утверждения в тексте условны: «обсуждаются до заключения договора», «срок зависит... фиксируется в договоре», «условия согласовываются» — соответствует AGENTS.md (claims requiring confirmation не опубликованы) ✅
- WhatsApp-честность: «Мы подготовим сообщение... Проверьте его и нажмите Отправить в WhatsApp.» ✅

## 10. Производительность (статическая оценка, без Lighthouse run)
- CSS 34KB, JS ~22KB (defer), шрифты Google Fonts (2 семейства) — оптимально
- Preload hero image ✅
- Ошибок `node --check script.js` — **нет** (проверено) ✅
- Google Tag `AW-18220207101` — присутствует в `<head>` до `</head>` ✅

## 11. GEO/AI-search готовность — SUMMARY
| Сигнал | Статус | Влияние |
|--------|--------|---------|
| Индексация Google | Предположительно OK (см. §2,§5) | AI-eligible |
| AI crawl блокировки | `GPTBot/ClaudeBot/Google-Extended` BLOCKED (live) | Снижает ChatGPT/Claude цитируемость; Google AI Overviews — не трогает |
| `Content-Signal` | `search=yes,ai-train=no,use=reference` | Корректно для EU Copyright, но `use=reference` — не `full` |
| `llms.txt` / `ai.txt` | отсутствует | Не требуется Google, но полезен для Perplexity/CharGPT discovery |
| Schema свежесть | lastmod 141д, нет geo | Снижает локальный trust |
| Язык | только RU | 0% покрытие KZ AI surface |
| Факты | верифицируемые, без выдумок | Повышает доверие AI моделей |

## 12. Сохранение существующей архитектуры
- Google Ads tag сохранён ✅
- canonical `www` сохранён ✅
- consent + privacy ссылка сохранены ✅
- Отдельный сайт, без внедрения CMS/мониторинга ✅
- Нет `href="#"`, нет unsupported скидок/брендов ✅

**Итог секции:** PASS (технически) / PARTIAL (GEO) — сайт готов к индексации и Google AI Overviews, но stale-сигналы и блокировки тренировочных краулеров ограничивают широкую AI-видимость.
