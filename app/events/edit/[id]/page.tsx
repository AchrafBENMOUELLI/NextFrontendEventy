'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEventById, updateEvent } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    imageUrl: '',
    nbPlaces: 0,
  });

  useEffect(() => {
    document.title = 'Modifier l\'événement | Eventy';
  }, []);
  useEffect(() => {
    async function fetchEvent() {
      const event = await getEventById(id);
      setForm({
        title: event.title,
        description: event.description,
        date: event.date.slice(0, 16), 
        location: event.location,
        price: event.price,
        imageUrl: event.imageUrl,
        nbPlaces: event.nbPlaces,
      });
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'price' || name === 'nbPlaces' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    try {
      await updateEvent(id, form, token);
      router.push(`/events/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 mb-4">
            <svg className="animate-spin h-12 w-12 text-purple-400" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-gray-400">Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-6 py-12">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Modifier l'événement
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Mettez à jour les informations de votre événement</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                Titre <span className="text-red-400">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Concert de jazz en live"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                required
              />
            </div>

            {/* Description */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez votre événement en détail..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70 resize-none"
                required
              />
            </div>

            {/* Date & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                  📅 Date & Heure <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                  📍 Lieu <span className="text-red-400">*</span>
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Ex: Tunis, La Marsa"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                  required
                />
              </div>
            </div>

            {/* Price & Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                  💰 Prix (TND) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  min={0}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                  👥 Nombre de places <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="nbPlaces"
                  value={form.nbPlaces}
                  onChange={handleChange}
                  placeholder="100"
                  min={0}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
                🖼️ Image URL <span className="text-red-400">*</span>
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                required
              />
            </div>

            {/* Image Preview */}
            {form.imageUrl && (
              <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                  }}
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  Aperçu
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-gray-300 hover:text-white font-semibold py-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enregistrement...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>💾</span>
                    Enregistrer les modifications
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
