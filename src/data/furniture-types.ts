/* ============================================================
   Data — Furniture Type Definitions
   All supported furniture categories
   ============================================================ */

import type { FurnitureType } from '@/types';

export const furnitureTypes: FurnitureType[] = [
  {
    id: 'study-table',
    name: 'Study Table',
    description: 'Design a personalized study desk with drawers, shelves, and cable management',
    icon: '📚',
    defaultDimensions: { width: 120, height: 75, depth: 60 },
    componentCategories: [
      {
        id: 'tops',
        name: 'Table Tops',
        components: [
          {
            id: 'top-standard',
            name: 'Standard Top',
            category: 'Table Tops',
            furnitureType: 'study-table',
            description: 'A standard rectangular table top.',
            geometryType: 'box',
            defaultDimensions: { width: 120, height: 3, depth: 60 },
            defaultMaterial: 'mdf',
            defaultColor: 'mdf-white',
            basePrice: 1500,
            weight: 15,
            snapTargets: [], // Tops don't snap to things, things snap to them
            snapPositions: [],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      },
      {
        id: 'legs',
        name: 'Legs',
        components: [
          {
            id: 'leg-wooden',
            name: 'Wooden Leg',
            category: 'Legs',
            furnitureType: 'study-table',
            description: 'Classic wooden leg.',
            geometryType: 'cylinder',
            defaultDimensions: { width: 6, height: 72, depth: 6 },
            defaultMaterial: 'oak',
            defaultColor: 'oak-natural',
            basePrice: 600,
            weight: 1.5,
            snapTargets: ['top-standard'],
            snapPositions: ['leg-position'],
            maxCount: 4,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          },
          {
            id: 'leg-steel',
            name: 'Steel Leg',
            category: 'Legs',
            furnitureType: 'study-table',
            description: 'Sturdy steel leg.',
            geometryType: 'cylinder',
            defaultDimensions: { width: 4, height: 72, depth: 4 },
            defaultMaterial: 'steel',
            defaultColor: 'steel-black',
            basePrice: 400,
            weight: 2,
            snapTargets: ['top-standard'],
            snapPositions: ['leg-position'],
            maxCount: 4,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      },
      {
        id: 'storage',
        name: 'Storage',
        components: [
          {
            id: 'drawer-standard',
            name: 'Standard Drawer',
            category: 'Storage',
            furnitureType: 'study-table',
            description: 'Under-desk drawer unit.',
            geometryType: 'drawer-unit',
            defaultDimensions: { width: 40, height: 15, depth: 40 },
            defaultMaterial: 'mdf',
            defaultColor: 'mdf-white',
            basePrice: 1200,
            weight: 5,
            snapTargets: ['top-standard'],
            snapPositions: ['under-top'],
            maxCount: 2,
            incompatibleWith: [],
            isRequired: false,
            properties: []
          },
          {
            id: 'shelf-standard',
            name: 'Standard Shelf',
            category: 'Storage',
            furnitureType: 'study-table',
            description: 'Under-desk shelf.',
            geometryType: 'shelf',
            defaultDimensions: { width: 30, height: 2, depth: 40 },
            defaultMaterial: 'mdf',
            defaultColor: 'mdf-white',
            basePrice: 500,
            weight: 2,
            snapTargets: ['top-standard', 'drawer-standard'],
            snapPositions: ['under-top'],
            maxCount: 2,
            incompatibleWith: [],
            isRequired: false,
            properties: []
          }
        ]
      }
    ],
  },
  {
    id: 'office-table',
    name: 'Office Table',
    description: 'Build a professional workspace with ergonomic features and storage',
    icon: '💼',
    defaultDimensions: { width: 150, height: 75, depth: 70 },
    componentCategories: [],
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    description: 'Create the perfect dining table for your family gatherings',
    icon: '🍽️',
    defaultDimensions: { width: 180, height: 76, depth: 90 },
    componentCategories: [],
  },
  {
    id: 'coffee-table',
    name: 'Coffee Table',
    description: 'Design a stylish coffee table for your living space',
    icon: '☕',
    defaultDimensions: { width: 100, height: 45, depth: 60 },
    componentCategories: [],
  },
  {
    id: 'tv-unit',
    name: 'TV Unit',
    description: 'Build a modern entertainment center with cable management',
    icon: '📺',
    defaultDimensions: { width: 180, height: 55, depth: 45 },
    componentCategories: [],
  },
];

export function getFurnitureType(id: string): FurnitureType | undefined {
  return furnitureTypes.find(ft => ft.id === id);
}
