import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Euro, Phone, MessageCircle, Droplets, Wrench, Gauge, Flame, Bath, Siren } from "lucide-react";
import { services } from "@/content/services";
import { business } from "@/content/business";
import { ContactForm } from "@/components/ui/ContactForm";
import { ServiceSchema } from "@/components/seo/ServiceSchema";

const iconMap = {
  Droplets,
  Wrench,
  Gauge,
  Flame,
  Bath,
  Siren,
} as const;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  if (!service) return {};

  return {
    title: `${service.name} en Gondomar - ${service.priceRange}`,
    description: `${service.shortDescription} Servicio profesional de ${service.name.toLowerCase()} en Gondomar y alrededores. ${service.priceRange}. Llámenos: ${business.phone}`,
    openGraph: {
      title: `${service.name} en Gondomar | ${business.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  if (!service) notFound();

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  // Convert markdown-like content to HTML
  const contentHtml = service.description
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2>${line.replace("## ", "")}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3>${line.replace("### ", "")}</h3>`;
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) {
          return `<li><strong>${match[1]}</strong>${match[2] ? `: ${match[2]}` : ""}</li>`;
        }
      }
      if (line.startsWith("- ")) {
        return `<li>${line.replace("- ", "")}</li>`;
      }
      if (line.trim() === "") {
        return "";
      }
      return `<p>${line}</p>`;
    })
    .join("\n");

  return (
    <>
      <ServiceSchema service={service} />

      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Hero */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-4">
              {IconComponent && (
                <IconComponent className="w-12 h-12 text-blue-600" />
              )}
              {service.isEmergency && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  24H
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {service.name} en Gondomar
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                <Euro className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">{service.priceRange}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors flex-1"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}?text=Hola, necesito información sobre ${service.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex-1"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* FAQs */}
          {service.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Preguntas Frecuentes
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-gray-50 rounded-lg p-4 group"
                  >
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900">
                      {faq.question}
                      <span className="text-blue-600 group-open:rotate-180 transition-transform ml-4">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Contact Form */}
          <section className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Solicitar Presupuesto para {service.name}
            </h2>
            <ContactForm />
          </section>
        </div>
      </article>
    </>
  );
}
