"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useTasks } from "@/lib/tasks-context";

type Filter = "all" | "open" | "done";

const FILTER_EMPTY_MESSAGES: Record<Filter, string> = {
  all: "Aucune tâche pour le moment.",
  open: "Toutes les tâches sont terminées. Bien joué.",
  done: "Aucune tâche terminée — il faut commencer.",
};

export default function TachesPage() {
  const { tasks, toggle, openCount, doneCount } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = tasks.filter((t) => {
    if (filter === "open") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

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
            <div className="py-16 flex flex-col items-center gap-3 text-center px-6">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl text-gray-400 dark:text-gray-500"
              >
                ☑
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {FILTER_EMPTY_MESSAGES[filter]}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Voir toutes les tâches
                </button>
              )}
            </div>
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
