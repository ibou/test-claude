"use client";

import { useEffect, useState } from "react";

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dateStr = `${DAYS_FR[now.getDay()]} ${now.getDate()} ${MONTHS_FR[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="text-left md:text-right">
      <p className="text-xl md:text-2xl font-semibold tabular-nums text-gray-700 tracking-tight">
        {hours}:{minutes}
        <span className="text-gray-400 text-base md:text-lg">:{seconds}</span>
      </p>
      <p className="text-xs md:text-sm text-gray-500 mt-0.5">{dateStr}</p>
    </div>
  );
}
