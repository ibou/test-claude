import PageHeader from "@/components/PageHeader";

interface Project {
  name: string;
  description: string;
  status: "active" | "planning" | "paused";
  progress: number;
  members: string[];
  accent: string;
}

const PROJECTS: Project[] = [
  {
    name: "Alpha",
    description: "Refonte de l'expérience client B2B",
    status: "active",
    progress: 68,
    members: ["IB", "M", "T"],
    accent: "var(--brand-indigo)",
  },
  {
    name: "Workspace v2",
    description: "Migration de l'API legacy vers GraphQL",
    status: "active",
    progress: 42,
    members: ["IB", "S"],
    accent: "var(--accent-sky)",
  },
  {
    name: "Mobile",
    description: "Application iOS et Android",
    status: "planning",
    progress: 12,
    members: ["M", "T", "S", "N"],
    accent: "var(--accent-emerald)",
  },
  {
    name: "Sécurité Q3",
    description: "Audit OWASP et durcissement",
    status: "active",
    progress: 85,
    members: ["IB"],
    accent: "var(--accent-amber)",
  },
  {
    name: "Documentation",
    description: "Refonte de la doc interne",
    status: "paused",
    progress: 30,
    members: ["S", "N"],
    accent: "var(--accent-sky)",
  },
  {
    name: "Analytics",
    description: "Pipeline de tracking événements",
    status: "planning",
    progress: 5,
    members: ["T"],
    accent: "var(--brand-indigo)",
  },
];

const STATUS_LABELS = {
  active: "Actif",
  planning: "Planification",
  paused: "En pause",
};

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  planning: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  paused: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function ProjetsPage() {
  return (
    <>
      <PageHeader title="Projets" subtitle={`${PROJECTS.length} projets · ${PROJECTS.filter((p) => p.status === "active").length} actifs`} />
      <div className="px-4 md:px-8 py-5 md:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {p.description}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[p.status]}`}
                >
                  {STATUS_LABELS[p.status]}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  <span>Progression</span>
                  <span className="tabular-nums font-medium text-gray-700 dark:text-gray-300">
                    {p.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${p.progress}%`, background: p.accent }}
                  />
                </div>
              </div>

              <div className="flex items-center -space-x-1.5">
                {p.members.slice(0, 4).map((m, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-gray-900"
                    style={{ background: p.accent }}
                  >
                    {m}
                  </div>
                ))}
                {p.members.length > 4 && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 border-2 border-white dark:border-gray-900">
                    +{p.members.length - 4}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
