import type { ComponentInstance } from '../types';
import * as THREE from 'three';

/**
 * Checks all components in the scene for physical and logical violations.
 * Updates the `isValid` flag and `validationErrors` array on each component.
 * Mutates the components array.
 */
export function validateScene(components: ComponentInstance[]): void {
  // Build AABBs for intersection testing
  const boxes = components.map(c => {
    const box = new THREE.Box3();
    const halfW = c.dimensions.width / 2;
    const halfH = c.dimensions.height / 2;
    const halfD = c.dimensions.depth / 2;
    
    box.min.set(c.position.x - halfW, c.position.y - halfH, c.position.z - halfD);
    box.max.set(c.position.x + halfW, c.position.y + halfH, c.position.z + halfD);
    
    // Shrink box very slightly to allow touching (snapping)
    const tolerance = 0.5;
    box.min.addScalar(tolerance);
    box.max.subScalar(tolerance);

    return { id: c.instanceId, box, component: c };
  });

  components.forEach(comp => {
    comp.isValid = true;
    comp.validationErrors = [];

    // 1. Floating Check
    const isTableTop = comp.definitionId.includes('top');
    const isLeg = comp.definitionId.includes('leg');
    const halfH = comp.dimensions.height / 2;
    const isTouchingFloor = Math.abs((comp.position.y - halfH) - 0) < 1.0; // Floor is at Y=0
    
    if (isLeg && !isTouchingFloor) {
      comp.isValid = false;
      comp.validationErrors.push('Leg must touch the ground.');
    }

    if (!isTableTop && !comp.snapPoint && !isTouchingFloor) {
      comp.isValid = false;
      comp.validationErrors.push('Component is floating. Must be snapped to a table top or touch the floor.');
    }

    // 2. Intersection Check
    const myBoxData = boxes.find(b => b.id === comp.instanceId);
    if (myBoxData) {
      for (const other of boxes) {
        if (other.id !== comp.instanceId) {
          if (myBoxData.box.intersectsBox(other.box)) {
            comp.isValid = false;
            comp.validationErrors.push(`Overlaps with ${other.component.name}`);
          }
        }
      }
    }
  });
}
