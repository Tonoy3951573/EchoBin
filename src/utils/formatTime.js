export function toMs(ts) {
  if (ts == null) return null;
  const n = Number(ts);
  if (Number.isNaN(n)) return null;
  return n < 1e12 ? n * 1000 : n;
}

/** Convert a Firebase timestamp into readable local time, e.g. "10:42:13". */
export function formatTime(ts) {
  const ms = toMs(ts);
  if (ms == null) return "N/A";
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Full local date+time for tooltips / detailed views. */
export function formatDateTime(ts) {
  const ms = toMs(ts);
  if (ms == null) return "N/A";
  return new Date(ms).toLocaleString();
}

/** "just now", "10 seconds ago", "3 minutes ago", ... */
export function timeAgo(ts) {
  const ms = toMs(ts);
  if (ms == null) return "N/A";
  const diff = Math.max(0, Date.now() - ms);
  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec} seconds ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  return `${day} day${day === 1 ? "" : "s"} ago`;
}
