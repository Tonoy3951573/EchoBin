import { useEffect, useState } from "react";
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";
import { database, deviceUID, firebaseInitError } from "../firebase/config";

const MAX_EVENTS = 50; // pulled from Firebase; UI slices what it needs
const DASHBOARD_EVENTS = 20;

function normalizeEvent(id, raw) {
  if (!raw || typeof raw !== "object") return null;
  return {
    id,
    type: raw.type ?? "unknown",
    timestamp: raw.timestamp ?? null,
    landfillFill: typeof raw.landfillFill === "number" ? raw.landfillFill : null,
    recyclableFill: typeof raw.recyclableFill === "number" ? raw.recyclableFill : null,
    landfillDistanceCm: raw.landfillDistanceCm ?? null,
    recyclableDistanceCm: raw.recyclableDistanceCm ?? null,
    deviceUptime: raw.deviceUptime ?? null,
  };
}

/**
 * Subscribes to the latest waste events (newest first, max 20).
 * Returns { events, allEvents, loading, error }.
 */
export function useWasteEvents() {
  const [state, setState] = useState({ events: [], allEvents: [], loading: true, error: null });

  useEffect(() => {
    if (firebaseInitError) {
      setState({ events: [], allEvents: [], loading: false, error: firebaseInitError });
      return;
    }
    if (!deviceUID) {
      setState({
        events: [],
        allEvents: [],
        loading: false,
        error: new Error("VITE_DEVICE_UID is not set. Add it to your .env file."),
      });
      return;
    }

    const eventsRef = query(
      ref(database, `devices/${deviceUID}/wasteEvents`),
      orderByChild("timestamp"),
      limitToLast(MAX_EVENTS)
    );

    const unsubscribe = onValue(
      eventsRef,
      (snapshot) => {
        const val = snapshot.val();
        const list = val
          ? Object.entries(val)
              .map(([id, raw]) => normalizeEvent(id, raw))
              .filter(Boolean)
              .sort((a, b) => (toMs(b.timestamp) ?? 0) - (toMs(a.timestamp) ?? 0))
          : [];
        setState({ events: list.slice(0, DASHBOARD_EVENTS), allEvents: list, loading: false, error: null });
      },
      (error) => {
        setState((s) => ({ ...s, loading: false, error }));
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
}

/** Firebase timestamps may be seconds or milliseconds. */
export function toMs(ts) {
  if (ts == null) return null;
  const n = Number(ts);
  if (Number.isNaN(n)) return null;
  return n < 1e12 ? n * 1000 : n;
}
