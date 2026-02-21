import { business } from "@/content/business";
import type { Service } from "@/content/services";

interface ServiceSchemaProps {
  service: Service;
}

export function ServiceSchema({ service }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Plumber",
      name: business.name,
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gondomar",
        addressRegion: "Pontevedra",
        addressCountry: "ES",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Gondomar",
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
      },
    },
  };

  // Add FAQ schema if there are FAQs
  const faqSchema = service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
