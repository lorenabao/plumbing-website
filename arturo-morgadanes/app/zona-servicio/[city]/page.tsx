import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { cities } from "@/content/cities";
import { services } from "@/content/services";
import { business } from "@/content/business";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactForm } from "@/components/ui/ContactForm";

function normalizeCityName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function findCityByNameOrSlug(value: string) {
  const normalized = normalizeCityName(value);
  return cities.find(
    (c) =>
      normalizeCityName(c.name) === normalized || normalizeCityName(c.slug) === normalized
  );
}

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = cities.find((c) => c.slug === resolvedParams.city);
  if (!city) return {};

  return {
    title: `Fontanero en ${city.name} - Urgencias 24h`,
    description: `Fontanero profesional en ${city.name}, ${city.province}. Desatascos, fugas, reformas de baños. Llegada en ${city.responseTime}. Llámenos: ${business.phone}`,
    openGraph: {
      title: `Fontanero en ${city.name} | ${business.name}`,
      description: `Servicio de fontanería profesional en ${city.name}. Urgencias 24 horas.`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = cities.find((c) => c.slug === resolvedParams.city);
  if (!city) notFound();

  // Convert markdown-like content to HTML
  const contentHtml = city.localContent
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
    <div className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Fontanero en {city.name}
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Servicio profesional de fontanería en {city.name}, {city.province}.
            Urgencias 24 horas.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>Llegada en {city.responseTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <MapPin className="w-5 h-5" />
              <span>{city.province}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}?text=Hola, necesito un fontanero en ${city.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">
                Códigos Postales que cubro en {city.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {city.postalCodes.map((code) => (
                  <span
                    key={code}
                    className="bg-white border px-3 py-1 rounded text-sm"
                  >
                    {code}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-4">
                Zonas cercanas
              </h3>
              <div className="flex flex-wrap gap-2">
                {city.nearbyAreas.map((area) => {
                  const match = findCityByNameOrSlug(area);

                  if (!match) {
                    return (
                      <span key={area} className="text-gray-700 text-sm">
                        {area}
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={area}
                      href={`/zona-servicio/${match.slug}`}
                      className="text-blue-700 hover:underline text-sm"
                    >
                      {area}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Servicios disponibles en {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-gray-50 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Solicitar Presupuesto en {city.name}
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
