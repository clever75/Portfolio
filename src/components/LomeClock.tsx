"use client";

import { useEffect, useState } from "react";

export default function LomeClock() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      // Heure de Lomé (UTC+0, pas de changement d'heure)
      const lomeTime = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Africa/Lome",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(lomeTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Évite le flash côté serveur (SSR)
  if (!mounted) {
    return (
      <span className="font-mono text-xs font-medium text-encre-douce">
        Lomé • --:--
      </span>
    );
  }

  return (
    <span className="font-mono text-xs font-medium text-encre-douce">
      Lomé • <span className="text-encre">{time}</span>
    </span>
  );
}