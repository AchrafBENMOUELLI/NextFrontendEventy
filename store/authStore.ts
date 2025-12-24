'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isOrganizer: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      setAuth: (user, token) => set({ user, token, isLoggedIn: true }),

      logout: () => set({ user: null, token: null, isLoggedIn: false }),

      isOrganizer: () => {
        const user = get().user;
        return user?.role === 'organizer' || user?.role === 'admin';
      },

      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
