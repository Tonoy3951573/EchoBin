import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toMs, formatTime } from "../utils/formatTime";

/**
 * Fill-level history derived from recorded waste events (each event carries
 * landfillFill / recyclableFill at detection time). We do NOT fabricate
 * periodic readings — if events are sparse, the chart is sparse.
 */
export default function FillLevelChart({ events }) {
  const data = [...events]
    .filter((e) => e.timestamp != null && (e.landfillFill != null || e.recyclableFill != null))
    .reverse()
    .map((e) => ({
      time: formatTime(e.timestamp),
      landfill: e.landfillFill,
      recyclable: e.recyclableFill,
      ts: toMs(e.timestamp),
    }));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Fill Level History
      </h2>
      <p className="mb-4 text-xs text-slate-400 dark:text-slate-500">
        Built from recorded waste events. Periodic historical readings require the firmware to log them.
      </p>

      {data.length < 2 ? (
        <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-400 dark:bg-slate-800/50">
          Not enough event data to chart yet.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b833" />
              <XAxis dataKey="time" fontSize={12} tickLine={false} />
              <YAxis domain={[0, 100]} unit="%" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="landfill" name="Landfill" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="recyclable" name="Recyclable" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
