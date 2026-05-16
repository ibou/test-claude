import WeeklyCalendar from "@/components/WeeklyCalendar";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";

const STATS = [
  { label: "Tâches du jour", value: 8, sub: "5 complétées · 3 en attente", icon: "✓" },
  { label: "Réunions", value: 3, sub: "Prochaine à 14h00", icon: "◷" },
  { label: "Objectifs", value: "72%", sub: "Semaine en cours", icon: "◎" },
];

export default function VueEnsemble() {
  return (
    <>
      <PageHeader title="Vue d'ensemble" subtitle="Bonjour Ibrahim, voici votre journée." />

      <div className="px-4 md:px-8 py-5 md:py-7 flex flex-col gap-4 md:gap-6">

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Calendar */}
        <WeeklyCalendar />

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Tâches rapides */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Tâches du jour</h2>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Revue du code PR #42", done: true },
                { label: "Réunion d'équipe 14h", done: true },
                { label: "Déploiement staging", done: false },
                { label: "Rapport hebdomadaire", done: false },
                { label: "Tests end-to-end", done: false },
              ].map((task) => (
                <li key={task.label}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={task.done}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-transparent peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-transparent peer-checked:text-white transition-colors"
                    >
                      ✓
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 peer-checked:line-through peer-checked:text-gray-500 dark:peer-checked:text-gray-500 transition-colors">
                      {task.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Activité récente */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Activité récente</h2>
            <ul className="flex flex-col gap-4">
              {[
                { who: "Marie", action: "a commenté le PR #38", time: "il y a 5 min", color: "var(--accent-amber)" },
                { who: "Thomas", action: "a fermé le ticket #217", time: "il y a 23 min", color: "var(--accent-emerald)" },
                { who: "Sophie", action: "a créé le projet Alpha", time: "il y a 1h", color: "var(--accent-sky)" },
                { who: "Ibrahim", action: "a déployé v2.1.0", time: "il y a 2h", color: "var(--brand-indigo)" },
              ].map((ev) => (
                <li key={ev.action} className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                    style={{ background: ev.color }}
                  >
                    {ev.who[0]}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{ev.who}</span> {ev.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ev.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
