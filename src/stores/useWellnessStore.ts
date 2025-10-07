/**
 * Wellness Store
 *
 * Manages wellness habits, active sessions (meditation, exercise), and streak tracking.
 * This store powers the Wheel of Wellness and session timer features.
 *
 * Usage example:
 * const { habits, currentSession, startSession, completeSession } = useWellnessStore();
 */

import { create } from 'zustand';

// wellness activity object
interface WellnessActivity {
  id: string;
  name: string;
  category: 'mind' | 'body';
  subcategory: 'active' | 'restorative';
  duration: number; // minutes
  isCustom: boolean; // true if user created it, false if preset
}

// Active wellness session data
interface WellnessSession {
  activity: WellnessActivity;
  startedAt: Date;
}

// wellness state
interface WellnessState {
  habits: WellnessActivity[];
  currentSession: WellnessSession | null; // Active session data (null when no session running)
  streak: number; // consecutive days of activity

  // actions
  addHabit: (habit: WellnessActivity) => void;
  removeHabit: (id: string) => void;
  startSession: (activity: WellnessActivity) => void;
  completeSession: () => void;
}

/**
 * Create the wellness store
 */
export const useWellnessStore = create<WellnessState>((set) => ({
  // initial state - empty habits, no session running, streak at 0
  habits: [],
  currentSession: null,
  streak: 0,

  /**
   * Add a new habit
   * User selects a wellness activity to add to their regular routine
   * These habits appear in their Wheel of Wellness
   */
  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit], // Create new array with existing + new habit
    })),

  /**
   * Remove a habit
   * User selects a habit to remove from their regular routine
   */
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id), // remove from array
    })),

  /**
   * Start a wellness session
   * Called when user taps "Start" on a meditation, exercise, etc.
   * Records the activity and timestamp for tracking duration
   *
   * The currentSession object tracks:
   * - What activity they're doing
   * - When they started (for calculating elapsed time)
   */
  startSession: (activity) =>
    set({
      currentSession: {
        activity,
        startedAt: new Date(), // Timestamp when they started
      },
    }),

  /**
   * Complete a wellness session
   * Called when user finishes their activity or timer ends
   *
   * This:
   * 1. Clears the current session (sets to null)
   * 2. Increments the streak counter
   *
   * TODO: Later we'll also sync this completion to the backend
   * and potentially update the planner with the completed activity
   */
  completeSession: () =>
    set((state) => ({
      currentSession: null, // Clear the session
      streak: state.streak + 1, // Reward the user! Increment streak
    })),
}));
