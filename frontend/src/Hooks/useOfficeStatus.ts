import { useEffect, useState } from "react";

// Office open/closed status in Dubai time, read from the working-hours text.

const TIME_ZONE = "Asia/Dubai";
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Hours = { fromDay: number; toDay: number; open: number; close: number; openLabel: string };

/** Reads text like "Mon to Sat - 9 AM to 5 PM". Returns null if it can't. */
function parseHours(text?: string): Hours | null {
  if (!text) return null;
  const m = text.match(
    /(sun|mon|tue|wed|thu|fri|sat)\w*\s*(?:to|-|–)\s*(sun|mon|tue|wed|thu|fri|sat)\w*.*?(\d{1,2})(?::(\d{2}))?\s*(am|pm).*?(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i
  );
  if (!m) return null;
  const to24 = (h: string, min: string | undefined, ap: string) =>
    ((Number(h) % 12) + (ap.toLowerCase() === "pm" ? 12 : 0)) * 60 + Number(min ?? 0);
  return {
    fromDay: DAYS.indexOf(m[1].toLowerCase()),
    toDay: DAYS.indexOf(m[2].toLowerCase()),
    open: to24(m[3], m[4], m[5]),
    close: to24(m[6], m[7], m[8]),
    openLabel: `${m[3]}${m[4] ? `:${m[4]}` : ""} ${m[5].toUpperCase()}`,
  };
}

/** Current weekday/minutes in Dubai, regardless of the visitor's own time zone. */
function dubaiNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = DAYS.indexOf(get("weekday").slice(0, 3).toLowerCase());
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute, clock: `${get("hour")}:${get("minute")}` };
}

const dayInRange = (d: number, from: number, to: number) =>
  from <= to ? d >= from && d <= to : d >= from || d <= to;

export function useOfficeStatus(timing?: string) {
  const [now, setNow] = useState(dubaiNow);
  useEffect(() => {
    const id = window.setInterval(() => setNow(dubaiNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const hours = parseHours(timing);
  if (!hours) return { clock: now.clock, status: null as null | { open: boolean; note: string } };

  const openToday = dayInRange(now.day, hours.fromDay, hours.toDay);
  const open = openToday && now.minutes >= hours.open && now.minutes < hours.close;
  let note = "";
  if (!open) {
    if (openToday && now.minutes < hours.open) note = `Opens ${hours.openLabel}`;
    else {
      let d = (now.day + 1) % 7;
      while (!dayInRange(d, hours.fromDay, hours.toDay)) d = (d + 1) % 7;
      note = `Opens ${DAY_NAMES[d]} ${hours.openLabel}`;
    }
  }
  return { clock: now.clock, status: { open, note } };
}

