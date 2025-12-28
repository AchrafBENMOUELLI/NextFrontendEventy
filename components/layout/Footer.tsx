"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-950 text-gray-300 mt-16 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="group">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 flex items-center gap-2">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎉</span>
            Eventy
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed hover:text-gray-300 transition-colors duration-300">
            Eventy est une plateforme moderne pour découvrir, créer et gérer
            des événements facilement.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></span>
            Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
              >
                Accueil
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
              >
                Événements
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
              >
                Connexion
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
              >
                Inscription
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal / Info */}
        <div>
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></span>
            Informations
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition-colors duration-300 group">
              <span className="group-hover:scale-110 transition-transform duration-300">📍</span>
              Tunisie
            </li>
            <li className="flex items-center gap-2 hover:text-white transition-colors duration-300 group">
              <span className="group-hover:scale-110 transition-transform duration-300">📧</span>
              contact@eventy.app
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              © {new Date().getFullYear()} Eventy
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-purple-500/20 text-center text-sm text-gray-500 py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
        <p className="relative z-10 flex items-center justify-center gap-2">
          Made with
          <span className="text-red-500 animate-pulse inline-block hover:scale-125 transition-transform duration-300">❤️</span>
          for events lovers
        </p>
      </div>
    </footer>
  );
}
