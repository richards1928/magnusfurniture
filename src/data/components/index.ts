/* ============================================================
   Data — Component Index
   Central registry of all furniture component libraries
   ============================================================ */

import type { ComponentDefinition, FurnitureTypeId } from '@/types';
import { studyTableComponents } from './study-table';
import { officeTableComponents } from './office-table';
import { diningTableComponents } from './dining-table';
import { coffeeTableComponents } from './coffee-table';
import { tvUnitComponents } from './tv-unit';

/** Master registry: furniture type → component definitions */
const componentRegistry: Record<FurnitureTypeId, ComponentDefinition[]> = {
  'study-table': studyTableComponents,
  'office-table': officeTableComponents,
  'dining-table': diningTableComponents,
  'coffee-table': coffeeTableComponents,
  'tv-unit': tvUnitComponents,
};

/** Get all components for a furniture type */
export function getComponentsForType(furnitureType: FurnitureTypeId): ComponentDefinition[] {
  return componentRegistry[furnitureType] || [];
}

/** Get a specific component definition by ID */
export function getComponentDefinition(id: string): ComponentDefinition | undefined {
  for (const components of Object.values(componentRegistry)) {
    const found = components.find(c => c.id === id);
    if (found) return found;
  }
  return undefined;
}

/** Get unique categories for a furniture type */
export function getCategoriesForType(furnitureType: FurnitureTypeId): string[] {
  const components = componentRegistry[furnitureType] || [];
  const categories = new Set(components.map(c => c.category));
  return Array.from(categories);
}

/** Get components in a category for a furniture type */
export function getComponentsByCategory(
  furnitureType: FurnitureTypeId,
  category: string
): ComponentDefinition[] {
  return (componentRegistry[furnitureType] || []).filter(c => c.category === category);
}

/** Check if two components are compatible */
export function areComponentsCompatible(
  existingComponents: ComponentDefinition[],
  newComponent: ComponentDefinition
): { compatible: boolean; reason?: string } {
  for (const existing of existingComponents) {
    if (newComponent.incompatibleWith.includes(existing.id)) {
      return {
        compatible: false,
        reason: `"${newComponent.name}" is incompatible with "${existing.name}"`,
      };
    }
    if (existing.incompatibleWith.includes(newComponent.id)) {
      return {
        compatible: false,
        reason: `"${existing.name}" is incompatible with "${newComponent.name}"`,
      };
    }
  }
  return { compatible: true };
}

export { studyTableComponents } from './study-table';
export { officeTableComponents } from './office-table';
export { diningTableComponents } from './dining-table';
export { coffeeTableComponents } from './coffee-table';
export { tvUnitComponents } from './tv-unit';
