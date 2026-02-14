"use client";

import { useEffect, useState } from "react";
import { Save, AlertCircle, Check, X } from "lucide-react";

interface BusinessConfig {
  name: string;
  title: string;
  tagline: string;
  url: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  stats: {
    experience: number;
    jobsCompleted: number;
    googleReviewScore: number;
    googleReviewCount: number;
  };
  certifications: string[];
  serviceArea: {
    radius: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  keywords: string[];
}

export default function BusinessPage() {
  const [config, setConfig] = useState<BusinessConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    try {
      const res = await fetch("/api/admin/business");
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      setError("Error al cargar la configuración");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setSuccess("Configuración guardada correctamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando configuración...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-red-500">Error al cargar la configuración</div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Información del Negocio
        </h1>
        <p className="text-gray-600 mt-1">
          Actualiza los datos de contacto, horarios y estadísticas
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError("")} className="ml-auto">
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Información básica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del negocio *
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título profesional
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) =>
                  setConfig({ ...config, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eslogan
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) =>
                  setConfig({ ...config, tagline: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Información de contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="text"
                value={config.contact.phone}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+34 629 464 508"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp (solo números)
              </label>
              <input
                type="text"
                value={config.contact.whatsapp}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, whatsapp: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="34629464508"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={config.contact.email}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={config.contact.address}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, address: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Horario de atención
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lunes - Viernes
              </label>
              <input
                type="text"
                value={config.hours.weekdays}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hours: { ...config.hours, weekdays: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="08:00 - 20:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sábado
              </label>
              <input
                type="text"
                value={config.hours.saturday}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hours: { ...config.hours, saturday: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="09:00 - 14:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domingo
              </label>
              <input
                type="text"
                value={config.hours.sunday}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hours: { ...config.hours, sunday: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Urgencias 24h"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Estadísticas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Años de experiencia
              </label>
              <input
                type="number"
                value={config.stats.experience}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    stats: {
                      ...config.stats,
                      experience: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trabajos realizados
              </label>
              <input
                type="number"
                value={config.stats.jobsCompleted}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    stats: {
                      ...config.stats,
                      jobsCompleted: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puntuación Google (1-5)
              </label>
              <input
                type="number"
                step="0.1"
                value={config.stats.googleReviewScore}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    stats: {
                      ...config.stats,
                      googleReviewScore: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nº de reseñas Google
              </label>
              <input
                type="number"
                value={config.stats.googleReviewCount}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    stats: {
                      ...config.stats,
                      googleReviewCount: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Service Area */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Zona de servicio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radio de servicio
              </label>
              <input
                type="text"
                value={config.serviceArea.radius}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    serviceArea: {
                      ...config.serviceArea,
                      radius: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="30 km desde Vigo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitud
              </label>
              <input
                type="number"
                step="0.0001"
                value={config.serviceArea.coordinates.latitude}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    serviceArea: {
                      ...config.serviceArea,
                      coordinates: {
                        ...config.serviceArea.coordinates,
                        latitude: parseFloat(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitud
              </label>
              <input
                type="number"
                step="0.0001"
                value={config.serviceArea.coordinates.longitude}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    serviceArea: {
                      ...config.serviceArea,
                      coordinates: {
                        ...config.serviceArea.coordinates,
                        longitude: parseFloat(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Redes sociales (opcional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={config.social.facebook}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    social: { ...config.social, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={config.social.instagram}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    social: { ...config.social, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                value={config.social.linkedin}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    social: { ...config.social, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
