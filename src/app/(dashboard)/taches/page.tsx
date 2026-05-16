"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

interface Task {
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

type Filter = "all" | "open" | "done";

export default function TachesPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = tasks.filter((t) => {
    if (filter === "open") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const openCount = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.length - openCount;

  function toggle(id: string) {
    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return (
    <>
      <PageHeader title="Tâches" subtitle={`${openCount} ouvertes · ${doneCount} terminées`} />
      <div className="px-4 md:px-8 py-5 md:py-7">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-3 border-b border-gray-100 dark:border-gray-800">
            {(["all", "open", "done"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {f === "all" ? "Toutes" : f === "open" ? "Ouvertes" : "Terminées"}
                <span className="ml-1.5 text-xs opacity-75">
                  {f === "all" ? tasks.length : f === "open" ? openCount : doneCount}
                </span>
              </button>
            ))}
          </div>

          {/* Task list */}
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 p-6 text-center">
              Aucune tâche dans cette catégorie.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((task) => (
                <li key={task.id}>
                  <label className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggle(task.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-transparent peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-transparent peer-checked:text-white transition-colors"
                    >
                      ✓
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm transition-colors ${
                          task.done
                            ? "line-through text-gray-500 dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {task.label}
                      </p>
                      {(task.due || task.project) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {task.due}
                          {task.due && task.project && " · "}
                          {task.project}
                        </p>
                      )}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
