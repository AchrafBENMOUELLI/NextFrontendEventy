"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">🎉 Eventy</h3>
          <p className="text-sm text-gray-400">
            Eventy est une plateforme moderne pour découvrir, créer et gérer
            des événements facilement.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            <li><Link href="/events" className="hover:text-white">Événements</Link></li>
            <li><Link href="/login" className="hover:text-white">Connexion</Link></li>
            <li><Link href="/register" className="hover:text-white">Inscription</Link></li>
          </ul>
        </div>

        {/* Legal / Info */}
        <div>
          <h4 className="font-semibold text-white mb-3">Informations</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Tunisie</li>
            <li>📧 contact@eventy.app</li>
            <li>© {new Date().getFullYear()} Eventy</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-4">
        Made with ❤️ for events lovers
      </div>
    </footer>
  );
}
