/**
 * =============================================================================
 * UI TRANSLATIONS
 * =============================================================================
 *
 * Static UI text translations for both languages.
 * Content translations are in the content/ folder.
 *
 * HOW TO UPDATE:
 * 1. Find the key you want to update
 * 2. Update BOTH 'es' and 'en' values
 * 3. Save and deploy
 *
 * =============================================================================
 */

import { Locale } from "./config";

export const translations = {
  // ===========================================================================
  // NAVIGATION
  // ===========================================================================
  nav: {
    home: { es: "Inicio", en: "Home" },
    services: { es: "Servicios", en: "Services" },
    gallery: { es: "Galería", en: "Gallery" },
    about: { es: "Sobre Mí", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
  },

  // ===========================================================================
  // COMMON UI
  // ===========================================================================
  common: {
    call: { es: "Llamar", en: "Call" },
    callNow: { es: "Llamar Ahora", en: "Call Now" },
    whatsapp: { es: "WhatsApp", en: "WhatsApp" },
    requestQuote: { es: "Pedir Presupuesto", en: "Request Quote" },
    learnMore: { es: "Saber Más", en: "Learn More" },
    viewAll: { es: "Ver Todos", en: "View All" },
    back: { es: "Volver", en: "Back" },
    loading: { es: "Cargando...", en: "Loading..." },
    error: { es: "Error", en: "Error" },
    success: { es: "Éxito", en: "Success" },
    send: { es: "Enviar", en: "Send" },
    sending: { es: "Enviando...", en: "Sending..." },
    close: { es: "Cerrar", en: "Close" },
    readMore: { es: "Leer más", en: "Read more" },
    seeMore: { es: "Ver más", en: "See more" },
    menu: { es: "Menú", en: "Menu" },
  },

  // ===========================================================================
  // HERO SECTION
  // ===========================================================================
  hero: {
    title: {
      es: "Fontanero Profesional en Gondomar",
      en: "Professional Plumber in Gondomar",
    },
    subtitle: {
      es: "Servicio de fontanería de confianza para hogares y negocios",
      en: "Trusted plumbing service for homes and businesses",
    },
    cta: {
      es: "Solicitar Presupuesto Gratis",
      en: "Request Free Quote",
    },
    emergency: {
      es: "Urgencias 24h",
      en: "24h Emergency",
    },
    reviewsOnGoogle: { es: "reseñas en Google", en: "reviews on Google" },
    yearsExperience: { es: "años de experiencia", en: "years of experience" },
    emergencyService: { es: "Servicio de urgencias 24 horas", en: "24-hour emergency service" },
    responseTime: { es: "Respuesta en 30 min", en: "Response in 30 min" },
    noObligation: { es: "Presupuesto sin compromiso", en: "No-obligation quote" },
    callNow: { es: "Llamar Ahora", en: "Call Now" },
    whatsappMessage: { es: "Hola, necesito un fontanero para...", en: "Hello, I need a plumber for..." },
    tagline: { es: "Fontanero de confianza en Gondomar y alrededores", en: "Trusted plumber in Gondomar and surroundings" },
  },

  // ===========================================================================
  // HOMEPAGE
  // ===========================================================================
  home: {
    servicesTitle: { es: "Servicios de Fontanería", en: "Plumbing Services" },
    servicesSubtitle: {
      es: "Ofrezco una amplia gama de servicios de fontanería para su hogar o negocio. Presupuesto sin compromiso.",
      en: "I offer a wide range of plumbing services for your home or business. No-obligation quote.",
    },
    whyChooseTitle: { es: "¿Por qué elegir a", en: "Why choose" },
    whyChooseItems: {
      es: [
        "Más de 15 años de experiencia en fontanería",
        "Servicio de urgencias 24 horas, todos los días",
        "Presupuesto sin compromiso antes de empezar",
        "Garantía por escrito en todos los trabajos",
        "Precios justos y transparentes",
        "Trabajo limpio y ordenado",
      ],
      en: [
        "Over 15 years of plumbing experience",
        "24-hour emergency service, every day",
        "No-obligation quote before starting",
        "Written guarantee on all work",
        "Fair and transparent prices",
        "Clean and tidy work",
      ],
    },
    callMeNow: { es: "Llámeme Ahora", en: "Call Me Now" },
    serviceAreas: { es: "Zonas de Servicio", en: "Service Areas" },
    serviceAreasSubtitle: { es: "Atiendo en Gondomar y alrededores (30 km)", en: "I serve Gondomar and surrounding areas (30 km)" },
    needPlumber: { es: "¿Necesita un fontanero?", en: "Need a plumber?" },
    needPlumberText: {
      es: "Contacte conmigo para cualquier problema de fontanería. Le respondo lo antes posible con un presupuesto sin compromiso.",
      en: "Contact me for any plumbing problem. I'll respond as soon as possible with a no-obligation quote.",
    },
    phone: { es: "Teléfono", en: "Phone" },
    urgentText: {
      es: "¿Es urgente? Llámeme directamente para una respuesta inmediata. Servicio 24 horas.",
      en: "Is it urgent? Call me directly for an immediate response. 24-hour service.",
    },
    requestQuote: { es: "Solicitar Presupuesto", en: "Request Quote" },
  },

  // ===========================================================================
  // SERVICES
  // ===========================================================================
  services: {
    title: { es: "Nuestros Servicios", en: "Our Services" },
    subtitle: {
      es: "Soluciones profesionales de fontanería",
      en: "Professional plumbing solutions",
    },
    priceFrom: { es: "Desde", en: "From" },
    duration: { es: "Duración", en: "Duration" },
    viewService: { es: "Ver Servicio", en: "View Service" },
    faq: { es: "Preguntas Frecuentes", en: "FAQ" },
    viewAll: { es: "Ver todos los servicios", en: "View all services" },
  },

  // ===========================================================================
  // TESTIMONIALS
  // ===========================================================================
  testimonials: {
    title: { es: "Opiniones de Clientes", en: "Customer Reviews" },
    subtitle: {
      es: "Lo que dicen nuestros clientes",
      en: "What our customers say",
    },
    myCustomers: { es: "Lo que dicen mis clientes", en: "What my customers say" },
    starsOn: { es: "estrellas en Google con", en: "stars on Google with" },
    reviews: { es: "reseñas", en: "reviews" },
  },

  // ===========================================================================
  // CONTACT FORM
  // ===========================================================================
  contact: {
    title: { es: "Contacto", en: "Contact" },
    subtitle: {
      es: "¿Necesita un fontanero? Contáctenos",
      en: "Need a plumber? Contact us",
    },
    name: { es: "Nombre", en: "Name" },
    namePlaceholder: { es: "Su nombre", en: "Your name" },
    phone: { es: "Teléfono", en: "Phone" },
    phonePlaceholder: { es: "Su teléfono", en: "Your phone" },
    email: { es: "Email (opcional)", en: "Email (optional)" },
    emailPlaceholder: { es: "su@email.com", en: "your@email.com" },
    service: { es: "Servicio", en: "Service" },
    servicePlaceholder: { es: "Seleccione un servicio", en: "Select a service" },
    message: { es: "Mensaje", en: "Message" },
    messagePlaceholder: {
      es: "Describa su problema o consulta...",
      en: "Describe your problem or inquiry...",
    },
    submit: { es: "Enviar Mensaje", en: "Send Message" },
    submitting: { es: "Enviando...", en: "Sending..." },
    successMessage: {
      es: "¡Mensaje enviado! Le contactaremos pronto.",
      en: "Message sent! We'll contact you soon.",
    },
    errorMessage: {
      es: "Error al enviar. Por favor, inténtelo de nuevo.",
      en: "Error sending. Please try again.",
    },
  },

  // ===========================================================================
  // ABOUT
  // ===========================================================================
  about: {
    title: { es: "Sobre Mí", en: "About Me" },
    yearsExperience: { es: "años de experiencia", en: "years of experience" },
    jobsCompleted: { es: "trabajos realizados", en: "jobs completed" },
    certifications: { es: "Certificaciones", en: "Certifications" },
    whyChoose: { es: "¿Por qué elegir a", en: "Why choose" },
  },

  // ===========================================================================
  // GALLERY
  // ===========================================================================
  gallery: {
    title: { es: "Galería de Trabajos", en: "Work Gallery" },
    subtitle: {
      es: "Algunos de nuestros trabajos recientes",
      en: "Some of our recent work",
    },
    before: { es: "Antes", en: "Before" },
    after: { es: "Después", en: "After" },
  },

  // ===========================================================================
  // FOOTER
  // ===========================================================================
  footer: {
    tagline: {
      es: "Fontanero de confianza en Gondomar y alrededores",
      en: "Trusted plumber in Gondomar and surroundings",
    },
    servicesTitle: { es: "Servicios", en: "Services" },
    hoursTitle: { es: "Horario", en: "Hours" },
    linksTitle: { es: "Enlaces", en: "Links" },
    weekdays: { es: "Lunes - Viernes", en: "Monday - Friday" },
    saturday: { es: "Sábado", en: "Saturday" },
    sunday: { es: "Domingo", en: "Sunday" },
    privacyPolicy: { es: "Política de Privacidad", en: "Privacy Policy" },
    cookiePolicy: { es: "Política de Cookies", en: "Cookie Policy" },
    cookieSettings: { es: "Configuración de Cookies", en: "Cookie Settings" },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    professional: {
      es: "Fontanero profesional en Gondomar y alrededores.",
      en: "Professional plumber in Gondomar and surroundings.",
    },
  },

  // ===========================================================================
  // COOKIE CONSENT
  // ===========================================================================
  cookies: {
    title: { es: "Utilizamos cookies", en: "We use cookies" },
    description: {
      es: "Usamos cookies propias y de terceros para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido.",
      en: "We use our own and third-party cookies to improve your browsing experience, analyze site traffic, and personalize content.",
    },
    acceptAll: { es: "Aceptar todas", en: "Accept all" },
    acceptNecessary: { es: "Solo necesarias", en: "Only necessary" },
    configure: { es: "Configurar", en: "Configure" },
    necessary: { es: "Cookies necesarias", en: "Necessary cookies" },
    necessaryDesc: {
      es: "Esenciales para el funcionamiento del sitio. No se pueden desactivar.",
      en: "Essential for site functionality. Cannot be disabled.",
    },
    analytics: { es: "Cookies de análisis", en: "Analytics cookies" },
    analyticsDesc: {
      es: "Nos ayudan a entender cómo los visitantes interactúan con el sitio.",
      en: "Help us understand how visitors interact with the site.",
    },
    marketing: { es: "Cookies de marketing", en: "Marketing cookies" },
    marketingDesc: {
      es: "Utilizadas para mostrar anuncios relevantes.",
      en: "Used to display relevant advertisements.",
    },
    savePreferences: { es: "Guardar preferencias", en: "Save preferences" },
    moreInfo: { es: "Para más información, consulte nuestra", en: "For more information, see our" },
  },

  // ===========================================================================
  // SERVICE AREAS
  // ===========================================================================
  areas: {
    title: { es: "Zonas de Servicio", en: "Service Areas" },
    responseTime: { es: "Tiempo de respuesta", en: "Response time" },
    nearbyAreas: { es: "Zonas cercanas", en: "Nearby areas" },
    coverageIn: { es: "Cobertura en", en: "Coverage in" },
  },

  // ===========================================================================
  // TRUST BADGES
  // ===========================================================================
  trust: {
    experience: { es: "Años de Experiencia", en: "Years Experience" },
    available: { es: "Disponible 24/7", en: "Available 24/7" },
    guarantee: { es: "Garantía de Trabajo", en: "Work Guarantee" },
    quote: { es: "Presupuesto Gratis", en: "Free Quote" },
    years: { es: "años", en: "years" },
    ofExperience: { es: "de experiencia", en: "of experience" },
    jobsCompleted: { es: "trabajos realizados", en: "jobs completed" },
    stars: { es: "estrellas", en: "stars" },
    onGoogle: { es: "en Google", en: "on Google" },
    guaranteeTitle: { es: "Garantía", en: "Guarantee" },
    onAllWork: { es: "en todos los trabajos", en: "on all work" },
  },

  // ===========================================================================
  // 404 PAGE
  // ===========================================================================
  notFound: {
    title: { es: "Página no encontrada", en: "Page not found" },
    description: {
      es: "Lo sentimos, la página que busca no existe.",
      en: "Sorry, the page you're looking for doesn't exist.",
    },
    backHome: { es: "Volver al inicio", en: "Back to home" },
  },
} as const;

// Type for translation keys
export type TranslationKey = keyof typeof translations;

/**
 * Get a translated string
 */
export function t(
  section: keyof typeof translations,
  key: string,
  locale: Locale
): string {
  const sectionData = translations[section] as Record<string, Record<Locale, string>>;
  if (sectionData && sectionData[key]) {
    return sectionData[key][locale] || sectionData[key]["es"];
  }
  return key;
}
