"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import type { GalleryItem } from "@/content/gallery";

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const currentImage = showAfter ? item.afterImage : item.beforeImage;
  const currentLabel = showAfter ? "Después" : "Antes";
  const hasImageError = failedImages[currentImage] === true;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {!hasImageError ? (
          <Image
            src={currentImage}
            alt={`${item.title} - ${currentLabel}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() =>
              setFailedImages((prev) => ({ ...prev, [currentImage]: true }))
            }
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
              <span className="text-lg font-medium">{currentLabel}</span>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors z-10"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span className="text-sm font-medium">
            Ver {showAfter ? "antes" : "después"}
          </span>
        </button>

        {/* Before/After Label */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold z-10 ${
            showAfter
              ? "bg-green-500 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {showAfter ? "DESPUÉS" : "ANTES"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
        </div>

        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded mb-3">
          {item.service}
        </span>

        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
    </div>
  );
}
