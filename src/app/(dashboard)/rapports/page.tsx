import PageHeader from "@/components/PageHeader";

interface Metric {
  label: string;
  value: string;
  delta: number;
  unit?: string;
}

const METRICS: Metric[] = [
  { label: "Tâches livrées", value: "147", delta: 12 },
  { label: "Temps moyen / ticket", value: "2.4", delta: -8, unit: "j" },
  { label: "Vélocité sprint", value: "38", delta: 5, unit: "pts" },
  { label: "Couverture tests", value: "84", delta: 3, unit: "%" },
];

// 12 weeks of mock velocity data
const TREND = [22, 28, 30, 26, 32, 35, 31, 34, 36, 33, 37, 38];

export default function RapportsPage() {
  const max = Math.max(...TREND);
  const min = Math.min(...TREND);

  return (
    <>
      <PageHeader title="Rapports" subtitle="Indicateurs d'équipe sur 12 dernières semaines." />
      <div className="px-4 md:px-8 py-5 md:py-7 flex flex-col gap-4 md:gap-6">

        {/* Metric blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => {
            const positive = m.delta > 0;
            const neutral = m.delta === 0;
            // Some metrics are better when going DOWN (Temps moyen)
            const isInverse = m.label.startsWith("Temps");
            const good = neutral ? null : isInverse ? !positive : positive;
            return (
              <div
                key={m.label}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {m.label}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100 tabular-nums tracking-tight">
                    {m.value}
                  </span>
                  {m.unit && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {m.unit}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs font-medium ${
                    good === null
                      ? "text-gray-500 dark:text-gray-400"
                      : good
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {positive ? "↑" : neutral ? "→" : "↓"} {Math.abs(m.delta)}% vs trimestre précédent
                </p>
              </div>
            );
          })}
        </div>

        {/* Trend chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              Vélocité hebdomadaire
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">12 semaines</span>
          </div>
          <div className="flex items-end gap-1.5 md:gap-2">
            {TREND.map((v, i) => {
              const heightPx = ((v - min + 5) / (max - min + 5)) * 140;
              const isLast = i === TREND.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 tabular-nums">
                    {v}
                  </div>
                  <div
                    className={`w-full rounded-t ${
                      isLast
                        ? "bg-indigo-600"
                        : "bg-indigo-200 dark:bg-indigo-900"
                    }`}
                    style={{ height: `${heightPx}px` }}
                    aria-hidden="true"
                  />
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    S{i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
