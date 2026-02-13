"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { HeroSection } from "@/components/ui/HeroSection";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ContactForm } from "@/components/ui/ContactForm";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import type { Testimonial } from "@/lib/data";
import type { BusinessConfig } from "@/lib/data";

export default function HomePage() {
  const { locale, t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [business, setBusiness] = useState<BusinessConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [testimonialsRes, businessRes] = await Promise.all([
          fetch("/api/public/testimonials"),
          fetch("/api/public/business"),
        ]);
        const testimonialsData = await testimonialsRes.json();
        const businessData = await businessRes.json();
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
        setBusiness(businessData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get the why choose items based on locale
  const whyChooseItems = translations.home.whyChooseItems[locale];

  // Default values while loading
  const businessName = business?.name || "Arturo Morgadanes";
  const businessPhone = business?.contact?.phone || "+34 608 022 766";
  const businessExperience = business?.stats?.experience || 15;
  const businessJobsCompleted = business?.stats?.jobsCompleted || 2000;
  const businessGoogleScore = business?.stats?.googleReviewScore || 4.9;
  const businessGoogleCount = business?.stats?.googleReviewCount || 127;

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home", "servicesTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home", "servicesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all"
            >
              {t("services", "viewAll")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t("home", "whyChooseTitle")} {businessName}?
              </h2>
              <div className="space-y-4">
                {whyChooseItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href={`tel:${businessPhone}`}
                  className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {t("home", "callMeNow")}
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-8 text-center">
              <div className="text-6xl font-bold text-blue-700 mb-2">
                {businessExperience}+
              </div>
              <div className="text-xl text-gray-700 mb-6">
                {t("about", "yearsExperience")}
              </div>
              <div className="text-4xl font-bold text-blue-700 mb-2">
                +{businessJobsCompleted}
              </div>
              <div className="text-xl text-gray-700">{t("about", "jobsCompleted")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("testimonials", "myCustomers")}
            </h2>
            <p className="text-lg text-gray-600">
              {businessGoogleScore} {t("testimonials", "starsOn")}{" "}
              {businessGoogleCount} {t("testimonials", "reviews")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              testimonials.slice(0, 6).map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} locale={locale} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("home", "serviceAreas")}
            </h2>
            <p className="text-xl text-blue-100">
              {t("home", "serviceAreasSubtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/zona-servicio/${city.slug}`}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t("home", "needPlumber")}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t("home", "needPlumberText")}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("home", "phone")}</p>
                    <a
                      href={`tel:${businessPhone}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-700"
                    >
                      {businessPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>{locale === "en" ? "Is it urgent?" : "¿Es urgente?"}</strong>{" "}
                  {t("home", "urgentText").replace(
                    locale === "en" ? "Is it urgent? " : "¿Es urgente? ",
                    ""
                  )}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("home", "requestQuote")}
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
