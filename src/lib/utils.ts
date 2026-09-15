import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseNumber(raw: string): number | null {
  const cleaned = raw.trim().replace(/\s/g, "").replace(",", ".");
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : null;
}

export function nearlyEqual(a: number, b: number, tolerance = 0.02) {
  if (b === 0) return Math.abs(a) <= tolerance;
  return Math.abs(a - b) / Math.abs(b) <= tolerance || Math.abs(a - b) <= 0.51;
}
