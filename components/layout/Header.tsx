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
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-purple-600">
        🎉 EventApp
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/events">Events</Link>

        {isLoggedIn ? (
          <>
            {isOrganizer() && (
              <Link href="/events/new" className="text-blue-600">
                ➕ Créer event
              </Link>
            )}

            <Link href="/profile">
              👤 {user?.firstName}
              {isAdmin() && " (Admin)"}
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
