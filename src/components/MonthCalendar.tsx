"use client";

import { useState } from "react";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

interface CalendarEvent {
  day: number;
  month: number;
  year: number;
  title: string;
  color: string;
}

function getMockEvents(year: number, month: number): CalendarEvent[] {
  const today = new Date();
  const t = today.getDate();
  const m = today.getMonth();
  const y = today.getFullYear();

  // Anchor events relative to today for stable rendering
  return [
    { day: t, month: m, year: y, title: "Réunion 14h", color: "var(--brand-indigo)" },
    { day: t, month: m, year: y, title: "Démo client", color: "var(--accent-sky)" },
    { day: Math.min(t + 1, 28), month: m, year: y, title: "Sprint review", color: "var(--accent-emerald)" },
    { day: Math.min(t + 3, 28), month: m, year: y, title: "1:1 Marie", color: "var(--accent-amber)" },
    { day: Math.min(t + 5, 28), month: m, year: y, title: "Atelier produit", color: "var(--brand-indigo)" },
    { day: Math.max(t - 2, 2), month: m, year: y, title: "Rétro équipe", color: "var(--accent-sky)" },
    { day: Math.max(t - 5, 1), month: m, year: y, title: "Roadmap Q3", color: "var(--accent-emerald)" },
  ].filter((e) => e.year === year && e.month === month);
}

export default function MonthCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Monday-based offset: getDay() returns 0=Sunday..6=Saturday, we want 0=Monday..6=Sunday
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: ({ day: number; events: CalendarEvent[] } | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  const events = getMockEvents(viewYear, viewMonth);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      events: events.filter((e) => e.day === d),
    });
  }
  // Pad end to complete the last row
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }
  function goToday() {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
          {MONTHS[viewMonth]} {viewYear}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToday}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Aujourd&apos;hui
          </button>
          <button
            onClick={prevMonth}
            aria-label="Mois précédent"
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            onClick={nextMonth}
            aria-label="Mois suivant"
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-[0.55rem] md:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {cells.map((cell, i) => {
          if (!cell) {
            return <div key={i} className="aspect-square md:aspect-auto md:min-h-20" />;
          }
          const isToday =
            cell.day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();
          return (
            <div
              key={i}
              className={`md:min-h-20 p-1 md:p-2 rounded-lg border flex flex-col gap-1 ${
                isToday
                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
              }`}
            >
              <span
                className={`text-xs md:text-sm font-semibold ${
                  isToday
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {cell.day}
              </span>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                {cell.events.slice(0, 3).map((ev, j) => (
                  <span
                    key={j}
                    className="text-[0.55rem] md:text-[0.65rem] truncate rounded px-1 py-0.5 text-white"
                    style={{ background: ev.color }}
                    title={ev.title}
                  >
                    {ev.title}
                  </span>
                ))}
                {cell.events.length > 3 && (
                  <span className="text-[0.55rem] md:text-[0.65rem] text-gray-500 dark:text-gray-400 px-1">
                    +{cell.events.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
