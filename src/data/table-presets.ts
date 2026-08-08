/* ============================================================
   Data — Table Style Presets / Templates
   1-Click pre-configured designs for all table types
   ============================================================ */

export interface TablePreset {
  id: string;
  name: string;
  category: string;
  furnitureType: string;
  description: string;
  icon: string;
  price: number;
  components: Array<{
    definitionId: string;
    name: string;
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number; depth: number };
    material: string;
    color: string;
  }>;
}

export const tablePresets: TablePreset[] = [
  {
    id: 'executive-walnut',
    name: 'Executive Walnut Suite',
    category: 'Executive Desk',
    furnitureType: 'office-table',
    description: 'Luxury walnut executive top with solid modesty panels and mobile 3-drawer pedestal.',
    icon: '💼',
    price: 11700,
    components: [
      {
        definitionId: 'top-executive',
        name: 'Executive Top with Cable Duct',
        position: { x: 0, y: 72, z: 0 },
        dimensions: { width: 160, height: 4, depth: 80 },
        material: 'walnut',
        color: 'walnut-natural',
      },
      {
        definitionId: 'leg-executive-wood',
        name: 'Walnut Panel Leg (Left)',
        position: { x: -70, y: 35.5, z: 0 },
        dimensions: { width: 4, height: 71, depth: 70 },
        material: 'walnut',
        color: 'walnut-natural',
      },
      {
        definitionId: 'leg-executive-wood',
        name: 'Walnut Panel Leg (Right)',
        position: { x: 70, y: 35.5, z: 0 },
        dimensions: { width: 4, height: 71, depth: 70 },
        material: 'walnut',
        color: 'walnut-natural',
      },
      {
        definitionId: 'pedestal-3drawer',
        name: 'Mobile 3-Drawer Pedestal',
        position: { x: 45, y: 30, z: 10 },
        dimensions: { width: 40, height: 60, depth: 50 },
        material: 'steel',
        color: 'steel-black',
      },
      {
        definitionId: 'divider-acoustic',
        name: 'Acoustic Privacy Panel',
        position: { x: 0, y: 91.5, z: -38 },
        dimensions: { width: 150, height: 35, depth: 2 },
        material: 'mdf',
        color: 'mdf-grey',
      }
    ]
  },
  {
    id: 'industrial-steel-oak',
    name: 'Industrial Steel & Oak Desk',
    category: 'Workstation',
    furnitureType: 'office-table',
    description: 'Modern open-plan workstation with O-loop matte black steel frames and natural oak top.',
    icon: '⚙️',
    price: 6400,
    components: [
      {
        definitionId: 'top-standard-office',
        name: 'Standard Workstation Top',
        position: { x: 0, y: 72, z: 0 },
        dimensions: { width: 140, height: 3, depth: 70 },
        material: 'oak',
        color: 'oak-natural',
      },
      {
        definitionId: 'leg-steel-loop',
        name: 'Steel Loop Leg (Left)',
        position: { x: -62, y: 35.5, z: 0 },
        dimensions: { width: 5, height: 71, depth: 65 },
        material: 'steel',
        color: 'steel-black',
      },
      {
        definitionId: 'leg-steel-loop',
        name: 'Steel Loop Leg (Right)',
        position: { x: 62, y: 35.5, z: 0 },
        dimensions: { width: 5, height: 71, depth: 65 },
        material: 'steel',
        color: 'steel-black',
      }
    ]
  },
  {
    id: 'modern-glass-coffee',
    name: 'Minimalist Glass Coffee Table',
    category: 'Coffee Table',
    furnitureType: 'coffee-table',
    description: 'Ultra-clear tempered safety glass coffee table with black hairpin metal legs.',
    icon: '☕',
    price: 3600,
    components: [
      {
        definitionId: 'top-coffee-glass',
        name: 'Tempered Glass Top',
        position: { x: 0, y: 43, z: 0 },
        dimensions: { width: 100, height: 2, depth: 60 },
        material: 'tempered-glass',
        color: 'glass-clear',
      },
      {
        definitionId: 'leg-hairpin',
        name: 'Hairpin Leg FL',
        position: { x: -42, y: 21, z: -22 },
        dimensions: { width: 4, height: 42, depth: 4 },
        material: 'steel',
        color: 'steel-black',
      },
      {
        definitionId: 'leg-hairpin',
        name: 'Hairpin Leg FR',
        position: { x: 42, y: 21, z: -22 },
        dimensions: { width: 4, height: 42, depth: 4 },
        material: 'steel',
        color: 'steel-black',
      },
      {
        definitionId: 'leg-hairpin',
        name: 'Hairpin Leg BL',
        position: { x: -42, y: 21, z: 22 },
        dimensions: { width: 4, height: 42, depth: 4 },
        material: 'steel',
        color: 'steel-black',
      },
      {
        definitionId: 'leg-hairpin',
        name: 'Hairpin Leg BR',
        position: { x: 42, y: 21, z: 22 },
        dimensions: { width: 4, height: 42, depth: 4 },
        material: 'steel',
        color: 'steel-black',
      }
    ]
  },
  {
    id: 'teak-dining-table',
    name: 'Solid Teak Dining Table',
    category: 'Dining Table',
    furnitureType: 'dining-table',
    description: 'Heavy solid teakwood dining table built for 6-8 family seating.',
    icon: '🍽️',
    price: 12900,
    components: [
      {
        definitionId: 'top-solid-wood',
        name: 'Solid Teak Dining Top',
        position: { x: 0, y: 74, z: 0 },
        dimensions: { width: 180, height: 4, depth: 90 },
        material: 'teak',
        color: 'teak-natural',
      },
      {
        definitionId: 'leg-wooden-heavy',
        name: 'Solid Teak Leg FL',
        position: { x: -80, y: 36, z: -35 },
        dimensions: { width: 8, height: 72, depth: 8 },
        material: 'teak',
        color: 'teak-natural',
      },
      {
        definitionId: 'leg-wooden-heavy',
        name: 'Solid Teak Leg FR',
        position: { x: 80, y: 36, z: -35 },
        dimensions: { width: 8, height: 72, depth: 8 },
        material: 'teak',
        color: 'teak-natural',
      },
      {
        definitionId: 'leg-wooden-heavy',
        name: 'Solid Teak Leg BL',
        position: { x: -80, y: 36, z: 35 },
        dimensions: { width: 8, height: 72, depth: 8 },
        material: 'teak',
        color: 'teak-natural',
      },
      {
        definitionId: 'leg-wooden-heavy',
        name: 'Solid Teak Leg BR',
        position: { x: 80, y: 36, z: 35 },
        dimensions: { width: 8, height: 72, depth: 8 },
        material: 'teak',
        color: 'teak-natural',
      }
    ]
  },
  {
    id: 'compact-study-desk',
    name: 'Compact Ergonomic Study Desk',
    category: 'Study Desk',
    furnitureType: 'study-table',
    description: 'Space-saving study desk with under-desk drawer and natural oak legs.',
    icon: '📚',
    price: 5100,
    components: [
      {
        definitionId: 'top-standard',
        name: 'Standard Study Top',
        position: { x: 0, y: 72, z: 0 },
        dimensions: { width: 120, height: 3, depth: 60 },
        material: 'mdf',
        color: 'mdf-white',
      },
      {
        definitionId: 'leg-wooden',
        name: 'Oak Leg FL',
        position: { x: -52, y: 36, z: -22 },
        dimensions: { width: 6, height: 72, depth: 6 },
        material: 'oak',
        color: 'oak-natural',
      },
      {
        definitionId: 'leg-wooden',
        name: 'Oak Leg FR',
        position: { x: 52, y: 36, z: -22 },
        dimensions: { width: 6, height: 72, depth: 6 },
        material: 'oak',
        color: 'oak-natural',
      },
      {
        definitionId: 'leg-wooden',
        name: 'Oak Leg BL',
        position: { x: -52, y: 36, z: 22 },
        dimensions: { width: 6, height: 72, depth: 6 },
        material: 'oak',
        color: 'oak-natural',
      },
      {
        definitionId: 'leg-wooden',
        name: 'Oak Leg BR',
        position: { x: 52, y: 36, z: 22 },
        dimensions: { width: 6, height: 72, depth: 6 },
        material: 'oak',
        color: 'oak-natural',
      },
      {
        definitionId: 'drawer-standard',
        name: 'Under-Desk Storage Drawer',
        position: { x: 30, y: 61, z: 0 },
        dimensions: { width: 40, height: 15, depth: 40 },
        material: 'mdf',
        color: 'mdf-white',
      }
    ]
  }
];

export function applyPreset(presetId: string, store: any, commitHistoryFn: any, validateFn: any) {
  const preset = tablePresets.find(p => p.id === presetId);
  if (!preset) return;

  commitHistoryFn();
  store.selectedFurnitureType = preset.furnitureType;
  store.components = [];

  preset.components.forEach(comp => {
    store.components.push({
      instanceId: crypto.randomUUID(),
      definitionId: comp.definitionId,
      furnitureType: preset.furnitureType,
      name: comp.name,
      position: comp.position,
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      dimensions: comp.dimensions,
      material: comp.material,
      color: comp.color,
      properties: {},
      isSelected: false,
      isHovered: false,
      isValid: true,
      validationErrors: [],
      price: 1000,
      addedAt: Date.now()
    });
  });

  if (store.components.length > 0) {
    store.components[0].isSelected = true;
    store.selectedComponentIds = [store.components[0].instanceId];
  }

  validateFn(store.components);
}
