/* ============================================================
   Data — Pricing Rules & Configuration
   ============================================================ */

import type { PricingConfig } from '@/types';

export const pricingConfig: PricingConfig = {
  taxRate: 0.18,             // 18% GST
  laborRatePerHour: 350,     // ₹350/hour
  finishingCostPerSqCm: 0.15,
  assemblyBaseCost: 500,     // Base assembly charge
  currency: 'INR',
  currencySymbol: '₹',
};

/** Labor hours estimate per component type */
export const laborHoursEstimate: Record<string, number> = {
  'Table Tops': 2.0,
  'Legs': 1.5,
  'Drawers': 2.5,
  'Shelves': 1.0,
  'Cable Management': 0.5,
  'Keyboard Tray': 1.0,
  'CPU Holder': 0.5,
  'Monitor Stand': 0.8,
  'Wheels': 0.3,
  'Handles': 0.2,
  'Accessories': 1.0,
  'Base': 1.5,
  'Panels': 1.0,
  'default': 1.0,
};

/** Finishing cost multiplier per material finish type */
export const finishingMultiplier: Record<string, number> = {
  'natural': 1.0,
  'polished': 1.8,
  'matte': 1.2,
  'satin': 1.5,
  'lacquered': 2.0,
  'powder-coated': 1.6,
  'raw': 0.5,
};

/** Calculate surface area in cm² from dimensions */
export function calculateSurfaceArea(width: number, height: number, depth: number): number {
  return 2 * (width * depth + width * height + depth * height);
}

/** Format price in INR */
export function formatPrice(amount: number): string {
  return `${pricingConfig.currencySymbol}${amount.toLocaleString('en-IN', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  })}`;
}
