/**
 * Authentication Store
 *
 * Manages user authentication state across the entire app.
 * Any component can access the current user, check if they're logged in,
 * and trigger login/logout actions.
 *
 * Usage example:
 * const { user, isAuthenticated, login, logout } = useAuthStore();
 */

import { create } from 'zustand';

// user object
interface User {
  id: string; // Unique user identifier from Cognito
  name: string;
  email: string;
  profilePhoto: string; // S3 URL to user's profile photo
}

// auth state (storing)
interface AuthState {
  user: User | null;
  token: string | null; // JWT token from Cognito (for API requests)
  isAuthenticated: boolean;

  // actions that modify the state
  login: (user: User, token: string) => void;
  logout: () => void;
}

/**
 * Create the auth store using Zustand. The set function updates state, merges new values and triggers re-render in any component that uses the store  */
export const useAuthStore = create<AuthState>((set) => ({
  // initial state - user is not logged in
  user: null,
  token: null,
  isAuthenticated: false,

  // actions
  login: (user, token) =>
    set({
      user, // store the user object
      token, // store the token
      isAuthenticated: true, // set the authentication state to true
    }),
  logout: () =>
    set({
      user: null, // clear the user object
      token: null, // clear the token
      isAuthenticated: false, // set the authentication state to false
    }),
}));
