import { Wifi, WifiOff, Moon, Sun, Activity } from "lucide-react";
import { getDeviceHealth } from "../utils/deviceHealth";
import { timeAgo } from "../utils/formatTime";

export default function Header({ status, lastUpdated, dark, onToggleTheme }) {
  const health = getDeviceHealth(status);
  const online = health.state === "online";
  const dotClass = online
    ? "bg-emerald-500"
    : health.state === "stale"
    ? "bg-amber-500"
    : "bg-red-500";

  return (
    <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">EcoBin</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Smart Waste Management System
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden="true" />
            <span>Device {health.label}</span>
            {online ? <Wifi className="h-4 w-4 text-emerald-500" /> : <WifiOff className="h-4 w-4 text-slate-400" />}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Last update: {lastUpdated ? timeAgo(lastUpdated) : "—"}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Activity className="h-3.5 w-3.5" />
          UID: <span className="font-mono">{import.meta.env.VITE_DEVICE_UID || "not configured"}</span>
        </span>
        {health.source === "online-flag" && (
          <span className="italic">Note: no lastSeen timestamp from device yet</span>
        )}
      </div>
    </header>
  );
}
