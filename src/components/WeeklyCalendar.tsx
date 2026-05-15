"use client";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function WeeklyCalendar() {
  const today = new Date();
  const monday = getMonday(today);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const sameMonth = monday.getMonth() === sunday.getMonth();
  const weekLabel = sameMonth
    ? `${monday.getDate()} – ${sunday.getDate()} ${MONTHS[sunday.getMonth()]} ${sunday.getFullYear()}`
    : `${monday.getDate()} ${MONTHS[monday.getMonth()]} – ${sunday.getDate()} ${MONTHS[sunday.getMonth()]} ${sunday.getFullYear()}`;

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Semaine</h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">{weekLabel}</span>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {days.map((day, i) => {
          const isToday = isSameDay(day, today);
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 md:gap-2 py-2 md:py-3 px-1 rounded-lg border transition-colors duration-150 cursor-default ${
                isToday
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
              }`}
            >
              <span
                className={`text-[0.55rem] md:text-[0.6rem] font-semibold uppercase tracking-wider md:tracking-widest ${
                  isToday ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {DAYS[i]}
              </span>
              <span
                className={`text-base md:text-lg font-bold ${
                  isToday ? "text-white" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
