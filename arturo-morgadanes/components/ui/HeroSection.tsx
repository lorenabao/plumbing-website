"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Clock, Shield, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { BusinessConfig } from "@/lib/data";

export function HeroSection() {
  const { locale, t } = useLanguage();
  const [business, setBusiness] = useState<BusinessConfig | null>(null);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch("/api/public/business");
        const data = await res.json();
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    }
    fetchBusiness();
  }, []);

  // Default values while loading
  const googleReviewScore = business?.stats?.googleReviewScore || 4.9;
  const googleReviewCount = business?.stats?.googleReviewCount || 127;
  const experience = business?.stats?.experience || 15;
  const phone = business?.contact?.phone || "+34 608 022 766";
  const whatsapp = business?.contact?.whatsapp || "34666123456";

  const whatsappMessage = encodeURIComponent(t("hero", "whatsappMessage"));

  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl">
          {/* Trust badge */}
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(googleReviewScore)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-yellow-400"
                  }`}
                />
              ))}
            </div>
            <span>
              {googleReviewScore} · {googleReviewCount}{" "}
              {t("hero", "reviewsOnGoogle")}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("hero", "title")}
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            {t("hero", "tagline")}. {experience}+ {t("hero", "yearsExperience")}. {t("hero", "emergencyService")}.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span>{t("hero", "responseTime")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>{t("hero", "noObligation")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              {t("hero", "callNow")}
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
