/* ============================================================
   TypeScript Types — Pricing System
   ============================================================ */

export interface PriceBreakdown {
  materialCost: number;
  hardwareCost: number;
  laborCost: number;
  finishingCost: number;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  perComponent: ComponentPriceLine[];
}

export interface ComponentPriceLine {
  instanceId: string;
  componentName: string;
  materialCost: number;
  hardwareCost: number;
  laborCost: number;
  finishingCost: number;
  total: number;
}

export interface PriceDelta {
  amount: number;
  direction: 'up' | 'down' | 'none';
  reason: string;
}

export interface PricingConfig {
  taxRate: number;              // 0.18 = 18% GST
  laborRatePerHour: number;    // ₹
  finishingCostPerSqCm: number;
  assemblyBaseCost: number;
  currency: string;
  currencySymbol: string;
}
