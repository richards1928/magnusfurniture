import type { ComponentInstance, Vec3 } from '../types';

export interface SnapAnchor {
  id: string;
  position: Vec3;
  type: string; // e.g., 'leg-position', 'under-top'
  parentId: string;
}

export const MAGNETIC_RADIUS = 15; // cm

/**
 * Given a list of placed components, calculate all exposed snap anchors.
 * For example, a Table Top exposes 4 leg anchor points and drawer anchor points.
 */
export function calculateAvailableAnchors(components: ComponentInstance[]): SnapAnchor[] {
  const anchors: SnapAnchor[] = [];

  components.forEach(comp => {
    if (comp.definitionId === 'top-standard') {
      const { width, depth, height } = comp.dimensions;
      const { x, y, z } = comp.position;

      // Leg anchors (inset slightly from the corners)
      const insetX = 5;
      const insetZ = 5;
      
      const bottomY = y - (height / 2); // Bottom surface of the top

      anchors.push({
        id: `${comp.instanceId}-leg-fl`,
        parentId: comp.instanceId,
        type: 'leg-position',
        position: { x: x - (width / 2) + insetX, y: bottomY, z: z + (depth / 2) - insetZ }
      });
      anchors.push({
        id: `${comp.instanceId}-leg-fr`,
        parentId: comp.instanceId,
        type: 'leg-position',
        position: { x: x + (width / 2) - insetX, y: bottomY, z: z + (depth / 2) - insetZ }
      });
      anchors.push({
        id: `${comp.instanceId}-leg-bl`,
        parentId: comp.instanceId,
        type: 'leg-position',
        position: { x: x - (width / 2) + insetX, y: bottomY, z: z - (depth / 2) + insetZ }
      });
      anchors.push({
        id: `${comp.instanceId}-leg-br`,
        parentId: comp.instanceId,
        type: 'leg-position',
        position: { x: x + (width / 2) - insetX, y: bottomY, z: z - (depth / 2) + insetZ }
      });

      // Drawer anchors (e.g. left side and right side under desk)
      const drawerInsetX = 25;
      anchors.push({
        id: `${comp.instanceId}-drawer-l`,
        parentId: comp.instanceId,
        type: 'under-top',
        position: { x: x - (width / 2) + drawerInsetX, y: bottomY, z: z }
      });
      anchors.push({
        id: `${comp.instanceId}-drawer-r`,
        parentId: comp.instanceId,
        type: 'under-top',
        position: { x: x + (width / 2) - drawerInsetX, y: bottomY, z: z }
      });
    }

    if (comp.definitionId === 'drawer-standard') {
      const { y } = comp.position;
      const bottomY = y - (comp.dimensions.height / 2);
      anchors.push({
        id: `${comp.instanceId}-shelf-under`,
        parentId: comp.instanceId,
        type: 'under-top',
        position: { x: comp.position.x, y: bottomY, z: comp.position.z }
      });
    }
  });

  return anchors;
}

/**
 * Calculates distance between two points
 */
function distance(p1: Vec3, p2: Vec3): number {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
}

/**
 * Evaluates the dragging position against available anchors.
 * Returns the snapped position and snap data if within radius.
 */
export function applyMagneticSnap(
  draggedComponent: ComponentInstance,
  currentPos: Vec3,
  allComponents: ComponentInstance[],
  definitionSnapPositions: string[]
): { snappedPos: Vec3, parentId?: string, snapType?: string } {
  
  // Don't snap to itself
  const otherComponents = allComponents.filter(c => c.instanceId !== draggedComponent.instanceId);
  const availableAnchors = calculateAvailableAnchors(otherComponents);

  // Filter anchors that match what this component is looking for
  const validAnchors = availableAnchors.filter(anchor => definitionSnapPositions.includes(anchor.type));

  let closestAnchor: SnapAnchor | null = null;
  let minDistance = Infinity;

  // We check distance from the "top center" of the leg or drawer to the anchor point
  const dragAnchor = { ...currentPos };
  if (draggedComponent.definitionId.startsWith('leg')) {
    // Legs attach at their top center
    dragAnchor.y = currentPos.y + (draggedComponent.dimensions.height / 2);
  } else if (draggedComponent.definitionId.includes('drawer') || draggedComponent.definitionId.includes('shelf')) {
    // Drawers attach at their top center
    dragAnchor.y = currentPos.y + (draggedComponent.dimensions.height / 2);
  }

  for (const anchor of validAnchors) {
    const dist = distance(dragAnchor, anchor.position);
    if (dist < minDistance && dist <= MAGNETIC_RADIUS) {
      minDistance = dist;
      closestAnchor = anchor;
    }
  }

  if (closestAnchor) {
    // We found a snap point. Adjust the currentPos so the dragAnchor aligns perfectly with the closestAnchor.
    let finalY = closestAnchor.position.y;
    if (draggedComponent.definitionId.startsWith('leg') || draggedComponent.definitionId.includes('drawer') || draggedComponent.definitionId.includes('shelf')) {
      finalY = closestAnchor.position.y - (draggedComponent.dimensions.height / 2);
    }
    
    return {
      snappedPos: { x: closestAnchor.position.x, y: finalY, z: closestAnchor.position.z },
      parentId: closestAnchor.parentId,
      snapType: closestAnchor.type
    };
  }

  return { snappedPos: currentPos };
}
