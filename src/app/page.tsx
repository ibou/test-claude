import WeeklyCalendar from "@/components/WeeklyCalendar";
import StatCard from "@/components/StatCard";
import Clock from "@/components/Clock";

const STATS = [
  { label: "Tâches du jour", value: 8, sub: "5 complétées · 3 en attente", accent: "#4f46e5", icon: "✓" },
  { label: "Réunions", value: 3, sub: "Prochaine à 14h00", accent: "#0ea5e9", icon: "◷" },
  { label: "Objectifs", value: "72%", sub: "Semaine en cours", accent: "#10b981", icon: "◎" },
];

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-7 border-b border-white/10">
          <span className="text-lg font-bold tracking-tight">Workspace</span>
          <span aria-hidden="true" className="text-indigo-400 text-lg font-bold">.</span>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {[
            { icon: "▣", label: "Vue d'ensemble", active: true },
            { icon: "◷", label: "Calendrier", active: false },
            { icon: "☐", label: "Tâches", active: false },
            { icon: "◈", label: "Projets", active: false },
            { icon: "◉", label: "Rapports", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                item.active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold shrink-0">
              IB
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-sm font-medium truncate">Ibrahim</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Vue d&apos;ensemble</h1>
            <p className="text-sm text-gray-400">Bonjour Ibrahim, voici votre journée.</p>
          </div>
          <Clock />
        </header>

        <div className="px-8 py-7 flex flex-col gap-6">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Calendar */}
          <WeeklyCalendar />

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-4">

            {/* Tâches rapides */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Tâches du jour</h2>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Revue du code PR #42", done: true },
                  { label: "Réunion d'équipe 14h", done: true },
                  { label: "Déploiement staging", done: false },
                  { label: "Rapport hebdomadaire", done: false },
                  { label: "Tests end-to-end", done: false },
                ].map((task) => (
                  <li key={task.label} className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        task.done
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "border-gray-200"
                      }`}
                    >
                      {task.done ? "✓" : ""}
                    </span>
                    <span
                      className={`text-sm ${
                        task.done ? "line-through text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {task.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Activité récente</h2>
              <ul className="flex flex-col gap-4">
                {[
                  { who: "Marie", action: "a commenté le PR #38", time: "il y a 5 min", color: "#f59e0b" },
                  { who: "Thomas", action: "a fermé le ticket #217", time: "il y a 23 min", color: "#10b981" },
                  { who: "Sophie", action: "a créé le projet Alpha", time: "il y a 1h", color: "#0ea5e9" },
                  { who: "Ibrahim", action: "a déployé v2.1.0", time: "il y a 2h", color: "#4f46e5" },
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
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{ev.who}</span> {ev.action}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{ev.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
