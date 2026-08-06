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
    componentCategories: [
      {
        id: 'tops',
        name: 'Executive & Manager Tops',
        components: [
          {
            id: 'top-executive',
            name: 'Executive Top with Cable Duct',
            category: 'Table Tops',
            furnitureType: 'office-table',
            description: 'Large executive top with integrated cable pass-through.',
            geometryType: 'box',
            defaultDimensions: { width: 160, height: 4, depth: 80 },
            defaultMaterial: 'walnut',
            defaultColor: 'walnut-natural',
            basePrice: 4500,
            weight: 25,
            snapTargets: [],
            snapPositions: [],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          },
          {
            id: 'top-standard-office',
            name: 'Standard Workstation Top',
            category: 'Table Tops',
            furnitureType: 'office-table',
            description: 'Durable pre-laminated office top.',
            geometryType: 'box',
            defaultDimensions: { width: 140, height: 3, depth: 70 },
            defaultMaterial: 'mdf',
            defaultColor: 'mdf-white',
            basePrice: 2800,
            weight: 18,
            snapTargets: [],
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
        name: 'Frame & Legs',
        components: [
          {
            id: 'leg-steel-loop',
            name: 'O-Loop Steel Frame Leg',
            category: 'Legs',
            furnitureType: 'office-table',
            description: 'Heavy duty steel loop leg frame.',
            geometryType: 'cylinder',
            defaultDimensions: { width: 5, height: 71, depth: 5 },
            defaultMaterial: 'steel',
            defaultColor: 'steel-black',
            basePrice: 1200,
            weight: 4,
            snapTargets: ['top-executive', 'top-standard-office'],
            snapPositions: ['leg-position'],
            maxCount: 4,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          },
          {
            id: 'leg-executive-wood',
            name: 'Walnut Panel Leg',
            category: 'Legs',
            furnitureType: 'office-table',
            description: 'Solid wooden modesty panel leg.',
            geometryType: 'box',
            defaultDimensions: { width: 4, height: 71, depth: 70 },
            defaultMaterial: 'walnut',
            defaultColor: 'walnut-natural',
            basePrice: 2200,
            weight: 12,
            snapTargets: ['top-executive'],
            snapPositions: ['leg-position'],
            maxCount: 2,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      },
      {
        id: 'accessories',
        name: 'Dividers & Pedestals',
        components: [
          {
            id: 'divider-acoustic',
            name: 'Acoustic Privacy Panel',
            category: 'Accessories',
            furnitureType: 'office-table',
            description: 'Sound-absorbing fabric privacy screen.',
            geometryType: 'box',
            defaultDimensions: { width: 140, height: 35, depth: 2 },
            defaultMaterial: 'mdf',
            defaultColor: 'mdf-grey',
            basePrice: 1800,
            weight: 3,
            snapTargets: ['top-executive', 'top-standard-office'],
            snapPositions: ['on-top'],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: false,
            properties: []
          },
          {
            id: 'pedestal-3drawer',
            name: 'Mobile 3-Drawer Pedestal',
            category: 'Storage',
            furnitureType: 'office-table',
            description: 'Lockable mobile pedestal unit.',
            geometryType: 'drawer-unit',
            defaultDimensions: { width: 40, height: 60, depth: 50 },
            defaultMaterial: 'steel',
            defaultColor: 'steel-black',
            basePrice: 3200,
            weight: 15,
            snapTargets: ['top-executive', 'top-standard-office'],
            snapPositions: ['under-top'],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: false,
            properties: []
          }
        ]
      }
    ],
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    description: 'Create the perfect dining table for your family gatherings',
    icon: '🍽️',
    defaultDimensions: { width: 180, height: 76, depth: 90 },
    componentCategories: [
      {
        id: 'tops',
        name: 'Dining Tops',
        components: [
          {
            id: 'top-solid-wood',
            name: 'Solid Teak Dining Top',
            category: 'Table Tops',
            furnitureType: 'dining-table',
            description: 'Premium solid teakwood dining surface.',
            geometryType: 'box',
            defaultDimensions: { width: 180, height: 4, depth: 90 },
            defaultMaterial: 'teak',
            defaultColor: 'teak-natural',
            basePrice: 8500,
            weight: 35,
            snapTargets: [],
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
        name: 'Dining Legs',
        components: [
          {
            id: 'leg-wooden-heavy',
            name: 'Heavy Turned Wooden Leg',
            category: 'Legs',
            furnitureType: 'dining-table',
            description: 'Sturdy solid wood dining leg.',
            geometryType: 'cylinder',
            defaultDimensions: { width: 8, height: 72, depth: 8 },
            defaultMaterial: 'teak',
            defaultColor: 'teak-natural',
            basePrice: 1100,
            weight: 3,
            snapTargets: ['top-solid-wood'],
            snapPositions: ['leg-position'],
            maxCount: 4,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      }
    ],
  },
  {
    id: 'coffee-table',
    name: 'Coffee Table',
    description: 'Design a stylish coffee table for your living space',
    icon: '☕',
    defaultDimensions: { width: 100, height: 45, depth: 60 },
    componentCategories: [
      {
        id: 'tops',
        name: 'Coffee Tops',
        components: [
          {
            id: 'top-coffee-glass',
            name: 'Tempered Glass Top',
            category: 'Table Tops',
            furnitureType: 'coffee-table',
            description: 'Polished tempered safety glass surface.',
            geometryType: 'box',
            defaultDimensions: { width: 100, height: 2, depth: 60 },
            defaultMaterial: 'tempered-glass',
            defaultColor: 'glass-clear',
            basePrice: 2200,
            weight: 10,
            snapTargets: [],
            snapPositions: [],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          },
          {
            id: 'top-coffee-oak',
            name: 'Oak Wood Top',
            category: 'Table Tops',
            furnitureType: 'coffee-table',
            description: 'Natural oak wood coffee top.',
            geometryType: 'box',
            defaultDimensions: { width: 100, height: 3, depth: 60 },
            defaultMaterial: 'oak',
            defaultColor: 'oak-natural',
            basePrice: 1900,
            weight: 8,
            snapTargets: [],
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
        name: 'Coffee Legs',
        components: [
          {
            id: 'leg-hairpin',
            name: 'Metal Hairpin Leg',
            category: 'Legs',
            furnitureType: 'coffee-table',
            description: 'Sleek hairpin metal leg.',
            geometryType: 'cylinder',
            defaultDimensions: { width: 3, height: 42, depth: 3 },
            defaultMaterial: 'steel',
            defaultColor: 'steel-black',
            basePrice: 350,
            weight: 1,
            snapTargets: ['top-coffee-glass', 'top-coffee-oak'],
            snapPositions: ['leg-position'],
            maxCount: 4,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      }
    ],
  },
  {
    id: 'tv-unit',
    name: 'TV Unit',
    description: 'Build a modern entertainment center with cable management',
    icon: '📺',
    defaultDimensions: { width: 180, height: 55, depth: 45 },
    componentCategories: [
      {
        id: 'console',
        name: 'Main Console & Shelves',
        components: [
          {
            id: 'console-base',
            name: 'Media Console Base Unit',
            category: 'Console',
            furnitureType: 'tv-unit',
            description: 'Low-profile media console with cable routing.',
            geometryType: 'box',
            defaultDimensions: { width: 180, height: 45, depth: 45 },
            defaultMaterial: 'walnut',
            defaultColor: 'walnut-natural',
            basePrice: 6500,
            weight: 30,
            snapTargets: [],
            snapPositions: [],
            maxCount: 1,
            incompatibleWith: [],
            isRequired: true,
            properties: []
          }
        ]
      }
    ],
  },
];

export function getFurnitureType(id: string): FurnitureType | undefined {
  return furnitureTypes.find(ft => ft.id === id);
}
