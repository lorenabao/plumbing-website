# Implementation Status (What’s Mock vs. Done)

This document summarizes what is **already implemented** in the website and what is still **mock/stubbed** or needs finishing before a real production launch.

Last reviewed: **February 12, 2026**

---

## Implemented (Working)

- **Main pages**: Home, Services, Service detail, Gallery, About, Contact, City/service-area pages
- **Contact form backend**: `POST /api/contact` sends email via **Resend** (requires env vars)
- **Admin auth**: Password + JWT cookie protection for `/admin/*` and `/api/admin/*`
- **Admin editors (local-first)**:
  - Business editor → writes `data/business.json`
  - Testimonials editor → writes `data/testimonials.json`
- **SEO basics**: sitemap + robots + JSON-LD schema components
- **GDPR cookie consent**: client-side consent storage + GA consent updates

---

## Still Mock / Stubbed / Incomplete

### 1) Admin panel “Coming soon” sections

These pages are present but are **UI stubs** (they show “Próximamente”):
- `/admin/services` → edit `content/services.ts` instead
- `/admin/gallery` → edit `content/gallery.ts` + add images to `public/images/gallery/`
- `/admin/cities` → edit `content/cities.ts`

### 2) Missing production assets (currently not in `public/`)

The repo currently has an empty `public/` folder, but the site references:
- `public/favicon.ico`
- `public/og-image.jpg`
- `public/images/services/*.jpg`
- `public/images/gallery/*` (before/after)

Until these files exist, social previews and image sections will look incomplete.

### 3) Placeholder values that must be replaced

- **Google Search Console verification** is a placeholder in `app/layout.tsx`:
  - `verification.google = "YOUR_GOOGLE_VERIFICATION_CODE"`
- **Privacy policy NIF/NIE** placeholder in `app/politica-privacidad/page.tsx`:
  - `[Número a completar]`

### 4) Content duplication to keep in sync

Business info exists in **two places**:
- `content/site.config.ts` (used by header/footer/SEO + some pages + contact recipient)
- `data/business.json` (served by `/api/public/business`, used by the homepage)

Before launch, either:
- keep both files in sync, or
- refactor to a single source of truth.

### 5) Partial i18n

There is a language toggle (ES/EN), but many pages/content blocks are still Spanish-only. Decide whether to:
- fully support English across the whole site, or
- keep the UI Spanish-only and remove the toggle.

### 6) “Nice to have” but currently unused

- `components/ui/ScheduleWidget.tsx` exists (Cal.com), but isn’t used on any page yet.

### 7) Build warning (Next.js 16)

`npm run build` currently warns that the `middleware.ts` convention is deprecated in Next.js 16 and suggests migrating to the `proxy` convention. The site still builds and runs, but this should be addressed to avoid future breakage.

---

## Go‑Live Checklist (Recommended Order)

1. Add all required images and icons under `public/` (services, gallery, OG image, favicon).
2. Replace legal placeholders:
   - NIF/NIE in `app/politica-privacidad/page.tsx`
3. Configure Google Search Console verification:
   - update `verification.google` in `app/layout.tsx`
4. Configure production environment variables in Vercel:
   - `RESEND_API_KEY`, `RESEND_DOMAIN`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`
   - optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CAL_LINK`
5. Smoke-test:
   - Submit the contact form and verify the email arrives
   - Confirm `/admin/login` works (and that you set a strong password + JWT secret)
   - Check sitemap + robots are reachable in production
6. Run `npm run build` locally before pushing.

---

## Where the “How to update content / deploy” docs live

- Content updates + workflow: `docs/MAINTENANCE.md`
- Initial setup + Vercel/Resend/DNS: `docs/DEPLOYMENT.md`
- Content file editing reference: `content/README.md`
- Technical reference: `docs/PRD.md`
