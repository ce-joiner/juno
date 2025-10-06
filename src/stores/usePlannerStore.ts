/**
 * Planner Store
 *
 * Manages all calendar events, tasks, and wellness activities scheduled
 * in the user's planner. Handles CRUD operations for events.
 *
 * Usage example:
 * const { events, addEvent, updateEvent, deleteEvent } = usePlannerStore();
 */

import { create } from 'zustand';

// event object
interface Event {
  id: string;
  title: string;
  startTime: string; // ISO date string (e.g, "2025-10-06T14:00:00Z")
  endTime: string;
  type: 'event' | 'task' | 'wellness';
  completed: boolean;
}

// planner state
interface PlannerState {
  events: Event[]; //array of all events
  currentDate: string; // date user is currently viewing

  //actions
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setCurrentDate: (date: string) => void;
}

/**
 * Create the planner store
 */
export const usePlannerStore = create<PlannerState>((set) => ({
  // initial state - empty events, today's date
  events: [],
  currentDate: new Date().toISOString().split('T')[0], // Gets "2025-10-06" format

  /**
   * Add a new event
   * Takes a complete Event object and appends it to the events array
   *
   * Use the spread operator to create a NEW array
   * (Zustand needs immutability - never mutate state directly)
   */
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event], // Create new array with existing + new event
    })),

  /**
   * Update an existing event
   * Finds the event by ID and merges in the updates
   *
   * @param id - The event ID to update
   * @param updates - Partial<Event> means you only need to pass the fields you want to change
   *
   * Example: updateEvent('123', { completed: true })
   */
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map(
        (e) =>
          e.id === id
            ? { ...e, ...updates } // found it, merge updates
            : e // not the one, return unchanged
      ),
    })),

  /**
   * Delete an event
   * Removes the event with matching ID from the array
   */
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id), // keep all except this one
    })),

  /**
   * Set the current date being viewed
   * Used when user navigates between days in the calendar
   */
  setCurrentDate: (date) => set({ currentDate: date }),
}));
