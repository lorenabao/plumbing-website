"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplets, Wrench, Gauge, Flame, Bath, Siren } from "lucide-react";
import type { Service } from "@/content/services";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const iconMap = {
  Droplets,
  Wrench,
  Gauge,
  Flame,
  Bath,
  Siren,
} as const;

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { locale, t } = useLanguage();
  const [hasImageError, setHasImageError] = useState(false);

  // Get icon from map
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  // Get translated content
  const name = locale === "en" && service.nameEn ? service.nameEn : service.name;
  const description = locale === "en" && service.shortDescriptionEn
    ? service.shortDescriptionEn
    : service.shortDescription;

  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50">
        {!hasImageError && service.image ? (
          <Image
            src={service.image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {IconComponent && (
              <IconComponent className="w-16 h-16 text-blue-300" />
            )}
          </div>
        )}
        {service.isEmergency && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            24H
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-blue-600" />
          )}
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-blue-700 font-semibold">
            {service.priceRange}
          </span>
          <span className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
            {t("common", "seeMore")} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
