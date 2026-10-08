/** The Edge Impulse model label is "recycleable"; the UI shows "Recyclable". */
export function wasteTypeLabel(type) {
  if (!type) return "Unknown";
  const t = String(type).toLowerCase();
  if (t === "landfill") return "Landfill";
  if (t === "recycleable" || t === "recyclable") return "Recyclable";
  return "Unknown";
}

/** Normalize any raw type string into a counting key. */
export function wasteTypeKey(type) {
  const t = String(type ?? "").toLowerCase();
  if (t === "landfill") return "landfill";
  if (t === "recycleable" || t === "recyclable") return "recyclable";
  return "unknown";
}
