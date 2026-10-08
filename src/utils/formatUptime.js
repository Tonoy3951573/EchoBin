/** Convert uptime seconds into "3 days 4 hours 12 minutes" style text. */
export function formatUptime(seconds) {
  if (seconds == null || Number.isNaN(Number(seconds))) return "N/A";
  let s = Math.max(0, Math.floor(Number(seconds)));
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const minutes = Math.floor(s / 60);

  const parts = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  return parts.join(" ");
}
