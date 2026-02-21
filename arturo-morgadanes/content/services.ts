/**
 * =============================================================================
 * SERVICES
 * =============================================================================
 *
 * All plumbing services offered. Each service gets its own page at:
 * /servicios/[slug]
 *
 * QUICK EDITS (most common):
 * - Change prices: Update "priceRange" field
 * - Change duration: Update "duration" field
 * - Update description: Edit the "description" markdown text
 *
 * TO ADD A NEW SERVICE:
 * 1. Copy an existing service object
 * 2. Update the slug (URL-friendly, lowercase, hyphens)
 * 3. Add service image to: public/images/services/
 * 4. Fill in all fields
 * 5. The new page is automatically created
 *
 * AVAILABLE ICONS (from Lucide):
 * - Droplets, Wrench, Gauge, Flame, Bath, Siren
 * - See: https://lucide.dev/icons
 *
 * =============================================================================
 */

export interface Service {
  slug: string; // URL path (e.g., "desatascos" -> /servicios/desatascos)
  name: string; // Display name (Spanish)
  nameEn?: string; // Display name (English)
  shortDescription: string; // One-liner for cards (Spanish)
  shortDescriptionEn?: string; // One-liner for cards (English)
  description: string; // Full markdown description for service page
  priceRange: string; // Price display (e.g., "60€ - 150€")
  duration: string; // Time estimate
  icon: string; // Lucide icon name
  image: string; // Path to service image
  gallery?: string[]; // Optional additional images
  isEmergency?: boolean; // Show emergency badge
  faqs: Array<{ question: string; answer: string }>;
}

export const services: Service[] = [
  // ===========================================================================
  // SERVICE 1: DESATASCOS
  // ===========================================================================
  {
    slug: "desatascos",
    name: "Desatascos",
    nameEn: "Drain Cleaning",
    shortDescription:
      "Limpieza y desatasco de tuberías, desagües y arquetas con equipos profesionales.",
    shortDescriptionEn:
      "Professional cleaning and unblocking of pipes, drains, and manholes.",
    priceRange: "60€ - 150€",
    duration: "1-2 horas",
    icon: "Droplets",
    image: "/images/services/desatascos.jpg",
    gallery: [
      "/images/gallery/desatasco-1.jpg",
      "/images/gallery/desatasco-2.jpg",
    ],
    description: `
## Servicio Profesional de Desatascos en Gondomar

Ofrezco un servicio profesional de desatascos en Gondomar y alrededores. Utilizo equipos de alta presión y cámaras de inspección para localizar y eliminar cualquier obstrucción en sus tuberías de forma rápida y efectiva.

### ¿Qué incluye el servicio?

- **Diagnóstico inicial** con cámara de inspección para localizar exactamente el problema
- **Desatasco con máquina de alta presión** para eliminar cualquier obstrucción
- **Limpieza completa** de la tubería afectada
- **Comprobación final** del correcto funcionamiento del desagüe

### Tipos de desatascos que realizamos

Trabajo con todo tipo de atascos, desde los más sencillos hasta los más complicados:

- Fregaderos y lavabos
- Inodoros y bidés
- Bañeras y platos de ducha
- Bajantes y columnas de saneamiento
- Arquetas y registros
- Tuberías de evacuación

### ¿Por qué elegir un profesional?

Los productos químicos de supermercado pueden dañar las tuberías y raramente solucionan el problema de raíz. Con equipos profesionales, no solo desatasco la tubería, sino que la dejo completamente limpia para evitar futuros problemas.

Disponemos de **servicio de urgencias 24 horas** para desatascos que no pueden esperar.
    `,
    faqs: [
      {
        question: "¿Cuánto tarda un desatasco?",
        answer:
          "La mayoría de desatascos se resuelven en 1-2 horas. Los casos más complejos pueden requerir más tiempo.",
      },
      {
        question: "¿Utilizáis productos químicos?",
        answer:
          "No. Utilizo equipos mecánicos y de alta presión que son más efectivos y seguros para las tuberías.",
      },
      {
        question: "¿Puedo intentar desatascarlo yo mismo?",
        answer:
          "Para atascos leves, puede probar con un desatascador manual. Si persiste, llame a un profesional.",
      },
    ],
  },

  // ===========================================================================
  // SERVICE 2: REPARACIÓN DE FUGAS
  // ===========================================================================
  {
    slug: "reparacion-fugas",
    name: "Reparación de Fugas",
    nameEn: "Leak Repair",
    shortDescription:
      "Detección y reparación de fugas de agua en tuberías, grifos y cisternas.",
    shortDescriptionEn:
      "Detection and repair of water leaks in pipes, faucets, and cisterns.",
    priceRange: "40€ - 200€",
    duration: "1-3 horas",
    icon: "Wrench",
    image: "/images/services/fugas.jpg",
    description: `
## Reparación de Fugas de Agua en Gondomar

Las fugas de agua son uno de los problemas más comunes en fontanería y, si no se tratan a tiempo, pueden causar daños importantes en su vivienda.

### Servicio de Detección de Fugas

Cuento con equipos especializados para detectar fugas ocultas:

- **Detectores acústicos** para localizar fugas en tuberías empotradas
- **Cámaras termográficas** para identificar humedades
- **Equipos de presión** para verificar la estanqueidad

### Tipos de fugas que reparo

- Fugas en grifos y duchas
- Fugas en cisternas e inodoros
- Fugas en tuberías de cobre, PVC o polietileno
- Fugas en calentadores y termos
- Fugas ocultas en paredes y suelos

### ¿Por qué actuar rápido?

Una pequeña fuga puede desperdiciar más de 10.000 litros de agua al año. Además, la humedad puede provocar daños estructurales y problemas de salud.
    `,
    faqs: [
      {
        question: "¿Cómo sé si tengo una fuga oculta?",
        answer:
          "Si nota manchas de humedad, el contador gira sin usar agua, o la factura ha aumentado sin explicación.",
      },
      {
        question: "¿Es necesario romper la pared?",
        answer:
          "No siempre. Con equipos de detección modernos puedo localizar la fuga con precisión.",
      },
      {
        question: "¿Cuánto cuesta reparar una fuga?",
        answer:
          "Depende de la ubicación. Una fuga en un grifo puede costar 40€, mientras que una fuga oculta puede costar más.",
      },
    ],
  },

  // ===========================================================================
  // SERVICE 3: INSTALACIÓN DE GRIFERÍA
  // ===========================================================================
  {
    slug: "instalacion-griferia",
    name: "Instalación de Grifería",
    nameEn: "Faucet Installation",
    shortDescription:
      "Montaje y sustitución de grifos, duchas y sistemas de agua en cocina y baño.",
    shortDescriptionEn:
      "Installation and replacement of faucets, showers, and water systems in kitchen and bathroom.",
    priceRange: "30€ - 80€",
    duration: "30-60 min",
    icon: "Gauge",
    image: "/images/services/griferia.jpg",
    description: `
## Instalación de Grifería en Gondomar

¿Quiere renovar los grifos de su cocina o baño? Ofrezco un servicio completo de instalación y sustitución de grifería.

### Servicios de grifería

- **Instalación de grifos** de cocina y baño
- **Sustitución de grifos** antiguos
- **Instalación de columnas de ducha**
- **Montaje de grifos termostáticos**
- **Instalación de sistemas de ahorro** de agua

### Marcas con las que trabajo

Instalo grifería de cualquier marca: Roca, Grohe, Hansgrohe, Tres, Genebre, y cualquier otra.

### Ventajas de renovar su grifería

- **Ahorro de agua**: Los grifos modernos reducen el consumo
- **Mayor confort**: Grifos termostáticos mantienen la temperatura
- **Mejor estética**: Renueve el aspecto de su cocina o baño
    `,
    faqs: [
      {
        question: "¿Puedo comprar yo el grifo?",
        answer:
          "Por supuesto. Puede comprar el grifo que desee y yo me encargo de la instalación.",
      },
      {
        question: "¿Cuánto tiempo tarda la instalación?",
        answer:
          "La instalación de un grifo estándar tarda entre 30 y 60 minutos.",
      },
      {
        question: "¿Qué hago con el grifo viejo?",
        answer: "Me encargo de retirarlo. Está incluido en el servicio.",
      },
    ],
  },

  // ===========================================================================
  // SERVICE 4: CAMBIO DE CALENTADOR
  // ===========================================================================
  {
    slug: "cambio-calentador",
    name: "Cambio de Calentador",
    nameEn: "Water Heater Replacement",
    shortDescription:
      "Instalación y sustitución de termos eléctricos y calentadores de gas.",
    shortDescriptionEn:
      "Installation and replacement of electric tanks and gas water heaters.",
    priceRange: "80€ - 250€",
    duration: "2-4 horas",
    icon: "Flame",
    image: "/images/services/calentador.jpg",
    description: `
## Instalación y Cambio de Calentadores en Gondomar

¿Su calentador ya no calienta como antes? Soy especialista en la instalación y sustitución de calentadores de agua.

### Tipos de calentadores que instalo

- **Termos eléctricos** (30L, 50L, 80L, 100L, 150L)
- **Calentadores de gas** butano y gas natural
- **Calentadores instantáneos**
- **Calentadores termostáticos**

### ¿Termo eléctrico o calentador de gas?

**Termo eléctrico:** Ideal si no tiene gas. Fácil instalación.
**Calentador de gas:** Menor consumo. Agua caliente ilimitada.

### El servicio incluye

- Retirada del calentador antiguo
- Instalación del nuevo equipo
- Conexión de agua y electricidad/gas
- Comprobación de funcionamiento
- Garantía de instalación
    `,
    faqs: [
      {
        question: "¿Cuánto dura un termo eléctrico?",
        answer: "Un termo bien mantenido puede durar entre 10 y 15 años.",
      },
      {
        question: "¿Qué capacidad de termo necesito?",
        answer: "1-2 personas: 50L. 3-4 personas: 80L. 5+ personas: 100L+.",
      },
      {
        question: "¿Puedo cambiar de gas a eléctrico?",
        answer: "Sí. Evalúo su instalación eléctrica antes de comenzar.",
      },
    ],
  },

  // ===========================================================================
  // SERVICE 5: REFORMA DE BAÑOS
  // ===========================================================================
  {
    slug: "reforma-banos",
    name: "Reforma de Baños",
    nameEn: "Bathroom Renovation",
    shortDescription:
      "Renovación completa o parcial de baños: fontanería, sanitarios y acabados.",
    shortDescriptionEn:
      "Complete or partial bathroom renovation: plumbing, fixtures, and finishes.",
    priceRange: "Desde 1.500€",
    duration: "3-7 días",
    icon: "Bath",
    image: "/images/services/reforma-bano.jpg",
    gallery: [
      "/images/gallery/reforma-1.jpg",
      "/images/gallery/reforma-2.jpg",
      "/images/gallery/reforma-3.jpg",
    ],
    description: `
## Reforma de Baños en Gondomar

¿Sueña con un baño nuevo? Ofrezco un servicio integral de reforma de baños.

### Servicios de reforma

- **Reforma completa** de baño
- **Cambio de bañera por plato de ducha**
- **Renovación de sanitarios**
- **Instalación de muebles de baño**
- **Cambio de alicatado** y suelo
- **Instalación de mamparas**

### Cómo trabajo

1. **Visita inicial**: Tomo medidas y escucho sus ideas
2. **Presupuesto detallado**: Sin sorpresas
3. **Planificación**: Acordamos fechas y materiales
4. **Ejecución**: Trabajo limpio y ordenado
5. **Entrega**: Baño listo para usar
    `,
    faqs: [
      {
        question: "¿Cuánto cuesta reformar un baño completo?",
        answer:
          "Una reforma completa empieza en 1.500€. El precio depende de materiales y tamaño.",
      },
      {
        question: "¿Cuánto tiempo tarda una reforma?",
        answer: "Una reforma completa tarda entre 5 y 7 días laborables.",
      },
      {
        question: "¿Puedo usar el baño durante la reforma?",
        answer:
          "Depende del tipo de reforma. Para reformas completas, necesitará otro baño.",
      },
    ],
  },

  // ===========================================================================
  // SERVICE 6: URGENCIAS 24H
  // ===========================================================================
  {
    slug: "urgencias-24h",
    name: "Urgencias 24h",
    nameEn: "24h Emergency",
    shortDescription:
      "Servicio de fontanería urgente disponible las 24 horas, todos los días.",
    shortDescriptionEn:
      "Emergency plumbing service available 24 hours a day, every day.",
    priceRange: "Desde 80€",
    duration: "Llegada en 30-60 min",
    icon: "Siren",
    image: "/images/services/urgencias.jpg",
    isEmergency: true,
    description: `
## Fontanero de Urgencias 24 Horas en Gondomar

Cuando tiene una emergencia de fontanería, cada minuto cuenta. Servicio disponible 24/7.

### ¿Qué se considera una urgencia?

- **Rotura de tubería** con inundación
- **Fuga de agua importante**
- **Atasco grave** con riesgo de desbordamiento
- **Fallo del calentador** sin agua caliente
- **Rotura de cisterna** o inodoro

### Tiempo de respuesta

Estoy en su domicilio en **30-60 minutos** en Gondomar y alrededores.

### Cómo funciona

1. **Llámeme** al teléfono de urgencias
2. **Describa** el problema
3. **Le confirmo** el tiempo de llegada
4. **Acudo** lo antes posible
5. **Soluciono** la emergencia

**Consejo**: Si tiene una fuga, cierre la llave de paso mientras espera.
    `,
    faqs: [
      {
        question: "¿Hay recargo por llamar de noche o en festivo?",
        answer:
          "Sí, las urgencias fuera del horario laboral tienen un recargo.",
      },
      {
        question: "¿Cómo puedo minimizar el daño mientras espero?",
        answer:
          "Cierre la llave de paso general del agua, que suele estar en la entrada del piso.",
      },
      {
        question: "¿Trabaja los fines de semana y festivos?",
        answer:
          "Sí, el servicio de urgencias está disponible los 365 días del año.",
      },
    ],
  },
];

// ===========================================================================
// HELPER FUNCTIONS
// ===========================================================================

/**
 * Get a service by its slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Get all service slugs (for static generation)
 */
export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/**
 * Get emergency services only
 */
export function getEmergencyServices(): Service[] {
  return services.filter((s) => s.isEmergency);
}
