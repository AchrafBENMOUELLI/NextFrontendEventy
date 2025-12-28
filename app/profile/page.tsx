'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';



export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Profil - Eventy';
    if (!isLoggedIn) router.push('/login');
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return {
          emoji: '👑',
          label: 'Administrateur',
          gradient: 'from-yellow-500 to-orange-500',
          bg: 'from-yellow-500/20 to-orange-500/20',
          border: 'border-yellow-500/50'
        };
      case 'organizer':
        return {
          emoji: '🎫',
          label: 'Organisateur',
          gradient: 'from-blue-500 to-purple-500',
          bg: 'from-blue-500/20 to-purple-500/20',
          border: 'border-blue-500/50'
        };
      default:
        return {
          emoji: '👤',
          label: 'Utilisateur',
          gradient: 'from-purple-500 to-pink-500',
          bg: 'from-purple-500/20 to-pink-500/20',
          border: 'border-purple-500/50'
        };
    }
  };

  const roleBadge = getRoleBadge(user?.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="flex justify-between items-start -mt-16 mb-6">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${roleBadge.gradient} flex items-center justify-center text-6xl border-4 border-slate-800 shadow-xl`}>
                {roleBadge.emoji}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-16 flex items-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-500/50 hover:border-transparent text-red-300 hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <span>🚪</span>
                Déconnexion
              </button>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${roleBadge.bg} border ${roleBadge.border} px-4 py-2 rounded-full`}>
                <span>{roleBadge.emoji}</span>
                <span className="text-white font-semibold">{roleBadge.label}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Email */}
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📧</span>
                  <span className="text-gray-400 text-sm font-medium">Email</span>
                </div>
                <p className="text-white text-lg">{user?.email}</p>
              </div>

              {/* Role */}
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{roleBadge.emoji}</span>
                  <span className="text-gray-400 text-sm font-medium">Rôle</span>
                </div>
                <p className="text-white text-lg capitalize">{user?.role || 'Utilisateur'}</p>
              </div>

              {/* Member Since */}
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📅</span>
                  <span className="text-gray-400 text-sm font-medium">Membre depuis</span>
                </div>
                <p className="text-white text-lg">
                  {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Account Status */}
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-400 text-sm font-medium">Statut</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white text-lg">Actif</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>⚡</span>
                Actions rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/events"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600 hover:to-pink-600 border border-purple-500/50 hover:border-transparent text-purple-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">🎉</span>
                  Voir les événements
                </Link>

                {user?.role === 'organizer' && (
                  <Link
                    href="/events/new"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 border border-blue-500/50 hover:border-transparent text-blue-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">➕</span>
                    Créer un événement
                  </Link>
                )}

                <button
                  onClick={() => alert('Fonctionnalité à venir !')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-700 hover:to-slate-600 border border-slate-600 hover:border-slate-500 text-gray-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">⚙️</span>
                  Paramètres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
