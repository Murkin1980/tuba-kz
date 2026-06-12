# Project Rules For TUBA.kz

## Google Ads Readiness Is Mandatory

Before changing, committing, pushing, or deploying any public website file, run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-google-ads-readiness.ps1
```

Do not deploy while this check fails.

Every public-site change must preserve these requirements:

1. Keep the Google Ads tag `AW-18220207101` in `index.html` unless the owner explicitly requests its removal.
2. Use one canonical host everywhere: `https://www.tuba.kz/`.
3. Keep a working public privacy policy linked from every form that collects personal data.
4. Require explicit consent before preparing or sending a lead containing a phone number or other personal data.
5. Describe WhatsApp behavior honestly: the site prepares a message; the user sends it.
6. Do not leave placeholder links such as `href="#"` in public trust/navigation areas.
7. Do not publish unsupported discounts, prices, guarantees, years of experience, production times, equipment claims, brands, ratings, or "best/number one" claims.
8. Schema.org and metadata must match visible page content.
9. Keep `robots.txt`, `sitemap.xml`, canonical, Open Graph, schema URLs, and ad final URLs aligned to the canonical host.
10. Before deployment, run JavaScript syntax validation and static SEO regression checks.

## Claims Requiring Owner Confirmation

Treat the following as unverified until the owner supplies current evidence:

- legal entity name and BIN/IIN;
- address, opening hours, and service area;
- free measurement conditions;
- guarantees and service-life claims;
- years in business;
- own workshop or equipment claims;
- named material/hardware brands;
- exact production times;
- discounts, installment terms, prices, and promotions.

If any of these are needed, ask the owner for confirmation before adding them to public code, metadata, schema, chat answers, or ads.

## Deployment Gate

Before production deployment:

1. Run `scripts/check-google-ads-readiness.ps1`.
2. Run `node --check script.js`.
3. Confirm only intended public files are staged.
4. After deployment, verify:
   - homepage HTTP 200;
   - privacy page HTTP 200;
   - AdsBot-Google HTTP 200;
   - Google Ads tag is present;
   - consent control is present;
   - canonical host is correct.

