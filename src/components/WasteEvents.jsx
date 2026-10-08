import { formatTime, formatDateTime } from "../utils/formatTime";
import { wasteTypeLabel } from "../utils/wasteType";

export default function WasteEvents({ events, loading, error }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Recent Events
      </h2>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">Unable to load waste events.</p>
      )}

      {!error && loading && (
        <p className="text-sm text-slate-400">Loading events…</p>
      )}

      {!error && !loading && events.length === 0 && (
        <p className="text-sm text-slate-400">No waste events recorded yet.</p>
      )}

      {!error && events.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400 dark:border-slate-800">
                <th className="pb-2 pr-4 font-medium">Time</th>
                <th className="pb-2 pr-4 font-medium">Type</th>
                <th className="pb-2 pr-4 font-medium">Landfill</th>
                <th className="pb-2 font-medium">Recyclable</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                  <td className="py-2 pr-4 tabular-nums" title={formatDateTime(e.timestamp)}>
                    {formatTime(e.timestamp)}
                  </td>
                  <td className="py-2 pr-4">
                    <TypeBadge type={e.type} />
                  </td>
                  <td className="py-2 pr-4 tabular-nums">
                    {e.landfillFill != null ? `${Math.round(e.landfillFill)}%` : "N/A"}
                  </td>
                  <td className="py-2 tabular-nums">
                    {e.recyclableFill != null ? `${Math.round(e.recyclableFill)}%` : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function TypeBadge({ type }) {
  const key = String(type ?? "").toLowerCase();
  const cls =
    key === "landfill"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
      : key === "recycleable" || key === "recyclable"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {wasteTypeLabel(type)}
    </span>
  );
}
