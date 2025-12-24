'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push('/login'); // redirection côté client
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // on attend la redirection

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Profil de {user?.firstName}</h1>
      <p>Email: {user?.email}</p>
      <p>Rôle: {user?.role}</p>
    </div>
  );
}
