/**
 * =============================================================================
 * CUSTOMER TESTIMONIALS
 * =============================================================================
 *
 * Add, edit, or remove customer reviews here.
 *
 * HOW TO ADD A NEW TESTIMONIAL:
 * 1. Copy the template below
 * 2. Paste it at the TOP of the testimonials array (newest first)
 * 3. Fill in the details
 * 4. Save and deploy
 *
 * TEMPLATE:
 * {
 *   name: "Customer Name",
 *   location: "City",
 *   service: "Service Type",
 *   rating: 5,
 *   text: "Customer review text...",
 *   date: "YYYY-MM",
 * },
 *
 * =============================================================================
 */

export interface Testimonial {
  name: string;
  location: string;
  service: string;
  serviceEn?: string; // English service name
  rating: number; // 1-5 stars
  text: string;
  textEn?: string; // English review text
  date: string; // Format: YYYY-MM
}

export const testimonials: Testimonial[] = [
  // ===========================================================================
  // ADD NEW TESTIMONIALS HERE (newest first)
  // ===========================================================================

  {
    name: "María García",
    location: "Gondomar",
    service: "Desatascos",
    serviceEn: "Drain Cleaning",
    rating: 5,
    text: "Llegó en menos de una hora y solucionó el atasco del baño rápidamente. Muy profesional y buen precio. Lo recomiendo sin duda.",
    textEn: "Arrived in less than an hour and quickly fixed the bathroom clog. Very professional and good price. I definitely recommend him.",
    date: "2024-11",
  },
  {
    name: "Carlos Rodríguez",
    location: "Pontevedra",
    service: "Cambio de calentador",
    serviceEn: "Water Heater Replacement",
    rating: 5,
    text: "Me instaló el termo nuevo el mismo día que le llamé. Trabajo limpio y ordenado. Muy contento con el resultado.",
    textEn: "He installed the new water heater the same day I called. Clean and tidy work. Very happy with the result.",
    date: "2024-10",
  },
  {
    name: "Ana Fernández",
    location: "Nigrán",
    service: "Reparación de fugas",
    serviceEn: "Leak Repair",
    rating: 5,
    text: "Tenía una fuga en la cocina que no encontraba nadie. Arturo la localizó en 10 minutos y la arregló al momento. Excelente servicio.",
    textEn: "I had a leak in the kitchen that no one could find. Arturo located it in 10 minutes and fixed it immediately. Excellent service.",
    date: "2024-09",
  },
  {
    name: "José Manuel López",
    location: "Gondomar",
    service: "Reforma de baño",
    serviceEn: "Bathroom Renovation",
    rating: 5,
    text: "Nos hizo la reforma del baño completa. El resultado es espectacular y el precio muy competitivo. Cumplió con los plazos prometidos.",
    textEn: "He did the complete bathroom renovation for us. The result is spectacular and the price very competitive. Met the promised deadlines.",
    date: "2024-08",
  },
  {
    name: "Laura Martínez",
    location: "Redondela",
    service: "Urgencias 24h",
    serviceEn: "24h Emergency",
    rating: 5,
    text: "A las 11 de la noche se rompió una tubería. Le llamé y en media hora estaba aquí. Nos salvó de una inundación. Eternamente agradecidos.",
    textEn: "At 11 PM a pipe burst. I called him and in half an hour he was here. He saved us from a flood. Eternally grateful.",
    date: "2024-07",
  },
  {
    name: "Pedro Vázquez",
    location: "Gondomar",
    service: "Instalación de grifería",
    serviceEn: "Faucet Installation",
    rating: 5,
    text: "Vino a instalar los grifos nuevos del baño. Rápido, limpio y muy profesional. El precio fue exactamente el que me dijo por teléfono.",
    textEn: "Came to install the new bathroom faucets. Fast, clean and very professional. The price was exactly what he quoted over the phone.",
    date: "2024-06",
  },
  {
    name: "Carmen Pérez",
    location: "Gondomar",
    service: "Desatascos",
    serviceEn: "Drain Cleaning",
    rating: 5,
    text: "Excelente fontanero. Desatascó el fregadero que llevaba semanas dando problemas. Muy amable y explica todo lo que hace.",
    textEn: "Excellent plumber. Unblocked the sink that had been giving us problems for weeks. Very kind and explains everything he does.",
    date: "2024-05",
  },
  {
    name: "Francisco Silva",
    location: "Cangas",
    service: "Cambio de calentador",
    serviceEn: "Water Heater Replacement",
    rating: 5,
    text: "Aunque vivimos en Cangas, vino sin problema. Nos asesoró sobre el mejor calentador para nuestra casa y lo instaló perfectamente.",
    textEn: "Even though we live in Cangas, he came without any problem. Advised us on the best water heater for our home and installed it perfectly.",
    date: "2024-04",
  },
  {
    name: "Isabel Domínguez",
    location: "Pontevedra",
    service: "Reparación de fugas",
    serviceEn: "Leak Repair",
    rating: 5,
    text: "Muy buen profesional. Solucionó una fuga en el baño que otros fontaneros no habían podido arreglar. Precio justo y buen trato.",
    textEn: "Very good professional. Fixed a leak in the bathroom that other plumbers couldn't repair. Fair price and good treatment.",
    date: "2024-03",
  },
  {
    name: "Antonio Gómez",
    location: "Gondomar",
    service: "Reforma de baño",
    serviceEn: "Bathroom Renovation",
    rating: 5,
    text: "Cambió nuestra bañera por plato de ducha. El trabajo quedó impecable. Muy recomendable para cualquier trabajo de fontanería.",
    textEn: "Changed our bathtub to a shower tray. The work was impeccable. Highly recommended for any plumbing job.",
    date: "2024-02",
  },
];

// ===========================================================================
// HELPER FUNCTIONS
// ===========================================================================

/**
 * Get translated testimonial text and service based on locale
 */
export function getTranslatedTestimonial(
  testimonial: Testimonial,
  locale: "es" | "en"
): { text: string; service: string } {
  return {
    text: locale === "en" && testimonial.textEn ? testimonial.textEn : testimonial.text,
    service: locale === "en" && testimonial.serviceEn ? testimonial.serviceEn : testimonial.service,
  };
}

/**
 * Get the most recent testimonials
 * @param count Number of testimonials to return (default: 6)
 */
export function getRecentTestimonials(count: number = 6): Testimonial[] {
  return testimonials.slice(0, count);
}

/**
 * Get testimonials for a specific service
 * @param service Service name to filter by
 */
export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonials.filter((t) => t.service === service);
}

/**
 * Get testimonials from a specific location
 * @param location City/location to filter by
 */
export function getTestimonialsByLocation(location: string): Testimonial[] {
  return testimonials.filter((t) => t.location === location);
}
