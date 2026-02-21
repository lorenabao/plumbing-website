import type { Metadata } from "next";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Servicios de Fontanería en Gondomar",
  description: `Servicios profesionales de fontanería: desatascos, reparación de fugas, instalación de grifería, cambio de calentadores y reformas de baños. ${business.phone}`,
};

export default function ServiciosPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Servicios de Fontanería
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrezco una amplia gama de servicios de fontanería profesional en
            Gondomar y alrededores. Presupuesto sin compromiso.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encuentra lo que busca?
          </h2>
          <p className="text-gray-600 mb-6">
            Contacte conmigo para cualquier servicio de fontanería. Si está
            dentro de mis posibilidades, le ayudaré.
          </p>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Llamar: {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
