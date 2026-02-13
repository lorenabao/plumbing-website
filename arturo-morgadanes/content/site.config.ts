/**
 * =============================================================================
 * SITE CONFIGURATION - Arturo Morgadanes Website
 * =============================================================================
 *
 * This is the MAIN configuration file for the website.
 * Update this file to change business information, contact details, and settings.
 *
 * After making changes:
 * 1. Save this file
 * 2. Run: npm run build (to verify no errors)
 * 3. Commit and push to deploy
 *
 * =============================================================================
 */

// =============================================================================
// BUSINESS INFORMATION
// =============================================================================

export const siteConfig = {
  /**
   * Business name - appears in header, footer, and SEO
   */
  name: "Arturo Morgadanes",

  /**
   * Professional title - appears below name
   */
  title: "Fontanero Profesional",

  /**
   * Short tagline - used in SEO and hero section
   */
  tagline: "Fontanero de confianza en Vigo y alrededores",

  /**
   * Website URL - used for SEO and sitemap
   */
  url: "https://arturomorgadanes.es",

  // ===========================================================================
  // CONTACT INFORMATION
  // ===========================================================================

  contact: {
    /**
     * Phone number with country code
     * Format: +34 XXX XXX XXX
     */
    phone: "+34 608 022 766",

    /**
     * WhatsApp number (numbers only, no spaces or +)
     * Format: 34XXXXXXXXX
     */
    whatsapp: "34666123456",

    /**
     * Email address
     */
    email: "info@arturomorgadanes.es",

    /**
     * Physical address
     */
    address: "Vigo, Pontevedra, Galicia",
  },

  // ===========================================================================
  // BUSINESS HOURS
  // ===========================================================================

  hours: {
    weekdays: "08:00 - 20:00",
    saturday: "09:00 - 14:00",
    sunday: "Urgencias 24h",
  },

  // ===========================================================================
  // STATISTICS & CREDENTIALS
  // ===========================================================================

  stats: {
    /**
     * Years of experience
     */
    experience: 15,

    /**
     * Approximate jobs completed
     */
    jobsCompleted: 2000,

    /**
     * Google review score (1-5)
     */
    googleReviewScore: 4.9,

    /**
     * Number of Google reviews
     */
    googleReviewCount: 127,
  },

  /**
   * Professional certifications (displayed on About page)
   */
  certifications: [
    "Carnet de instalador autorizado",
    "Seguro de responsabilidad civil",
  ],

  // ===========================================================================
  // SERVICE AREA
  // ===========================================================================

  serviceArea: {
    /**
     * Description of service radius
     */
    radius: "30 km desde Vigo",

    /**
     * Main city coordinates (for schema.org)
     */
    coordinates: {
      latitude: 42.2406,
      longitude: -8.7207,
    },
  },

  // ===========================================================================
  // SOCIAL MEDIA (optional)
  // ===========================================================================

  social: {
    facebook: "", // e.g., "https://facebook.com/arturomorgadanes"
    instagram: "", // e.g., "https://instagram.com/arturomorgadanes"
    linkedin: "", // e.g., "https://linkedin.com/in/arturomorgadanes"
  },

  // ===========================================================================
  // SEO KEYWORDS
  // ===========================================================================

  /**
   * SEO keywords for search engines
   * Add relevant terms customers might search for
   */
  keywords: [
    "arturo morgadanes",
    "fontanero vigo",
    "fontanero urgente vigo",
    "desatascos vigo",
    "fontanería vigo",
    "reparación fugas vigo",
    "fontanero pontevedra",
    "fontanero 24 horas vigo",
    "fontanero profesional vigo",
    "plumber vigo",
  ],
};

// =============================================================================
// BACKWARD COMPATIBILITY
// =============================================================================
// This export maintains compatibility with existing code that imports 'business'

export const business = {
  name: siteConfig.name,
  title: siteConfig.title,
  tagline: siteConfig.tagline,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsapp,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
  hours: siteConfig.hours,
  experience: siteConfig.stats.experience,
  jobsCompleted: siteConfig.stats.jobsCompleted,
  googleReviewScore: siteConfig.stats.googleReviewScore,
  googleReviewCount: siteConfig.stats.googleReviewCount,
  certifications: siteConfig.certifications,
  serviceRadius: siteConfig.serviceArea.radius,
  coordinates: siteConfig.serviceArea.coordinates,
};

// Type export for use in components
export type SiteConfig = typeof siteConfig;
