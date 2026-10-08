import { toMs } from "./formatTime";

/**
 * Determine whether the device is online.
 *
 * Preferred source: `lastSeen` (epoch seconds/ms) when the firmware provides it:
 *   < 30 s ago  → online
 *   30–90 s     → stale (possibly offline)
 *   > 90 s      → offline
 *
 * Fallback: the legacy `online` boolean. This can be stale (e.g. after a
 * power cut the last value persists in Firebase), so the UI surfaces that
 * distinction. Isolated here so `lastSeen` can be adopted later without
 * touching components.
 */
export function getDeviceHealth(status) {
  if (!status || typeof status !== "object") {
    return { state: "offline", label: "Offline", source: "none" };
  }

  if (status.lastSeen != null) {
    const ms = toMs(status.lastSeen);
    const ageSec = ms == null ? Infinity : (Date.now() - ms) / 1000;
    if (ageSec < 30) return { state: "online", label: "Online", source: "lastSeen" };
    if (ageSec <= 90) return { state: "stale", label: "Possibly Offline", source: "lastSeen" };
    return { state: "offline", label: "Offline", source: "lastSeen" };
  }

  if (status.online === true) {
    return { state: "online", label: "Online", source: "online-flag", unverified: true };
  }
  if (status.online === false) {
    return { state: "offline", label: "Offline", source: "online-flag" };
  }
  return { state: "offline", label: "Offline", source: "none" };
}
