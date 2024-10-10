import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatDateToInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);  // Outputs YYYY-MM-DDTHH:MM
}


