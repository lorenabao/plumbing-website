# Product Requirements Document (PRD)
## Arturo Morgadanes - Professional Plumber Website

**Version:** 1.0
**Last Updated:** February 2026
**Status:** Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Directory Structure](#directory-structure)
4. [Content Management](#content-management)
5. [Features & Components](#features--components)
6. [API Endpoints](#api-endpoints)
7. [SEO Implementation](#seo-implementation)
8. [GDPR Compliance](#gdpr-compliance)
9. [Styling & Design System](#styling--design-system)
10. [Development Guidelines](#development-guidelines)
11. [Future Enhancements](#future-enhancements)
12. [Claude Code Instructions](#claude-code-instructions)

---

## Project Overview

### Purpose

A professional Spanish-language website for "Arturo Morgadanes", a plumber serving Vigo and surrounding areas in Galicia, Spain. The site is designed for lead generation through contact forms, WhatsApp, and phone calls.

### Business Goals

- Generate leads from local searches (SEO-focused)
- Provide easy contact methods (form, WhatsApp, phone)
- Showcase services and build trust
- Zero CMS for maintenance-free operation

### Target Audience

- Homeowners in Vigo and surrounding cities
- Property managers
- Businesses needing plumbing services
- Spanish-speaking users (primary language: Spanish)

### Key Metrics

- Contact form submissions
- WhatsApp button clicks
- Phone call clicks
- Service page views
- Local search rankings

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Email | Resend API | - |
| Analytics | Google Analytics 4 | - |
| Hosting | Vercel | - |
| Icons | Lucide React | - |

### Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Static Generation | Fast loading, SEO-friendly, low cost |
| No external CMS/DB | Content in TypeScript + git-tracked JSON; optional local admin editor |
| App Router | Latest Next.js patterns, better SEO |
| Tailwind CSS | Rapid development, consistent styling |
| Resend | Simple email API, good deliverability |

### Environment Variables

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_DOMAIN=arturomorgadanes.es

# Admin (recommended)
ADMIN_PASSWORD_HASH=$2a$12$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
JWT_SECRET=your-random-secret-key-change-in-production

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CAL_LINK=username
```

---

## Directory Structure

```
arturo-morgadanes/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (header, footer, analytics)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # Robots.txt generator
│   ├── sitemap.ts                # Sitemap generator
│   ├── admin/                    # Admin UI (login + editors)
│   │   ├── login/page.tsx
│   │   ├── business/page.tsx
│   │   └── testimonials/page.tsx
│   ├── api/
│   │   ├── contact/route.ts      # Contact form API endpoint
│   │   ├── auth/                 # Admin auth
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── public/               # Public JSON endpoints
│   │   │   ├── business/route.ts
│   │   │   └── testimonials/route.ts
│   │   └── admin/                # Protected admin JSON endpoints
│   │       ├── business/route.ts
│   │       └── testimonials/route.ts
│   └── ...                       # Site pages (contacto, servicios, etc.)
├── components/                   # UI + layout + SEO components
├── content/                      # Static content (TypeScript)
│   ├── site.config.ts            # Static business defaults (SEO/header/footer)
│   ├── services.ts               # Services data
│   ├── cities.ts                 # Service areas
│   ├── gallery.ts                # Gallery items
│   └── testimonials.ts           # Types/helpers (live data is in data/)
├── data/                         # Admin-edited JSON (commit + deploy)
│   ├── business.json
│   ├── testimonials.json
│   └── README.md
├── lib/                          # Shared helpers
│   ├── auth.ts                   # Admin auth helpers (JWT + cookies)
│   ├── data.ts                   # Read/write JSON in data/
│   ├── email.ts                  # Resend email helper
│   └── i18n/                     # i18n utilities
├── public/                       # Static assets
│   └── images/
├── scripts/
│   └── generate-password-hash.js
├── middleware.ts                 # Protects /admin and /api/admin
├── docs/                         # Documentation
├── next.config.js
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Content Management

### Content Sources

There are two sources of content:

1. `content/` (TypeScript, **commit + deploy**) — services, cities, gallery, and static business defaults (`content/site.config.ts`)
2. `data/` (JSON, **commit + deploy**) — business + testimonials edited via the admin panel and served from `/api/public/*`

Important: Vercel serverless functions do not provide reliable persistent filesystem writes. The admin panel is intended as a **local editor**; deploy updates by committing the JSON changes.

### Business Configuration

- Static defaults: `content/site.config.ts` (used by header/footer, SEO metadata, contact form recipient)
- Live JSON: `data/business.json` (served by `GET /api/public/business`, editable via `/admin/business`)

```typescript
// Shape of data/business.json (see lib/data.ts)
export interface BusinessConfig {
  name: string;
  title: string;
  tagline: string;
  url: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  stats: {
    experience: number;
    jobsCompleted: number;
    googleReviewScore: number;
    googleReviewCount: number;
  };
  certifications: string[];
  serviceArea: {
    radius: string;
    coordinates: { latitude: number; longitude: number };
  };
  social: { facebook: string; instagram: string; linkedin: string };
  keywords: string[];
}
```

Note: Some server-rendered pages/components still import `business` from `content/site.config.ts`. Keep `data/business.json` and `content/site.config.ts` in sync to avoid inconsistent phone/email/hours across pages.

### Testimonials (`data/testimonials.json`)

Testimonials displayed on the homepage are loaded from `data/testimonials.json` via `GET /api/public/testimonials` (editable via `/admin/testimonials`).

```typescript
// Shape of items in data/testimonials.json (see lib/data.ts)
export interface Testimonial {
  name: string;
  location: string;
  service: string;
  serviceEn?: string;
  rating: number;
  text: string;
  textEn?: string;
  date: string; // YYYY-MM
}
```

### Services (`content/services.ts`)

```typescript
export interface Service {
  slug: string;
  name: string;
  nameEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  description: string; // Markdown
  priceRange: string;
  duration: string;
  icon: string; // Lucide icon name
  image: string;
  gallery?: string[];
  isEmergency?: boolean;
  faqs: Array<{ question: string; answer: string }>;
}
```

### Cities (`content/cities.ts`)

```typescript
export interface City {
  slug: string;
  name: string;
  province: string;
  postalCodes: string[];
  responseTime: string;
  localContent: string; // Markdown
  nearbyAreas: string[];
}
```

### Gallery (`content/gallery.ts`)

```typescript
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  service: string;
  date: string; // YYYY-MM
}
```

---

## Features & Components

### Contact Form

**File:** `components/ui/ContactForm.tsx`

Features:
- Basic client-side required fields
- Server-side validation + sanitization
- Server-side rate limiting (5 submissions per hour per IP)
- Success/error feedback
- Spanish language

Fields:
- Nombre (required)
- Teléfono (required)
- Email (optional)
- Servicio (select)
- Mensaje (optional)
- Urgente (checkbox)

### Floating Action Buttons

**WhatsApp Button** (`components/ui/WhatsAppButton.tsx`)
- Fixed position bottom-right
- Opens WhatsApp with pre-filled message
- Tracking helper available in `components/analytics/GoogleAnalytics.tsx` (not wired by default)

**Call Button** (`components/ui/CallButton.tsx`)
- Fixed position bottom-right (above WhatsApp)
- Click-to-call on mobile
- Tracking helper available in `components/analytics/GoogleAnalytics.tsx` (not wired by default)

### Cookie Consent

**File:** `components/gdpr/CookieConsent.tsx`

Features:
- Full-screen overlay until choice made
- Three options: Accept All, Only Necessary, Configure
- Granular cookie control
- localStorage persistence with versioning
- Footer link to reopen settings

### Google Analytics

**File:** `components/analytics/GoogleAnalytics.tsx`

Features:
- Consent Mode v2 (default denied)
- Automatic consent state restoration
- IP anonymization
- Custom event tracking
- Predefined events for form, WhatsApp, phone clicks

---

## API Endpoints

### Public (read-only)

- `GET /api/public/business` → `BusinessConfig`
- `GET /api/public/testimonials` → `Testimonial[]`

### Admin Auth

- `POST /api/auth/login` — body `{ password: string }`, sets `admin_token` cookie
- `POST /api/auth/logout` — clears `admin_token` cookie

### Admin Content (protected)

- `GET /api/admin/business`
- `PUT /api/admin/business`
- `GET /api/admin/testimonials`
- `POST /api/admin/testimonials`
- `PUT /api/admin/testimonials`
- `DELETE /api/admin/testimonials`

Admin routes are protected by `middleware.ts` and require a valid `admin_token` cookie.

### Contact Form

**Endpoint:** `POST /api/contact`

**Request Body:**
```typescript
{
  nombre: string;
  telefono: string;
  email?: string;
  servicio?: string;
  mensaje?: string;
  urgente?: boolean;
}
```

**Response:**
```typescript
// Success (200)
{ success: true }

// Error (400/429/500)
{ error: string }
```

**Features:**
- Input validation (nombre + telefono required)
- Rate limiting by IP (5/hour)
- Input sanitization
- Email delivery via Resend API

---

## SEO Implementation

### Meta Tags

Each page includes:
- Title with template (`%s | Business Name`)
- Description
- Keywords
- Open Graph tags
- Twitter cards
- Canonical URLs

### Schema.org Markup

**LocalBusiness Schema** (`components/seo/LocalBusinessSchema.tsx`)
- Business name, address, phone
- Service area
- Opening hours
- Price range

**Service Schema** (`components/seo/ServiceSchema.tsx`)
- Service name, description
- Provider information
- Area served

### Sitemap

**File:** `app/sitemap.ts`

Includes:
- All static pages
- All service pages (dynamic)
- All city pages (dynamic)
- Legal pages

### Robots.txt

**File:** `app/robots.ts`

Configuration:
- Allow all crawlers
- Reference sitemap
- No disallowed paths

---

## GDPR Compliance

### Cookie Categories

| Category | Purpose | Required |
|----------|---------|----------|
| Necessary | Site functionality | Yes |
| Analytics | Google Analytics | Consent |
| Marketing | Advertising | Consent |

### Consent Flow

1. User visits site
2. Banner appears with overlay
3. User chooses: Accept All / Only Necessary / Configure
4. Choice saved to localStorage
5. Analytics enabled/disabled accordingly
6. User can change via footer link

### Legal Pages

- `/politica-privacidad` - RGPD/LOPDGDD compliant privacy policy
- `/politica-cookies` - Cookie policy with detailed list

---

## Styling & Design System

### Colors

```css
/* Primary */
--blue-700: #1d4ed8   /* Primary buttons */
--blue-600: #2563eb   /* Hover states */
--blue-500: #3b82f6   /* Accents */

/* Neutral */
--gray-900: #111827   /* Footer, headings */
--gray-700: #374151   /* Body text */
--gray-300: #d1d5db   /* Borders */
--gray-50: #f9fafb    /* Backgrounds */

/* Accent */
--green-500: #22c55e  /* WhatsApp */
--yellow-500: #eab308 /* Urgency indicators */
```

### Typography

- Font: Inter (Google Fonts)
- Headings: Bold, gray-900
- Body: Regular, gray-700
- Links: Blue-600

### Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

---

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Functional components with hooks
- Named exports (not default)
- Spanish text in UI, English in code comments

### Component Patterns

```typescript
// Component structure
"use client";  // Only if needed

import { ... } from "...";

interface Props {
  // Typed props
}

export function ComponentName({ prop }: Props) {
  // Hooks first
  // Logic
  // Return JSX
}
```

### Adding New Pages

1. Create `app/page-name/page.tsx`
2. Add metadata export
3. Add to sitemap.ts
4. Add to navigation if needed

### Adding New Services

1. Add entry to `content/services.ts`
2. Add service image to `public/images/services/`
3. Sitemap updates automatically (generateStaticParams)

### Testing

```bash
# Development
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build
npm run build
```

---

## Future Enhancements

### Potential Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| Blog section | Medium | Medium |
| Online booking (Cal.com) | High | Low |
| Multi-language (Galician) | Low | Medium |
| Customer portal | Low | High |
| Service request tracking | Medium | High |
| Photo upload in form | Medium | Medium |
| SMS notifications | Medium | Low |
| Review integration | High | Medium |

### Technical Improvements

| Improvement | Priority | Notes |
|-------------|----------|-------|
| Image optimization | High | Add next/image placeholders |
| Performance monitoring | Medium | Add web vitals tracking |
| Error tracking | Medium | Add Sentry or similar |
| A/B testing | Low | Test CTAs, forms |
| PWA support | Low | Offline capability |

---

## Claude Code Instructions

### Context for AI Development

This section provides guidance for Claude Code or other AI assistants working on this project.

### Project Understanding

1. **Language**: UI is in Spanish, code comments in English
2. **Content**: `content/` (TypeScript) + `data/` (JSON). Business/testimonials can be edited via `/admin` locally and committed.
3. **No external CMS/DB**: Updates are git-based (commit + deploy)
4. **Static First**: Most pages are statically generated

### Common Tasks

#### Adding a New Service

```bash
# 1. Edit content/services.ts - add new service object
# 2. Add image to public/images/services/
# 3. Build to verify: npm run build
# 4. Sitemap updates automatically
```

#### Adding a New City

```bash
# 1. Edit content/cities.ts - add new city object
# 2. Build to verify: npm run build
# 3. City page auto-generated via [city]/page.tsx
```

#### Updating Business Info

```bash
# Keep these in sync:
# - content/site.config.ts (header/footer/SEO/contact recipient)
# - data/business.json (homepage + /api/public/business; editable via /admin/business locally)
```

#### Modifying Contact Form

```bash
# Frontend: components/ui/ContactForm.tsx
# Backend: app/api/contact/route.ts
# Ensure validation matches both sides
```

### Important Files to Know

| Task | Files |
|------|-------|
| Layout changes | `app/layout.tsx`, `components/layout/*` |
| Styling | `app/globals.css`, `tailwind.config.ts` |
| SEO | `app/layout.tsx`, `components/seo/*` |
| Analytics | `components/analytics/GoogleAnalytics.tsx` |
| GDPR | `components/gdpr/CookieConsent.tsx` |
| Content | `content/*.ts`, `data/*.json` |

### Code Patterns to Follow

1. **Components**: Use `"use client"` only when needed
2. **Types**: Define interfaces in same file or import
3. **Icons**: Use Lucide React icons
4. **Links**: Use Next.js `Link` component
5. **Images**: Use Next.js `Image` when possible

### Testing Changes

```bash
# Always run before committing
npm run build

# For TypeScript issues
npx tsc --noEmit
```

### Deployment

Changes pushed to `main` branch auto-deploy to Vercel.

### Things to Avoid

1. Don't add database dependencies
2. Don't change content structure without updating all references
3. Don't remove GDPR compliance features
4. Don't duplicate business info; keep `content/site.config.ts` and `data/business.json` consistent
5. Don't use inline styles (use Tailwind)

### Questions to Ask User

When making changes, clarify:
- Is this for content or functionality?
- Should this be in Spanish or English?
- Does this need GDPR considerations?
- Should this track in analytics?

---

## Appendix

### Page Count Summary

| Type | Count |
|------|-------|
| Static pages | 8 |
| Service pages | 6 |
| City pages | 6 |
| Legal pages | 2 |
| API routes | 7 |
| **Total** | **23+** |

### Third-Party Dependencies

| Package | Purpose |
|---------|---------|
| next | Framework |
| react | UI library |
| typescript | Type safety |
| tailwindcss | Styling |
| lucide-react | Icons |
| resend | Email API |

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

---

*This document should be updated when significant changes are made to the project architecture or features.*
