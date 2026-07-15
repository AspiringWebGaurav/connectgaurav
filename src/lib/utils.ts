import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes cleanly.
 * This resolves conflicts (e.g., if you pass 'px-4' and 'px-2', it keeps 'px-2').
 * Perfect for building highly reusable UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
