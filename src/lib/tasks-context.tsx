"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface Task {
  id: string;
  label: string;
  done: boolean;
  due?: string;
  project?: string;
}

const INITIAL_TASKS: Task[] = [
  { id: "t1", label: "Revue du code PR #42", done: true, due: "Aujourd'hui", project: "Workspace" },
  { id: "t2", label: "Réunion d'équipe 14h", done: true, due: "Aujourd'hui", project: "Workspace" },
  { id: "t3", label: "Déploiement staging", done: false, due: "Aujourd'hui", project: "Infra" },
  { id: "t4", label: "Rapport hebdomadaire", done: false, due: "Demain", project: "Workspace" },
  { id: "t5", label: "Tests end-to-end", done: false, due: "Demain", project: "QA" },
  { id: "t6", label: "Préparer démo client", done: false, due: "16 mai", project: "Alpha" },
  { id: "t7", label: "Mettre à jour la roadmap", done: false, due: "18 mai", project: "Produit" },
  { id: "t8", label: "Migration base de données", done: false, due: "20 mai", project: "Infra" },
  { id: "t9", label: "Onboarding nouveau dev", done: true, due: "15 mai", project: "Workspace" },
  { id: "t10", label: "Audit sécurité trimestriel", done: false, due: "30 mai", project: "Sec" },
];

const STORAGE_KEY = "workspace.tasks.v1";

interface TasksContextValue {
  tasks: Task[];
  toggle: (id: string) => void;
  openCount: number;
  doneCount: number;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Task[];
        if (Array.isArray(stored) && stored.every((t) => t.id && typeof t.done === "boolean")) {
          setTasks(stored);
        }
      }
    } catch (_) {}
    setHydrated(true);
  }, []);

  // Persist on change (skip the initial render so we don't overwrite localStorage with defaults)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (_) {}
  }, [tasks, hydrated]);

  function toggle(id: string) {
    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const openCount = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.length - openCount;

  return (
    <TasksContext.Provider value={{ tasks, toggle, openCount, doneCount }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used within TasksProvider");
  }
  return ctx;
}
