# Documentation

This folder contains all project documentation for the Arturo Morgadanes website.

## Documents

### [MAINTENANCE.md](MAINTENANCE.md) - Start Here for Updates

**Step-by-step guide for updating and maintaining the website.**

- Quick reference for common updates
- Content update instructions
- Image update guidelines
- Deployment process
- Monitoring checklist
- Troubleshooting guide
- Backup & recovery

### [DEPLOYMENT.md](DEPLOYMENT.md) - Initial Setup & Hosting

**Complete guide for deploying and hosting the website.**

- Prerequisites and setup
- Vercel deployment (dashboard + CLI)
- Domain and DNS configuration
- Third-party service setup (Resend, GA, Search Console)
- GDPR compliance checklist
- Cost summary

### [PRD.md](PRD.md) - Technical Reference

**Product Requirements Document for developers and AI-assisted coding.**

- Project overview and goals
- Technical architecture
- Directory structure
- Content management schemas
- Feature specifications
- API documentation
- Design system (colors, typography)
- Development guidelines
- Claude Code / AI assistant instructions

### [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) - What’s Still Mock / Go‑Live Checklist

**Audit of what’s implemented vs. what still needs finishing.**

- Mock/stubbed sections (admin, images, i18n)
- Placeholder values to replace (legal + verification)
- Recommended go-live checklist
- Pointers to update + deployment docs

## Quick Links

| Task | Document |
|------|----------|
| **Update phone/email/hours** | [MAINTENANCE.md](MAINTENANCE.md#changing-business-information) |
| **Update prices** | [MAINTENANCE.md](MAINTENANCE.md#updating-service-prices) |
| **Add testimonial** | [MAINTENANCE.md](MAINTENANCE.md#adding-a-new-testimonial) |
| **Add gallery item** | [MAINTENANCE.md](MAINTENANCE.md#adding-a-gallery-item) |
| **Add new service** | [MAINTENANCE.md](MAINTENANCE.md#adding-a-new-service) |
| **Add new city** | [MAINTENANCE.md](MAINTENANCE.md#adding-a-new-cityservice-area) |
| **Deploy changes** | [MAINTENANCE.md](MAINTENANCE.md#deployment) |
| **Fix issues** | [MAINTENANCE.md](MAINTENANCE.md#troubleshooting) |
| **Initial setup** | [DEPLOYMENT.md](DEPLOYMENT.md) |
| **Go-live checklist** | [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) |
| **Technical details** | [PRD.md](PRD.md) |

## Content Files

Most website content is in the `content/` folder, but some admin-editable content is stored in `data/`:

| File | Purpose |
|------|---------|
| `content/site.config.ts` | Static business defaults (header/footer, SEO, contact form recipient) |
| `data/business.json` | Business config used by `/api/public/business` (editable via `/admin/business`) |
| `content/services.ts` | Service pages & prices |
| `data/testimonials.json` | Customer reviews used by `/api/public/testimonials` (editable via `/admin/testimonials`) |
| `content/testimonials.ts` | Types/helpers (legacy static list; not the live data source) |
| `content/gallery.ts` | Portfolio items |
| `content/cities.ts` | Service area pages |

See [content/README.md](../content/README.md) for detailed editing instructions.

## For AI Assistants

If you're an AI assistant (Claude Code, Cursor, etc.) working on this project:

1. Read [PRD.md](PRD.md) first for full context
2. Check the "Claude Code Instructions" section for common tasks
3. Content is in `content/` (TypeScript) and `data/` (admin-edited JSON) - each has inline documentation
4. Follow the code patterns documented in PRD.md
5. Always run `npm run build` before committing
