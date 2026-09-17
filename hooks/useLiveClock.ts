"use client";

import { useEffect, useState } from "react";

function format(date: Date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss} GMT+1`;
}

/** Live HH:MM:SS clock, matching the original mockup's data-oba="heure" span. */
export function useLiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setTime(format(new Date()));
    const id = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
