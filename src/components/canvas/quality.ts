export type Quality = "high" | "low";

export function getQuality(): Quality {
  if (typeof window === "undefined") return "low";
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mobile || reduce || coarse) return "low";
  if (memory !== undefined && memory <= 4) return "low";
  return "high";
}
