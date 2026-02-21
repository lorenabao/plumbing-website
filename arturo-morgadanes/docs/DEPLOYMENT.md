# Deployment Guide - Arturo Morgadanes

Complete guide for deploying, updating, and maintaining the plumber website.

Note: In this workspace repo, the Next.js app lives in the `arturo-morgadanes/` subfolder. If you import the repo into Vercel, set the project **Root Directory** to `arturo-morgadanes`.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [Domain Configuration](#domain-configuration)
5. [Third-Party Services](#third-party-services)
6. [Content Updates](#content-updates)
7. [Code Updates](#code-updates)
8. [GDPR Compliance](#gdpr-compliance-eu-deployment)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)
11. [Cost Summary](#cost-summary)

---

## Prerequisites

### Required Accounts

| Service | Purpose | Cost |
|---------|---------|------|
| [GitHub](https://github.com) | Code repository | Free |
| [Vercel](https://vercel.com) | Hosting platform | Free tier |
| [Resend](https://resend.com) | Email delivery | Free (3k/month) |

### Required Assets

- Domain name (e.g., `arturomorgadanes.com`)
- Business information (phone, email, address)
- NIF/NIE for legal pages
- Photos for gallery and services

### Local Development Requirements

```bash
Node.js 18.17 or later
npm or yarn
Git
```

---

## Initial Setup

### Step 1: Update Business Information

Business info is currently used in **two places**:

- `content/site.config.ts` (static defaults used by header/footer, SEO, and the contact form recipient)
- `data/business.json` (used by `/api/public/business` and editable via `/admin/business`)

Update both to avoid inconsistencies.

Edit `content/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Arturo Morgadanes",
  contact: {
    phone: "+34 XXX XXX XXX",        // Real phone number
    whatsapp: "34XXXXXXXXX",         // WhatsApp (no + prefix)
    email: "info@arturomorgadanes.com",
    address: "Gondomar, Pontevedra, Galicia",
  },
  // ... update other fields as needed
};
```

Then update `data/business.json` (recommended via the admin panel when running locally).

### Step 2: Update Legal Information

**Privacy Policy** - `app/politica-privacidad/page.tsx`:
- Replace `[Número a completar]` with actual NIF/NIE

**Cookie Policy** - `app/politica-cookies/page.tsx`:
- Verify domain name is correct

### Step 3: Add Images

```
public/
├── images/
│   ├── hero/
│   │   └── plumber-hero.jpg       # Main hero image
│   ├── services/
│   │   ├── desatascos.jpg         # Each service needs an image
│   │   ├── fugas.jpg
│   │   ├── griferia.jpg
│   │   ├── calentador.jpg
│   │   ├── reforma-bano.jpg
│   │   └── urgencias.jpg
│   └── gallery/
│       └── (before/after photos)
├── og-image.jpg                   # 1200x630px for social sharing
└── favicon.ico                    # Site favicon
```

### Step 4: Update Google Verification

In `app/layout.tsx`:

```typescript
verification: {
  google: "YOUR_GOOGLE_VERIFICATION_CODE",
},
```

### Step 5: Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (verify no errors)
npm run build

# Test production build locally
npm start
```

---

## Deployment to Vercel

### Option A: Via Dashboard (Recommended)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/arturo-morgadanes.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub

3. Click **"Add New Project"** → Import repository

4. (Monorepo) In Project Settings → General, set **Root Directory** to `arturo-morgadanes`

5. Configure environment variables:

   | Variable | Value | Required |
   |----------|-------|----------|
   | `RESEND_API_KEY` | `re_xxxxxxxxxx` | Yes |
   | `RESEND_DOMAIN` | `arturomorgadanes.com` | Yes |
   | `ADMIN_PASSWORD_HASH` | `bcrypt-hash` | Yes (admin) |
   | `JWT_SECRET` | `random 32+ chars` | Yes (security) |
   | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Optional |
   | `NEXT_PUBLIC_CAL_LINK` | `cal-username` | Optional |

   Generate values:
   - `ADMIN_PASSWORD_HASH`: `node scripts/generate-password-hash.js "your-password"`
   - `JWT_SECRET`: `openssl rand -base64 32`

6. Click **"Deploy"**

### Option B: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Add environment variables
vercel env add RESEND_API_KEY
vercel env add RESEND_DOMAIN
vercel env add ADMIN_PASSWORD_HASH
vercel env add JWT_SECRET

# Deploy to production
vercel --prod
```

### Automatic Deployments

After initial setup, Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On pull requests

---

## Domain Configuration

### Add Domain in Vercel

1. Project Settings → Domains
2. Add `arturomorgadanes.com`
3. Add `www.arturomorgadanes.com`

### DNS Records

At your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

### Email DNS (Resend)

Add these records for email delivery:

| Type | Name | Value |
|------|------|-------|
| TXT | @ | SPF record from Resend |
| TXT | resend._domainkey | DKIM record from Resend |
| TXT | _dmarc | `v=DMARC1; p=none;` |

---

## Third-Party Services

### Resend (Email)

1. Create account at [resend.com](https://resend.com)
2. Add domain → Configure DNS records
3. Create API key → Add to Vercel env vars

### Google Analytics

1. Create property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add `NEXT_PUBLIC_GA_ID` to Vercel

### Google Search Console

1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify via DNS or HTML tag
3. Submit sitemap: `https://arturomorgadanes.com/sitemap.xml`

### Google My Business

1. Claim/create listing at [business.google.com](https://business.google.com)
2. Add website URL
3. Verify business

### Cal.com (Optional)

1. Create account at [cal.com](https://cal.com)
2. Set availability hours
3. Create event types (Consulta, Presupuesto, Urgencia)
4. Add `NEXT_PUBLIC_CAL_LINK` to Vercel

---

## Content Updates

### Updating Business Info

Business info updates require keeping these in sync:

- `data/business.json` (homepage + `/api/public/business`)
- `content/site.config.ts` (header/footer, SEO, contact page + contact form recipient)

Recommended workflow (local admin editor):
1. Run `npm run dev`
2. Login at `/admin/login`
3. Edit business info at `/admin/business` (saves to `data/business.json`)
4. Update `content/site.config.ts` to match
5. Commit + push

```bash
git add data/business.json content/site.config.ts
git commit -m "Update business info"
git push
```

### Updating Services

Edit `content/services.ts`:

```typescript
export const services: Service[] = [
  {
    slug: "new-service",
    name: "Nuevo Servicio",
    // ...
  },
];
```

### Updating Prices

Prices are in each service's `priceRange` field (and optionally `duration`) in `content/services.ts`.

### Updating Testimonials

Use `/admin/testimonials` (writes to `data/testimonials.json`) or edit `data/testimonials.json` directly, then commit + push.

### Updating Gallery

1. Add images to `public/images/gallery/`
2. Update `content/gallery.ts`:

```typescript
export const galleryItems: GalleryItem[] = [
  {
    id: "new-item",
    title: "Título",
    description: "Descripción",
    beforeImage: "/images/gallery/before.jpg",
    afterImage: "/images/gallery/after.jpg",
    service: "Reforma de baño",
    date: "2025-01",
  },
];
```

### Updating City Pages

Edit `content/cities.ts` to add/modify service areas.

### Content Update Workflow

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Verify build
npm run build

# 4. Commit and push
git add .
git commit -m "Update: description of changes"
git push

# 5. Vercel auto-deploys (check dashboard)
```

---

## Code Updates

### Adding New Pages

1. Create file in `app/` directory:
   ```
   app/nueva-pagina/page.tsx
   ```

2. Add to sitemap in `app/sitemap.ts`

3. Add to navigation in `components/layout/Header.tsx`

### Adding New Components

1. Create in appropriate directory:
   - `components/ui/` - Reusable UI components
   - `components/layout/` - Layout components
   - `components/seo/` - SEO components

2. Use TypeScript and follow existing patterns

### Updating Styles

- Global styles: `app/globals.css`
- Component styles: Tailwind classes inline
- Color scheme: `tailwind.config.ts`

### Dependencies

```bash
# Add new package
npm install package-name

# Update packages
npm update

# Check for vulnerabilities
npm audit
```

---

## GDPR Compliance (EU Deployment)

### Cookie Consent Features

The site includes a GDPR-compliant cookie banner:

- Blocks page interaction until choice is made
- Three options: Accept All, Only Necessary, Configure
- Granular control over analytics/marketing cookies
- Persists choice in localStorage
- Footer link to change preferences

### Google Analytics Consent Mode v2

Analytics configured with:
- Default denied until consent given
- IP anonymization enabled
- Automatic consent state restoration

### Legal Pages

| Page | Path | Purpose |
|------|------|---------|
| Privacy Policy | `/politica-privacidad` | RGPD/LOPDGDD compliance |
| Cookie Policy | `/politica-cookies` | Cookie disclosure |

### Pre-Launch Checklist

- [ ] NIF/NIE added to Privacy Policy
- [ ] Cookie banner appears on first visit
- [ ] "Only Necessary" disables analytics
- [ ] "Accept All" enables analytics
- [ ] Cookie settings changeable via footer
- [ ] Legal pages accessible and accurate

---

## Monitoring & Maintenance

### Vercel Dashboard

- Deployment status and logs
- Function execution logs
- Analytics (Pro plan)
- Error tracking

### Resend Dashboard

- Email delivery status
- Bounce rates
- Failed sends

### Google Search Console

- Search performance
- Indexing status
- Core Web Vitals
- Mobile usability

### Regular Maintenance Tasks

| Task | Frequency |
|------|-----------|
| Check contact form emails | Weekly |
| Review analytics | Monthly |
| Update dependencies | Quarterly |
| Review/update content | As needed |
| Check SSL certificate | Auto-renewed |

### Health Checks

```bash
# Check site is live
curl -I https://arturomorgadanes.com

# Check sitemap
curl https://arturomorgadanes.com/sitemap.xml

# Check robots.txt
curl https://arturomorgadanes.com/robots.txt
```

---

## Troubleshooting

### Contact Form Not Sending

1. Verify `RESEND_API_KEY` in Vercel
2. Check domain verification in Resend
3. Review function logs in Vercel
4. Test with Resend dashboard

### Site Not Loading

1. Check Vercel deployment status
2. Verify DNS records
3. Check domain configuration
4. Review build logs

### Build Failures

```bash
# Run build locally to see errors
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Check linting
npm run lint
```

### Analytics Not Working

1. Verify `NEXT_PUBLIC_GA_ID` is set
2. Check cookie consent was given
3. Use browser dev tools → Network tab
4. Check for ad blockers

### Images Not Loading

1. Verify images exist in `public/images/`
2. Check file paths in content files
3. Ensure correct file extensions
4. Check image optimization settings

---

## Cost Summary

### Monthly Costs (Free Tier)

| Service | Cost |
|---------|------|
| Vercel Hosting | €0 |
| Resend Email (3k/mo) | €0 |
| Domain (.com) | ~€1 (€10-12/year) |
| **Total** | **~€1/month** |

### Optional Upgrades

| Service | Cost | Benefits |
|---------|------|----------|
| Vercel Pro | €20/mo | Analytics, more bandwidth |
| Resend Pro | €20/mo | More emails, support |
| Cal.com Pro | €12/mo | Scheduling features |

---

## Support Resources

| Service | Documentation |
|---------|---------------|
| Vercel | [vercel.com/docs](https://vercel.com/docs) |
| Next.js | [nextjs.org/docs](https://nextjs.org/docs) |
| Resend | [resend.com/docs](https://resend.com/docs) |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| GDPR/RGPD | [aepd.es](https://www.aepd.es) |

---

## Quick Reference

### Key Files

| Purpose | File |
|---------|------|
| Business defaults (SEO/header/footer) | `content/site.config.ts` |
| Business JSON (homepage + admin) | `data/business.json` |
| Services | `content/services.ts` |
| Cities | `content/cities.ts` |
| Testimonials JSON (homepage + admin) | `data/testimonials.json` |
| Testimonials helpers/types | `content/testimonials.ts` |
| Gallery | `content/gallery.ts` |
| Layout | `app/layout.tsx` |
| Homepage | `app/page.tsx` |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Email service API key |
| `RESEND_DOMAIN` | Verified email domain |
| `ADMIN_PASSWORD_HASH` | bcrypt hash for admin login |
| `JWT_SECRET` | JWT signing secret for admin auth |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com username |

### URLs After Deployment

| Page | URL |
|------|-----|
| Homepage | `/` |
| Services | `/servicios` |
| Service Detail | `/servicios/[slug]` |
| Cities | `/zona-servicio/[city]` |
| Contact | `/contacto` |
| Gallery | `/galeria` |
| About | `/sobre-mi` |
| Privacy | `/politica-privacidad` |
| Cookies | `/politica-cookies` |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
