/**
 * Battery helpers. The EcoBin firmware currently does not publish battery
 * data — these support optional status fields:
 *   status.batteryVoltage  (e.g. 3.7 = volts)
 *   status.batteryPercent  (e.g. 64)
 * When absent, the UI shows N/A instead of crashing.
 */

/** Typical 1-cell Li-ion voltage → rough percentage. */
export function voltageToPercent(voltage) {
  const v = Number(voltage);
  if (Number.isNaN(v)) return null;
  // 3.2V ≈ empty, 4.2V ≈ full
  const pct = ((v - 3.2) / (4.2 - 3.2)) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}

export function batteryLabel(percent) {
  if (percent == null) return "N/A";
  if (percent >= 80) return "Good";
  if (percent >= 40) return "Moderate";
  if (percent >= 15) return "Low";
  return "Critical";
}

/** Prefer firmware-provided percent; fall back to voltage estimate. */
export function resolveBatteryPercent(status) {
  if (status?.batteryPercent != null && !Number.isNaN(Number(status.batteryPercent))) {
    return Math.min(100, Math.max(0, Math.round(Number(status.batteryPercent))));
  }
  if (status?.batteryVoltage != null) {
    return voltageToPercent(status.batteryVoltage);
  }
  return null;
}
