"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout, isOrganizer, isAdmin } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl shadow-purple-500/20 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300 flex items-center gap-2 group"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎉</span>
          EventApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/events"
            className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Events
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {isLoggedIn ? (
            <>
              {isOrganizer() && (
                <Link
                  href="/events/new"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-2"
                >
                  <span className="text-lg">➕</span>
                  Créer event
                </Link>
              )}

              <Link
                href="/profile"
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform duration-300">👤</span>
                {user?.firstName}
                {isAdmin() && (
                  <span className="ml-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    Admin
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Logout
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
