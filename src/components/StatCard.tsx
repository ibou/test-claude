interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  accent: string;
  icon: string;
}

export default function StatCard({ label, value, sub, accent, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span
          aria-hidden="true"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: accent + "18", color: accent }}
        >
          {icon}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{sub}</p>
      </div>
      <div className="h-1 rounded-full bg-gray-100">
        <div
          className="h-1 rounded-full"
          style={{ width: "60%", background: accent }}
        />
      </div>
    </div>
  );
}
