/**
 * Chamber fill-status rules:
 *   full flag (Firebase) → FULL
 *   90–100%              → FULL
 *   60–89%               → Getting Full
 *   0–59%                → Normal
 */
export function fillStatus(fillPercent, full) {
  if (full === true) return "FULL";
  const pct = Number(fillPercent);
  if (Number.isNaN(pct) || fillPercent == null) return "Unknown";
  if (pct >= 90) return "FULL";
  if (pct >= 60) return "Getting Full";
  return "Normal";
}

/** Tailwind classes per fill status. */
export function fillStatusColor(status) {
  switch (status) {
    case "FULL":
      return "text-red-600 dark:text-red-400";
    case "Getting Full":
      return "text-orange-600 dark:text-orange-400";
    case "Normal":
      return "text-emerald-600 dark:text-emerald-400";
    default:
      return "text-slate-500 dark:text-slate-400";
  }
}

export function fillBarColor(status) {
  switch (status) {
    case "FULL":
      return "bg-red-500";
    case "Getting Full":
      return "bg-orange-500";
    case "Normal":
      return "bg-emerald-500";
    default:
      return "bg-slate-400";
  }
}
