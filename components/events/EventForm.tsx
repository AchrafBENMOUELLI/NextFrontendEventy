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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block font-semibold mb-1">Titre</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Lieu</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Prix</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Nombre de places</label>
        <input
          type="number"
          name="nbPlaces"
          value={form.nbPlaces}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? 'Création...' : 'Créer l’événement'}
      </button>
    </form>
  );
}
