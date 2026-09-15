import { create } from "zustand";

const KEY = "thermo-ch1-progress-v1";

export type ExerciseResult = {
  status: "done" | "miss";
  score: number;
  max: number;
};

type ProgressState = {
  hydrated: boolean;
  read: string[];
  exercises: Record<string, ExerciseResult>;
  hydrate: () => void;
  markRead: (slug: string) => void;
  saveExercise: (id: string, result: ExerciseResult) => void;
  reset: () => void;
};

function persist(partial: Pick<ProgressState, "read" | "exercises">) {
  try {
    localStorage.setItem(KEY, JSON.stringify(partial));
  } catch {
    /* ignore quota */
  }
}

export const useProgress = create<ProgressState>((set, get) => ({
  hydrated: false,
  read: [],
  exercises: {},
  hydrate: () => {
    if (get().hydrated) return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Pick<ProgressState, "read" | "exercises">>;
        set({
          hydrated: true,
          read: Array.isArray(parsed.read) ? parsed.read : [],
          exercises: parsed.exercises ?? {},
        });
        return;
      }
    } catch {
      /* ignore */
    }
    set({ hydrated: true });
  },
  markRead: (slug) => {
    const read = get().read.includes(slug) ? get().read : [...get().read, slug];
    set({ read });
    persist({ read, exercises: get().exercises });
  },
  saveExercise: (id, result) => {
    const exercises = { ...get().exercises, [id]: result };
    set({ exercises });
    persist({ read: get().read, exercises });
  },
  reset: () => {
    set({ read: [], exercises: {} });
    persist({ read: [], exercises: {} });
  },
}));
