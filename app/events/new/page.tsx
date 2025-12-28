'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import EventForm from '@/components/events/EventForm';

export default function NewEventPage() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Créer un événement | Eventy';
  }, []);
  useEffect(() => {
    if (!isLoggedIn) router.push('/login'); // redirection côté client
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // on attend la redirection

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Créer un nouvel événement</h1>
      <EventForm />
    </div>
  );
}
