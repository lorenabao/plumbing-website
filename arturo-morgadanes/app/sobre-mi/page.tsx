import type { Metadata } from "next";
import { CheckCircle, Award, Shield, Phone } from "lucide-react";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: `Conozca a ${business.name}, fontanero profesional con más de ${business.experience} años de experiencia en Gondomar y alrededores. Instalador autorizado con seguro de responsabilidad civil.`,
};

export default function SobreMiPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre Mí
          </h1>
          <p className="text-xl text-gray-600">
            {business.title} en Gondomar y alrededores
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-6xl font-bold text-blue-700">AM</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {business.name}
              </h2>
              <p className="text-lg text-blue-700 font-medium mb-4">
                {business.title}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>{business.experience}+ años de experiencia</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Instalador autorizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Mi Historia</h2>
          <p>
            Llevo más de {business.experience} años dedicándome a la fontanería
            en Gondomar y alrededores. Comencé como aprendiz en una empresa local y,
            con el tiempo, decidí establecerme por mi cuenta para ofrecer un
            servicio más personalizado a mis clientes.
          </p>
          <p>
            A lo largo de estos años he realizado más de {business.jobsCompleted}{" "}
            trabajos, desde pequeñas reparaciones hasta reformas completas de
            baños. Cada trabajo, sea grande o pequeño, recibe la misma atención
            y dedicación.
          </p>

          <h2>Mi Forma de Trabajar</h2>
          <p>
            Creo en la transparencia y la honestidad. Antes de comenzar
            cualquier trabajo, explico claramente qué hay que hacer y cuánto va
            a costar. No me gustan las sorpresas, ni a mí ni a mis clientes.
          </p>
          <p>
            También me tomo muy en serio la limpieza. Cuando termino un trabajo,
            dejo todo recogido y limpio. Su casa estará igual o mejor que antes
            de empezar.
          </p>

          <h2>¿Por Qué Elegirme?</h2>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: "Experiencia demostrada",
              description:
                "Más de 15 años trabajando en fontanería. Conozco todos los sistemas y marcas del mercado.",
            },
            {
              title: "Presupuestos claros",
              description:
                "Le digo el precio antes de empezar. Sin sorpresas ni costes ocultos.",
            },
            {
              title: "Puntualidad",
              description:
                "Si digo que llego a las 10:00, llego a las 10:00. Su tiempo es valioso.",
            },
            {
              title: "Garantía por escrito",
              description:
                "Todos mis trabajos tienen garantía. Si algo falla, vuelvo sin coste adicional.",
            },
            {
              title: "Urgencias 24h",
              description:
                "Las emergencias no avisan. Estoy disponible las 24 horas para urgencias.",
            },
            {
              title: "Trato personal",
              description:
                "Soy yo quien atiende el teléfono, hace el presupuesto y realiza el trabajo.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Certificaciones</h2>
          <div className="space-y-4">
            {business.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para trabajar conmigo?
          </h2>
          <p className="text-gray-600 mb-6">
            Llámeme para cualquier consulta o presupuesto. Estaré encantado de
            ayudarle.
          </p>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
