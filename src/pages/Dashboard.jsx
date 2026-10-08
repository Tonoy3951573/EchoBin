import { useEffect, useState } from "react";
import Header from "../components/Header";
import AlertBanner from "../components/AlertBanner";
import DeviceStatus from "../components/DeviceStatus";
import FillLevelCard from "../components/FillLevelCard";
import LastDetection from "../components/LastDetection";
import FillLevelChart from "../components/FillLevelChart";
import EventAnalytics from "../components/EventAnalytics";
import WasteEvents from "../components/WasteEvents";
import { useDeviceStatus } from "../hooks/useDeviceStatus";
import { useWasteEvents } from "../hooks/useWasteEvents";

const THEME_KEY = "ecobin-theme";

export default function Dashboard() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === "dark" : true; // dark is the default
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  const { status, lastUpdated, loading: statusLoading, error: statusError } = useDeviceStatus();
  const { events, allEvents, loading: eventsLoading, error: eventsError } = useWasteEvents();

  const landfillFull = status?.landfill?.full === true;
  const recyclableFull = status?.recyclable?.full === true;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 p-4 sm:p-6">
      <Header status={status} lastUpdated={lastUpdated} dark={dark} onToggleTheme={() => setDark((d) => !d)} />

      <AlertBanner landfillFull={landfillFull} recyclableFull={recyclableFull} />

      {statusError && (
        <StateCard title="Unable to connect to Firebase" detail={statusError.message} tone="error" />
      )}

      {statusLoading && !statusError && (
        <StateCard title="Loading EcoBin…" detail="Connecting to Firebase…" />
      )}

      {!statusLoading && !statusError && status == null && (
        <StateCard title="Waiting for device data…" detail="No device data available. Waiting for EcoBin..." />
      )}

      {!statusLoading && !statusError && status != null && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DeviceStatus status={status} />
            <FillLevelCard title="Landfill" chamber={status.landfill} />
            <FillLevelCard title="Recyclable" chamber={status.recyclable} />
            <LastDetection status={status} latestEvent={events[0]} />
          </div>

          <EventAnalytics allEvents={allEvents} />
          <FillLevelChart events={allEvents} />
          <WasteEvents events={events} loading={eventsLoading} error={eventsError} />
        </>
      )}

      {eventsError && status != null && (
        <p className="text-sm text-red-600 dark:text-red-400">Unable to load waste events.</p>
      )}
    </main>
  );
}

function StateCard({ title, detail, tone }) {
  return (
    <div
      className={`rounded-xl border p-8 text-center shadow-sm ${
        tone === "error"
          ? "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
      role="status"
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-80">{detail}</p>
    </div>
  );
}
