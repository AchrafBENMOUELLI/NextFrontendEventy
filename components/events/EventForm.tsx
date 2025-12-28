'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Event } from '@/types/event';

export default function EventForm() {
  const router = useRouter();
  const { token, user } = useAuthStore();
  const [form, setForm] = useState<Omit<Event, 'organizerId' | 'nbrLike'>>({
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    imageUrl: '',
    nbPlaces: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'nbPlaces' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!token || !user) {
      setError('Vous devez être connecté pour créer un événement');
      setLoading(false);
      return;
    }

    try {
      await createEvent(
        {
          ...form,
          organizerId: user._id,
        },
        token
      );
      router.push('/events');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
          <span className="text-4xl">🎫</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Créer un événement
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Remplissez les détails de votre événement</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
          {error}
        </div>
      )}

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
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
            placeholder="Ex: Concert de jazz en live"
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
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70 resize-none"
            placeholder="Décrivez votre événement en détail..."
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
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="Ex: Tunis, La Marsa"
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
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="0"
              min={0}
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
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="100"
              min={0}
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
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
            placeholder="https://example.com/image.jpg"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-2"
        >
          {loading ? (
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
              Création en cours...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>✨</span>
              Créer l'événement
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
