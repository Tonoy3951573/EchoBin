/** Map RSSI dBm to a human-readable quality label. */
export function wifiQuality(rssi) {
  if (rssi == null || Number.isNaN(Number(rssi))) return "N/A";
  const r = Number(rssi);
  if (r >= -55) return "Excellent";
  if (r >= -65) return "Good";
  if (r >= -75) return "Fair";
  return "Weak";
}

export function formatRssi(rssi) {
  if (rssi == null || Number.isNaN(Number(rssi))) return "N/A";
  return `${rssi} dBm`;
}
