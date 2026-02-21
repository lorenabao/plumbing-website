import { business } from "@/content/business";
import { services } from "@/content/services";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: business.name,
    description: business.tagline,
    telephone: business.phone,
    email: business.email,
    url: "https://arturomorgadanes.com",
    image: "https://arturomorgadanes.com/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gondomar",
      addressRegion: "Pontevedra",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: business.coordinates.latitude,
        longitude: business.coordinates.longitude,
      },
      geoRadius: "30000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.googleReviewScore,
      reviewCount: business.googleReviewCount,
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Fontanería",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
