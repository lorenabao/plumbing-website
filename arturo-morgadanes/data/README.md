# `data/` (Admin-Editable Content)

This folder contains JSON files that can be edited via the local admin panel:

- `business.json` — business configuration used by `/api/public/business`
- `testimonials.json` — customer reviews used by `/api/public/testimonials`

## How Updates Work

When you edit content in the admin UI (`/admin/business`, `/admin/testimonials`), the server writes changes to these JSON files via `lib/data.ts`.

**Recommended workflow (safe for Vercel):**

1. Run locally: `npm run dev`
2. Login: `http://localhost:3000/admin/login`
3. Edit and save content
4. Commit the updated JSON files and push to `main`

Vercel will deploy the new JSON content with the build.

## Important Note About Vercel

Vercel serverless functions do **not** provide reliable persistent writes to the project filesystem. Treat the admin panel as a **local editor** and deploy updates by committing the JSON changes.

## Keeping Business Info Consistent

Some pages/components still import business info from `content/site.config.ts` (header/footer, SEO metadata, contact form recipient). Keep `data/business.json` and `content/site.config.ts` in sync.

