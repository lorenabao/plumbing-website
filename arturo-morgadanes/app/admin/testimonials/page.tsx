"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Save,
  AlertCircle,
  Check,
} from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  service: string;
  serviceEn?: string;
  rating: number;
  text: string;
  textEn?: string;
  date: string;
}

const emptyTestimonial: Testimonial = {
  name: "",
  location: "",
  service: "",
  serviceEn: "",
  rating: 5,
  text: "",
  textEn: "",
  date: new Date().toISOString().slice(0, 7), // YYYY-MM format
};

const serviceOptions = [
  { es: "Desatascos", en: "Drain Cleaning" },
  { es: "Reparación de fugas", en: "Leak Repair" },
  { es: "Instalación de grifería", en: "Faucet Installation" },
  { es: "Cambio de calentador", en: "Water Heater Replacement" },
  { es: "Reforma de baño", en: "Bathroom Renovation" },
  { es: "Urgencias 24h", en: "24h Emergency" },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Testimonial>(emptyTestimonial);

  // Delete confirmation
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Error al cargar los testimonios");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setFormData(emptyTestimonial);
    setEditIndex(null);
    setIsModalOpen(true);
  }

  function openEditModal(index: number) {
    setFormData({ ...testimonials[index] });
    setEditIndex(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormData(emptyTestimonial);
    setEditIndex(null);
  }

  function handleServiceChange(serviceEs: string) {
    const selected = serviceOptions.find((s) => s.es === serviceEs);
    setFormData({
      ...formData,
      service: serviceEs,
      serviceEn: selected?.en || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = "/api/admin/testimonials";
      const method = editIndex !== null ? "PUT" : "POST";
      const body =
        editIndex !== null
          ? { index: editIndex, testimonial: formData }
          : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setSuccess(
        editIndex !== null
          ? "Testimonio actualizado correctamente"
          : "Testimonio añadido correctamente"
      );
      closeModal();
      fetchTestimonials();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(index: number) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }

      setSuccess("Testimonio eliminado correctamente");
      setDeleteIndex(null);
      fetchTestimonials();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando testimonios...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonios</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las opiniones de tus clientes
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Añadir testimonio
        </button>
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

      {/* Testimonials List */}
      <div className="bg-white rounded-xl shadow-sm">
        {testimonials.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay testimonios. Añade el primero.
          </div>
        ) : (
          <div className="divide-y">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {testimonial.location}
                      </span>
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {testimonial.service}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    {testimonial.textEn && (
                      <p className="text-gray-500 text-sm mt-1 italic">
                        EN: &quot;{testimonial.textEn}&quot;
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mt-2">
                      {testimonial.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => openEditModal(index)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteIndex(index)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editIndex !== null
                    ? "Editar testimonio"
                    : "Añadir testimonio"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Gondomar, Pontevedra..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servicio *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Seleccionar servicio</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.es} value={opt.es}>
                        {opt.es}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valoración *
                  </label>
                  <div className="flex items-center gap-1 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto (Español) *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="La opinión del cliente..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto (Inglés)
                </label>
                <textarea
                  value={formData.textEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, textEn: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="English translation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="month"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ¿Eliminar testimonio?
            </h2>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. El testimonio de{" "}
              <strong>{testimonials[deleteIndex]?.name}</strong> será eliminado
              permanentemente.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteIndex)}
                disabled={saving}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
