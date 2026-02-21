import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacte con ${business.name}, fontanero profesional en Gondomar. Teléfono: ${business.phone}. Presupuesto sin compromiso. Servicio de urgencias 24 horas.`,
};

export default function ContactoPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Necesita un fontanero? Contacte conmigo para un presupuesto sin
            compromiso. Respuesta rápida garantizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h2>

            <div className="space-y-6 mb-8">
              {/* Phone */}
              <a
                href={`tel:${business.phone}`}
                className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                  <p className="text-xl font-bold text-gray-900">
                    {business.phone}
                  </p>
                  <p className="text-sm text-blue-700">
                    Haga clic para llamar
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-xl font-bold text-gray-900">
                    Enviar mensaje
                  </p>
                  <p className="text-sm text-green-700">
                    Respuesta rápida por WhatsApp
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${business.email}`}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-xl font-bold text-gray-900">
                    {business.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Para consultas no urgentes
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Zona de servicio</p>
                  <p className="text-xl font-bold text-gray-900">
                    {business.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {business.serviceRadius}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-lg font-bold">Horario de Atención</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lunes - Viernes</span>
                  <span className="font-medium">{business.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sábado</span>
                  <span className="font-medium">{business.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Domingo</span>
                  <span className="font-medium text-red-400">
                    {business.hours.sunday}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enviar Mensaje
              </h2>
              <p className="text-gray-600 mb-6">
                Complete el formulario y le responderé lo antes posible.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
