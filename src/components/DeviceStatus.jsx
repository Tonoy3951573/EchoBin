import { Server, Wifi, Cpu, Clock, Globe, BatteryCharging } from "lucide-react";
import { formatUptime } from "../utils/formatUptime";
import { wifiQuality, formatRssi } from "../utils/wifi";
import { getDeviceHealth } from "../utils/deviceHealth";
import { resolveBatteryPercent, batteryLabel } from "../utils/battery";

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="text-sm font-medium">{value ?? "N/A"}</span>
    </div>
  );
}

export default function DeviceStatus({ status }) {
  const health = getDeviceHealth(status);
  const rssi = status?.wifiRSSI;
  const batteryPct = resolveBatteryPercent(status);
  const batteryValue =
    batteryPct != null
      ? `${batteryPct}% · ${batteryLabel(batteryPct)}${
          status?.batteryVoltage != null ? ` (${Number(status.batteryVoltage).toFixed(2)} V)` : ""
        }`
      : "N/A";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Device Status
      </h2>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        <Row icon={Server} label="Status" value={health.label} />
        <Row icon={Globe} label="IP Address" value={status?.ip} />
        <Row
          icon={Wifi}
          label="Wi-Fi"
          value={rssi != null ? `${formatRssi(rssi)} · ${wifiQuality(rssi)}` : "N/A"}
        />
        <Row icon={Cpu} label="Firmware" value={status?.firmware} />
        <Row icon={Clock} label="Uptime" value={formatUptime(status?.uptimeSeconds)} />
        <Row icon={BatteryCharging} label="Battery" value={batteryValue} />
      </div>
    </section>
  );
}
