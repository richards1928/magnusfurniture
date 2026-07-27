/* ============================================================
   Data — Material Definitions
   All available materials with properties and cost data
   ============================================================ */

import type { Material } from '@/types';

export const materials: Material[] = [
  // --- Wood ---
  {
    id: 'teak',
    name: 'Teak Wood',
    category: 'wood',
    color: '#8B6914',
    textureType: 'grain',
    finish: 'natural',
    density: 650,
    costPerUnit: 3.5,
    durabilityRating: 9,
    weight: 6.5,
    description: 'Premium tropical hardwood, naturally resistant to decay',
    colorVariants: [
      { id: 'teak-natural', name: 'Natural Teak', hex: '#8B6914', priceModifier: 0 },
      { id: 'teak-golden', name: 'Golden Teak', hex: '#C49B30', priceModifier: 200 },
      { id: 'teak-dark', name: 'Dark Teak', hex: '#5C4A1F', priceModifier: 300 },
    ],
  },
  {
    id: 'oak',
    name: 'Oak Wood',
    category: 'wood',
    color: '#B8860B',
    textureType: 'grain',
    finish: 'natural',
    density: 700,
    costPerUnit: 3.0,
    durabilityRating: 8,
    weight: 7.0,
    description: 'Classic hardwood with beautiful grain patterns',
    colorVariants: [
      { id: 'oak-natural', name: 'Natural Oak', hex: '#B8860B', priceModifier: 0 },
      { id: 'oak-white', name: 'White Oak', hex: '#D4C5A0', priceModifier: 150 },
      { id: 'oak-red', name: 'Red Oak', hex: '#8B4513', priceModifier: 100 },
    ],
  },
  {
    id: 'walnut',
    name: 'Walnut Wood',
    category: 'wood',
    color: '#5C4033',
    textureType: 'grain',
    finish: 'polished',
    density: 640,
    costPerUnit: 4.0,
    durabilityRating: 8,
    weight: 6.4,
    description: 'Rich dark wood with luxurious finish',
    colorVariants: [
      { id: 'walnut-natural', name: 'Natural Walnut', hex: '#5C4033', priceModifier: 0 },
      { id: 'walnut-dark', name: 'Dark Walnut', hex: '#3E2723', priceModifier: 200 },
      { id: 'walnut-light', name: 'Light Walnut', hex: '#8B7355', priceModifier: 100 },
    ],
  },
  // --- Engineered ---
  {
    id: 'mdf',
    name: 'MDF Board',
    category: 'engineered',
    color: '#C4A882',
    textureType: 'smooth',
    finish: 'matte',
    density: 750,
    costPerUnit: 1.2,
    durabilityRating: 5,
    weight: 7.5,
    description: 'Medium density fiberboard — affordable and versatile',
    colorVariants: [
      { id: 'mdf-white', name: 'White', hex: '#F5F5F5', priceModifier: 0 },
      { id: 'mdf-black', name: 'Black', hex: '#2C2C2C', priceModifier: 50 },
      { id: 'mdf-brown', name: 'Brown', hex: '#6B4C3B', priceModifier: 30 },
      { id: 'mdf-grey', name: 'Grey', hex: '#808080', priceModifier: 30 },
      { id: 'mdf-walnut', name: 'Walnut Laminate', hex: '#5C4033', priceModifier: 100 },
    ],
  },
  {
    id: 'plywood',
    name: 'Plywood',
    category: 'engineered',
    color: '#D2B48C',
    textureType: 'grain',
    finish: 'natural',
    density: 600,
    costPerUnit: 1.8,
    durabilityRating: 7,
    weight: 6.0,
    description: 'Layered wood sheets — strong and cost-effective',
    colorVariants: [
      { id: 'ply-natural', name: 'Natural', hex: '#D2B48C', priceModifier: 0 },
      { id: 'ply-birch', name: 'Birch', hex: '#E8D5B7', priceModifier: 80 },
      { id: 'ply-marine', name: 'Marine Grade', hex: '#C4A882', priceModifier: 200 },
    ],
  },
  // --- Metal ---
  {
    id: 'steel',
    name: 'Steel',
    category: 'metal',
    color: '#808080',
    textureType: 'brushed',
    finish: 'powder-coated',
    density: 7800,
    costPerUnit: 2.5,
    durabilityRating: 9,
    weight: 78.0,
    description: 'Industrial-grade steel with powder-coated finish',
    colorVariants: [
      { id: 'steel-black', name: 'Matte Black', hex: '#1a1a1a', priceModifier: 0 },
      { id: 'steel-silver', name: 'Silver', hex: '#C0C0C0', priceModifier: 50 },
      { id: 'steel-white', name: 'White', hex: '#F0F0F0', priceModifier: 50 },
    ],
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    category: 'metal',
    color: '#A8A8A8',
    textureType: 'brushed',
    finish: 'satin',
    density: 2700,
    costPerUnit: 3.2,
    durabilityRating: 7,
    weight: 27.0,
    description: 'Lightweight, corrosion-resistant aluminum',
    colorVariants: [
      { id: 'alu-silver', name: 'Silver', hex: '#C0C0C0', priceModifier: 0 },
      { id: 'alu-anodized', name: 'Anodized Black', hex: '#333333', priceModifier: 100 },
    ],
  },
  // --- Glass ---
  {
    id: 'tempered-glass',
    name: 'Tempered Glass',
    category: 'glass',
    color: '#E8F4FD',
    textureType: 'glossy',
    finish: 'polished',
    density: 2500,
    costPerUnit: 4.5,
    durabilityRating: 6,
    weight: 25.0,
    description: 'Safety glass, 4x stronger than regular glass',
    colorVariants: [
      { id: 'glass-clear', name: 'Clear', hex: '#E8F4FD', priceModifier: 0 },
      { id: 'glass-frosted', name: 'Frosted', hex: '#F0F0F0', priceModifier: 200 },
      { id: 'glass-tinted', name: 'Smoke Tinted', hex: '#696969', priceModifier: 300 },
    ],
  },
];

export function getMaterial(id: string): Material | undefined {
  return materials.find(m => m.id === id);
}

export function getMaterialsByCategory(category: string): Material[] {
  return materials.filter(m => m.category === category);
}
