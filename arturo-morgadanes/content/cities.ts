/**
 * =============================================================================
 * SERVICE AREAS / CITIES
 * =============================================================================
 *
 * Cities and areas where services are offered.
 * Each city gets its own landing page at: /zona-servicio/[slug]
 *
 * TO ADD A NEW CITY:
 * 1. Copy an existing city object
 * 2. Update the slug (URL-friendly, lowercase, hyphens)
 * 3. Fill in all fields
 * 4. The new page is automatically created
 *
 * QUICK EDITS:
 * - Response time: Update "responseTime" field
 * - Content: Edit "localContent" markdown text
 * - Nearby areas: Update "nearbyAreas" array
 *
 * =============================================================================
 */

export interface City {
  slug: string; // URL path (e.g., "Gondomar" -> /zona-servicio/Gondomar)
  name: string; // Display name
  province: string; // Province name
  postalCodes: string[]; // Postal codes covered
  responseTime: string; // Response time for this area
  localContent: string; // Markdown content for the city page
  nearbyAreas: string[]; // Nearby cities/towns
}

export const cities: City[] = [
  // ===========================================================================
  // CITY 1: Gondomar (Main service area)
  // ===========================================================================
  {
    slug: "Gondomar",
    name: "Gondomar",
    province: "Pontevedra",
    postalCodes: [
      "36201",
      "36202",
      "36203",
      "36204",
      "36205",
      "36206",
      "36207",
      "36208",
      "36209",
      "36210",
    ],
    responseTime: "30 minutos",
    localContent: `
## Fontanero en Gondomar - Servicio Profesional

Soy Arturo Morgadanes, fontanero profesional con más de 15 años de experiencia trabajando en Gondomar y su área metropolitana. Ofrezco servicios de fontanería a domicilio en todos los barrios de Gondomar con rapidez y garantía.

### Zonas de Gondomar donde trabajo

Cubro todos los barrios y zonas de Gondomar:

- **Centro**: Casco Vello, Príncipe, Areal
- **Zona este**: Teis, Lavadores, Bembrive
- **Zona oeste**: Bouzas, Navia, Alcabre
- **Zona sur**: Coruxo, Oia, Sárdoma
- **Zona norte**: Castrelos, Zamáns, Valladares

### ¿Por qué elegirme como su fontanero en Gondomar?

- **Experiencia local**: Conozco las instalaciones típicas de los edificios de Gondomar
- **Rapidez**: En urgencias, llego en menos de 30 minutos
- **Precios justos**: Presupuesto sin compromiso antes de empezar
- **Garantía**: Todos mis trabajos tienen garantía por escrito
- **Limpieza**: Dejo su casa como la encontré

### Servicios más demandados en Gondomar

Por las características de las viviendas de Gondomar, los servicios más habituales son:

1. **Desatascos**: Especialmente en edificios antiguos del centro
2. **Reparación de fugas**: Debido a la humedad de la zona
3. **Cambio de calentadores**: Sustitución de equipos antiguos
4. **Reformas de baño**: Cambio de bañera por plato de ducha

### Contacto directo

Llámeme para cualquier consulta o urgencia. Atiendo personalmente todas las llamadas y le doy un presupuesto aproximado por teléfono.
    `,
    nearbyAreas: ["Nigrán", "Gondomar", "Redondela", "Mos"],
  },
  {
    slug: "pontevedra",
    name: "Pontevedra",
    province: "Pontevedra",
    postalCodes: ["36001", "36002", "36003", "36004", "36005"],
    responseTime: "45 minutos",
    localContent: `
## Fontanero en Pontevedra

Ofrezco servicios de fontanería profesional en Pontevedra capital y sus alrededores. Aunque mi base está en Gondomar, atiendo regularmente a clientes en Pontevedra con la misma calidad y profesionalidad.

### Servicios en Pontevedra

- Desatascos y limpieza de tuberías
- Reparación de fugas de agua
- Instalación y cambio de grifería
- Cambio de calentadores y termos
- Reformas de baños
- Urgencias 24 horas

### Zonas que cubro en Pontevedra

Trabajo en toda la ciudad de Pontevedra y municipios cercanos como Poio, Marín y Sanxenxo. El tiempo de desplazamiento desde Gondomar es de aproximadamente 30 minutos, lo que me permite ofrecer un servicio rápido también en esta zona.

### ¿Por qué llamarme desde Pontevedra?

- Más de 15 años de experiencia
- Presupuestos sin compromiso
- Garantía en todos los trabajos
- Atención personalizada

Contacte conmigo para cualquier problema de fontanería en Pontevedra. Le atenderé con la misma rapidez y profesionalidad que a mis clientes de Gondomar.
    `,
    nearbyAreas: ["Poio", "Marín", "Sanxenxo", "Vilagarcía"],
  },
  {
    slug: "nigran",
    name: "Nigrán",
    province: "Pontevedra",
    postalCodes: ["36350"],
    responseTime: "25 minutos",
    localContent: `
## Fontanero en Nigrán

Nigrán es una de las zonas donde más trabajo debido a su cercanía con Gondomar. Atiendo tanto a viviendas unifamiliares como a comunidades de vecinos en toda la zona costera.

### Particularidades de Nigrán

Las viviendas de Nigrán, especialmente las cercanas a la costa, suelen tener problemas específicos:

- **Corrosión por salitre**: Las tuberías sufren más por la proximidad al mar
- **Presión de agua**: Algunas zonas tienen problemas de presión
- **Pozos y fosas sépticas**: Muchos chalets tienen instalaciones autónomas

### Zonas de Nigrán que cubro

- Panxón
- Praia América
- A Ramallosa
- Chandebrito
- Camos

### Servicios especializados para Nigrán

Además de los servicios habituales de fontanería, en Nigrán ofrezco:

- Mantenimiento de fosas sépticas
- Instalación de grupos de presión
- Tratamiento de aguas duras
- Revisiones periódicas para segundas residencias

Si tiene una segunda residencia en Nigrán, puedo realizar revisiones periódicas para evitar sorpresas cuando venga a disfrutar de su casa.
    `,
    nearbyAreas: ["Gondomar", "Baiona", "Gondomar"],
  },
  {
    slug: "redondela",
    name: "Redondela",
    province: "Pontevedra",
    postalCodes: ["36800"],
    responseTime: "20 minutos",
    localContent: `
## Fontanero en Redondela

Redondela está a solo 15 minutos de mi base en Gondomar, lo que me permite ofrecer un servicio muy rápido en toda la zona. Trabajo tanto en el núcleo urbano como en las parroquias rurales del municipio.

### Servicios en Redondela

- Desatascos profesionales
- Reparación y detección de fugas
- Instalación de grifería
- Cambio de calentadores
- Reformas de baños
- Urgencias 24h

### Zonas de Redondela

Cubro todas las parroquias de Redondela:

- Redondela centro
- Chapela
- Cedeira
- Cesantes
- Arcade

### Rapidez de respuesta

Al estar tan cerca de Gondomar, puedo llegar a Redondela en menos de 20 minutos para urgencias. Para trabajos programados, le ofrezco flexibilidad horaria para adaptarme a su agenda.
    `,
    nearbyAreas: ["Gondomar", "Soutomaior", "Mos", "Pontevedra"],
  },
  {
    slug: "cangas",
    name: "Cangas",
    province: "Pontevedra",
    postalCodes: ["36940"],
    responseTime: "35 minutos",
    localContent: `
## Fontanero en Cangas do Morrazo

Atiendo a clientes en Cangas y toda la península del Morrazo. Aunque el acceso requiere cruzar la ría, ofrezco servicio regular en esta zona tan demandada.

### Servicios en Cangas

- Desatascos y limpieza de tuberías
- Reparación de fugas
- Instalación de grifería y sanitarios
- Cambio de calentadores
- Reformas de baños
- Urgencias (con tiempo de respuesta algo mayor)

### Zonas del Morrazo que cubro

- Cangas centro
- Aldán
- Hío
- Darbo
- Coiro

### Consideraciones para Cangas

Debido al tiempo de desplazamiento, para trabajos pequeños en Cangas suelo agrupar varias visitas el mismo día. Para urgencias, me desplazo inmediatamente.

Si tiene un trabajo programado en Cangas, contácteme con antelación para poder organizarme y ofrecerle el mejor horario.
    `,
    nearbyAreas: ["Moaña", "Bueu", "Gondomar"],
  },
  {
    slug: "gondomar",
    name: "Gondomar",
    province: "Pontevedra",
    postalCodes: ["36380"],
    responseTime: "20 minutos",
    localContent: `
## Fontanero en Gondomar

Gondomar es uno de los municipios donde más trabajo, debido a su cercanía con Gondomar y al crecimiento urbanístico de los últimos años. Atiendo tanto viviendas nuevas como edificaciones más antiguas.

### Servicios en Gondomar

Ofrezco todos mis servicios de fontanería en Gondomar:

- Desatascos con equipos profesionales
- Detección y reparación de fugas
- Instalación de grifería
- Cambio de calentadores y termos
- Reformas integrales de baños
- Servicio de urgencias 24h

### Zonas de Gondomar

- Gondomar centro
- Vincios
- Mañufe
- Borreiros
- Morgadáns

### Viviendas unifamiliares

Gondomar tiene muchos chalets y viviendas unifamiliares, que requieren servicios específicos:

- Grupos de presión para garantizar buen caudal
- Descalcificadores para zonas con agua dura
- Mantenimiento de instalaciones de riego

Contacte conmigo para cualquier necesidad de fontanería en Gondomar.
    `,
    nearbyAreas: ["Gondomar", "Nigrán", "Tui", "Mos"],
  },
];
