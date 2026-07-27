/* ============================================================
   TypeScript Types — Material System
   ============================================================ */

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  color: string;          // hex default color
  textureType: TextureType;
  finish: FinishType;
  density: number;        // kg/m³
  costPerUnit: number;    // ₹ per cm²
  durabilityRating: number; // 1-10
  weight: number;         // kg/m² 
  description: string;
  colorVariants: ColorVariant[];
}

export type MaterialCategory = 
  | 'wood'
  | 'metal'
  | 'engineered'
  | 'glass'
  | 'fabric'
  | 'stone';

export type TextureType = 
  | 'smooth'
  | 'grain'
  | 'brushed'
  | 'matte'
  | 'glossy'
  | 'textured';

export type FinishType = 
  | 'natural'
  | 'polished'
  | 'matte'
  | 'satin'
  | 'lacquered'
  | 'powder-coated'
  | 'raw';

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  priceModifier: number; // ₹
}

/** Material application — what material + color is applied to a component */
export interface MaterialApplication {
  materialId: string;
  colorVariantId: string;
}
