# Arturo Morgadanes

Professional plumber website for Arturo Morgadanes serving Gondomar and surrounding areas in Galicia, Spain.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Email:** Resend API
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Documentation

All documentation is in the [docs/](docs/) folder:

| Document | Description |
|----------|-------------|
| [docs/README.md](docs/README.md) | Documentation index + quick links |
| [MAINTENANCE.md](docs/MAINTENANCE.md) | Day-to-day content updates + deployment workflow |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Initial setup, Vercel hosting, and DNS |
| [IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md) | What’s mock vs. done + go-live checklist |
| [PRD.md](docs/PRD.md) | Product requirements and development guidelines |

## Project Structure

```
arturo-morgadanes/
├── app/                 # Next.js pages and API routes
├── components/          # React components
├── content/             # Content data (TypeScript)
├── data/                # Admin-edited JSON (commit + deploy)
├── docs/                # Documentation
├── lib/                 # Utility functions
├── scripts/             # Local helpers
└── public/              # Static assets
```

## Content Management

There are two content sources:

- Static content (commit + deploy): `content/` (services, cities, gallery, static business defaults)
- Admin-edited JSON (commit + deploy): `data/business.json` and `data/testimonials.json` (editable via `/admin` when running locally)

Note: Some pages/components still import business info from `content/site.config.ts`. Keep `content/site.config.ts` and `data/business.json` in sync.

## Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxx      # Required
RESEND_DOMAIN=domain.com          # Required
ADMIN_PASSWORD_HASH=...           # Recommended (admin login)
JWT_SECRET=...                    # Required for admin security
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX    # Optional
NEXT_PUBLIC_CAL_LINK=username     # Optional
```

## License

Private - All rights reserved.
