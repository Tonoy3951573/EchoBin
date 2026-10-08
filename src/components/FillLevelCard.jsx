import { fillStatus, fillStatusColor, fillBarColor } from "../utils/fillStatus";

export default function FillLevelCard({ title, chamber }) {
  const pct = chamber?.fillPercent;
  const pctNum = typeof pct === "number" ? Math.min(100, Math.max(0, pct)) : null;
  const status = fillStatus(pct, chamber?.full);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h2>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-bold tabular-nums">
          {pctNum != null ? `${Math.round(pctNum)}%` : "N/A"}
        </span>
        <span className={`pb-1 text-sm font-semibold ${fillStatusColor(status)}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={pctNum ?? 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${title} fill level`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillBarColor(status)}`}
          style={{ width: `${pctNum ?? 0}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Distance:{" "}
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {chamber?.distanceCm != null ? `${chamber.distanceCm} cm` : "N/A"}
        </span>
      </p>
    </section>
  );
}
