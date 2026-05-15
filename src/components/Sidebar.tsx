const NAV = [
  { icon: "▣", label: "Vue d'ensemble", active: true },
  { icon: "◷", label: "Calendrier", active: false },
  { icon: "☐", label: "Tâches", active: false },
  { icon: "◈", label: "Projets", active: false },
  { icon: "◉", label: "Rapports", active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 bg-gray-900 dark:bg-gray-950 text-white flex-col h-screen sticky top-0 border-r border-transparent dark:border-gray-800">
      <div className="px-6 py-7 border-b border-white/10">
        <span className="text-lg font-bold tracking-tight">Workspace</span>
        <span aria-hidden="true" className="ml-1 text-indigo-400 text-lg font-bold">.</span>
      </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {NAV.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
              item.active
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span aria-hidden="true" className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            IB
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium">Ibrahim</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
