import { Trash2, Recycle, HelpCircle, BarChart3 } from "lucide-react";
import { wasteTypeKey } from "../utils/wasteType";

export default function EventAnalytics({ allEvents }) {
  const counts = { landfill: 0, recyclable: 0, unknown: 0 };
  for (const e of allEvents) counts[wasteTypeKey(e.type)]++;

  const cards = [
    { label: "Total Waste Events", value: allEvents.length, icon: BarChart3, color: "text-blue-500" },
    { label: "Landfill Events", value: counts.landfill, icon: Trash2, color: "text-orange-500" },
    { label: "Recyclable Events", value: counts.recyclable, icon: Recycle, color: "text-emerald-500" },
    { label: "Unknown", value: counts.unknown, icon: HelpCircle, color: "text-slate-400" },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <Icon className={`h-4 w-4 ${color}`} />
            {label}
          </div>
          <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
        </div>
      ))}
    </section>
  );
}
