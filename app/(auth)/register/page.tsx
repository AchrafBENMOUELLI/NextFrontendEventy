"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/api";
import { User } from "@/types/user";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "user" as "user" | "organizer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("⚠️ Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      alert("✅ Inscription réussie ! Vous pouvez maintenant vous connecter.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "❌ Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    document.title = 'Inscription | Eventy';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 animate-bounce">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Inscription
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Créez votre compte Eventy</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 animate-shake backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name - Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
              >
                Prénom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                placeholder="Prénom"
              />
            </div>

            <div className="group">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
              >
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
                placeholder="Nom"
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="votre.email@example.com"
            />
          </div>

          {/* Password */}
          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
            >
              Mot de passe <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="Minimum 6 caractères"
            />
          </div>

          {/* Confirm Password */}
          <div className="group">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
            >
              Confirmer le mot de passe <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70"
              placeholder="Retapez votre mot de passe"
            />
          </div>

          {/* Role */}
          <div className="group">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400"
            >
              Type de compte <span className="text-red-400">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70 cursor-pointer"
            >
              <option value="user" className="bg-slate-800">👤 Utilisateur</option>
              <option value="organizer" className="bg-slate-800">🎫 Organisateur</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-6"
          >
            {isLoading ? (
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
                Inscription en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>✅</span>
                S'inscrire
              </span>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-400 pt-4 border-t border-slate-700 mt-4">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold hover:from-purple-300 hover:to-pink-300 transition-all relative group"
            >
              Se connecter
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
