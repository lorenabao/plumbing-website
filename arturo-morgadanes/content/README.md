# Content Management Guide

This folder contains most of the website's **static** content. Some admin-editable content is stored in `../data/`.

## Quick Start

| What to Update | File to Edit |
|----------------|--------------|
| Business info, phone, email | `site.config.ts` + `../data/business.json` (or `/admin/business`) |
| Service prices & descriptions | `services.ts` |
| Customer reviews | `../data/testimonials.json` (or `/admin/testimonials`) |
| Portfolio/gallery images | `gallery.ts` |
| Service areas/cities | `cities.ts` |

## File Overview

### `site.config.ts` - Main Configuration

The most important file. Contains:
- Business name and tagline
- Phone, WhatsApp, email
- Address and service area
- Business hours
- Statistics (years experience, jobs completed)
- SEO keywords

Note: The homepage also reads business info from `data/business.json` via `/api/public/business`. Keep `site.config.ts` and `data/business.json` in sync to avoid inconsistent phone/email/hours across pages.

```typescript
// Example: Change phone number
contact: {
  phone: "+34 666 123 456",  // ← Change this
  whatsapp: "34666123456",   // ← Numbers only, no +
  ...
}
```

### `testimonials.ts` - Customer Reviews

This file contains types/helpers and an example list, but the live testimonials shown on the homepage are loaded from `data/testimonials.json` via `/api/public/testimonials`.

To update testimonials:
- Use `/admin/testimonials` (recommended when running locally), or
- Edit `../data/testimonials.json` directly (newest first), then commit + push.

```typescript
// Copy this template to add a new review:
{
  name: "Customer Name",
  location: "City",
  service: "Service Type",
  rating: 5,
  text: "Review text...",
  date: "YYYY-MM",
},
```

### `gallery.ts` - Portfolio Projects

1. Add images to `public/images/gallery/`
2. Add entry at TOP of array:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  description: "Description...",
  beforeImage: "/images/gallery/before.jpg",
  afterImage: "/images/gallery/after.jpg",
  service: "Service Category",
  date: "YYYY-MM",
},
```

### `services.ts` - Services Offered

Each service has its own page. Quick edits:
- `priceRange`: Update pricing
- `duration`: Update time estimate
- `description`: Update page content (markdown)
- `faqs`: Update FAQ section

### `cities.ts` - Service Areas

Each city has its own landing page. Quick edits:
- `responseTime`: Update response time
- `localContent`: Update page content (markdown)
- `nearbyAreas`: Update nearby areas list

## After Making Changes

1. **Save the file**
2. **Test locally** (optional but recommended):
   ```bash
   npm run dev
   ```
3. **Verify build**:
   ```bash
   npm run build
   ```
4. **Deploy**:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```

Vercel will automatically deploy the changes.

## Common Tasks

### Change Phone Number
Edit `site.config.ts`:
```typescript
contact: {
  phone: "+34 NEW NUMBER",
  whatsapp: "34NEWNUMBER",
  ...
}
```

### Update Prices
Edit `services.ts`, find the service, update:
```typescript
priceRange: "NEW PRICE",
```

### Add a Testimonial
Recommended (local):
- Open `/admin/testimonials` (writes to `../data/testimonials.json`)

Or edit manually:
- Update `../data/testimonials.json` (add newest first), then commit + deploy

Note: `testimonials.ts` contains types/helpers and an example list, but it is **not** the live data source shown on the homepage.

### Add Gallery Item
1. Add images to `public/images/gallery/`
2. Edit `gallery.ts`, add at TOP of array.

### Add a New Service
1. Copy an existing service in `services.ts`
2. Update all fields
3. Add image to `public/images/services/`
4. Build to verify

### Add a New City
1. Copy an existing city in `cities.ts`
2. Update all fields
3. Build to verify

## Tips

- Keep the newest items at the TOP of arrays
- Use consistent date format: `YYYY-MM`
- Test locally before pushing
- Descriptions support Markdown formatting
- Images should be optimized (WebP or JPEG, reasonable size)
