import { ScanLine } from "lucide-react";
import { formatTime } from "../utils/formatTime";
import { wasteTypeLabel } from "../utils/wasteType";

/**
 * "Last Detection" card. Derives from the newest waste event first; falls
 * back to status.lastDetected if it is an object {type, timestamp}.
 */
export default function LastDetection({ status, latestEvent }) {
  let type = latestEvent?.type;
  let timestamp = latestEvent?.timestamp;

  if (type == null && status?.lastDetected && typeof status.lastDetected === "object") {
    type = status.lastDetected.type;
    timestamp = status.lastDetected.timestamp;
  } else if (type == null && typeof status?.lastDetected === "string") {
    type = status.lastDetected;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Last Detection
      </h2>
      <div className="mt-4 flex items-center gap-3">
        <ScanLine className="h-8 w-8 text-blue-500" />
        <div>
          <p className="text-xl font-bold">{type ? wasteTypeLabel(type) : "N/A"}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {timestamp != null ? formatTime(timestamp) : type ? "Time unavailable" : "No detections yet"}
          </p>
        </div>
      </div>
    </section>
  );
}
