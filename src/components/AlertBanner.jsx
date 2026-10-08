import { AlertTriangle, AlertOctagon } from "lucide-react";

export default function AlertBanner({ landfillFull, recyclableFull }) {
  const both = landfillFull && recyclableFull;
  if (!landfillFull && !recyclableFull) return null;

  let message;
  if (both) message = "Both chambers are FULL";
  else if (landfillFull) message = "Landfill chamber is FULL";
  else message = "Recyclable chamber is FULL";

  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {both ? <AlertOctagon className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
