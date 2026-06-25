import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Estado persistente del usuario (v1: localStorage; v2: IndexedDB + sync).
// Guarda overrides sobre el contenido canónico: tareas hechas, ítems de día marcados.

interface PlannerState {
  taskDone: Record<string, boolean>
  statusDone: Record<string, boolean> // clave: `${dayId}:${index}`
  toggleTask: (id: string) => void
  toggleStatus: (dayId: string, index: number) => void
  isTaskDone: (id: string, fallback: boolean) => boolean
  isStatusDone: (dayId: string, index: number, fallback: boolean) => boolean
  reset: () => void
}

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      taskDone: {},
      statusDone: {},
      toggleTask: (id) =>
        set((s) => ({ taskDone: { ...s.taskDone, [id]: !s.taskDone[id] } })),
      toggleStatus: (dayId, index) =>
        set((s) => {
          const key = `${dayId}:${index}`
          return { statusDone: { ...s.statusDone, [key]: !s.statusDone[key] } }
        }),
      isTaskDone: (id, fallback) => {
        const v = get().taskDone[id]
        return v === undefined ? fallback : v
      },
      isStatusDone: (dayId, index, fallback) => {
        const v = get().statusDone[`${dayId}:${index}`]
        return v === undefined ? fallback : v
      },
      reset: () => set({ taskDone: {}, statusDone: {} }),
    }),
    { name: 'roque-asia-2026' },
  ),
)
