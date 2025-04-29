import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mmToPx(mm: number, dpi = 72): number {
  return (mm / 25.4) * dpi
}