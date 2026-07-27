import { proxy } from 'valtio';
import type { 
  DesignerState, 
  FurnitureTypeId, 
  ComponentInstance, 
  DesignerPhase,
  ComponentDefinition
} from '../types';
import { validateScene } from '../engine/validationEngine';

export const designerStore = proxy<DesignerState>({
  phase: 'selection',
  selectedFurnitureType: null,
  components: [],
  selectedComponentIds: [],
  hoveredComponentId: null,
  camera: {
    position: { x: 5, y: 5, z: 5 },
    target: { x: 0, y: 0, z: 0 },
    zoom: 1,
    preset: 'three-quarter'
  },
  viewMode: 'normal',
  lightingPreset: 'studio',
  showMeasurements: true,
  showGrid: true,
  autoRotate: false,
  explodedView: false,
  validationIssues: [],
  designHealth: 'healthy',
  dragState: null,
  designMeta: {
    id: crypto.randomUUID(),
    name: 'Untitled Design',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
  },
  budgetMode: {
    enabled: false,
    targetPrice: 0,
    currentTotal: 0
  },
  history: {
    past: [],
    future: []
  }
});

// Helper to push history state
export const commitHistory = () => {
  // Deep clone components to break references
  const snapshot = JSON.parse(JSON.stringify(designerStore.components));
  designerStore.history.past.push(snapshot);
  designerStore.history.future = []; // Clear redo stack on new action
};

// Actions
export const setPhase = (phase: DesignerPhase) => {
  designerStore.phase = phase;
};

export const selectFurniture = (id: FurnitureTypeId) => {
  designerStore.selectedFurnitureType = id;
  designerStore.phase = 'building';
  designerStore.components = [];
  designerStore.selectedComponentIds = [];
};

export const addComponent = (definition: ComponentDefinition) => {
  commitHistory();
  const instance: ComponentInstance = {
    instanceId: crypto.randomUUID(),
    definitionId: definition.id,
    furnitureType: definition.furnitureType,
    name: definition.name,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    dimensions: { ...definition.defaultDimensions },
    material: definition.defaultMaterial,
    color: definition.defaultColor,
    properties: definition.properties.reduce((acc, prop) => ({
      ...acc,
      [prop.key]: prop.defaultValue
    }), {}),
    isSelected: true,
    isHovered: false,
    isValid: true,
    validationErrors: [],
    price: definition.basePrice,
    addedAt: Date.now()
  };
  
  designerStore.components.push(instance);
  designerStore.selectedComponentIds = [instance.instanceId];
  validateScene(designerStore.components as any);
};

export const selectComponent = (id: string | null) => {
  if (id) {
    designerStore.selectedComponentIds = [id];
    // update isSelected flag on components
    designerStore.components.forEach(c => c.isSelected = (c.instanceId === id));
  } else {
    designerStore.selectedComponentIds = [];
    designerStore.components.forEach(c => c.isSelected = false);
  }
};

export const updateComponentPosition = (id: string, position: {x: number, y: number, z: number}, snapPoint?: any) => {
  const component = designerStore.components.find(c => c.instanceId === id);
  if (component) {
    component.position = position;
    if (snapPoint !== undefined) component.snapPoint = snapPoint;
  }
};

export const finalizeComponentPosition = () => {
  commitHistory();
};

export const removeComponent = (id: string) => {
  commitHistory();
  designerStore.components = designerStore.components.filter(c => c.instanceId !== id);
  designerStore.selectedComponentIds = designerStore.selectedComponentIds.filter(selectedId => selectedId !== id);
  validateScene(designerStore.components as any);
};

export const deleteSelectedComponent = () => {
  if (designerStore.selectedComponentIds.length > 0) {
    commitHistory();
    const id = designerStore.selectedComponentIds[0];
    designerStore.components = designerStore.components.filter(c => c.instanceId !== id);
    designerStore.selectedComponentIds = [];
    validateScene(designerStore.components as any);
  }
};

export const duplicateSelectedComponent = () => {
  if (designerStore.selectedComponentIds.length > 0) {
    const id = designerStore.selectedComponentIds[0];
    const source = designerStore.components.find(c => c.instanceId === id);
    if (source) {
      commitHistory();
      const duplicate: ComponentInstance = JSON.parse(JSON.stringify(source));
      duplicate.instanceId = crypto.randomUUID();
      // Offset position slightly
      duplicate.position.x += 10;
      duplicate.position.z += 10;
      duplicate.snapPoint = undefined;
      designerStore.components.push(duplicate);
      designerStore.selectedComponentIds = [duplicate.instanceId];
      designerStore.components.forEach(c => c.isSelected = (c.instanceId === duplicate.instanceId));
      validateScene(designerStore.components as any);
    }
  }
};

export const undo = () => {
  if (designerStore.history.past.length > 0) {
    const current = JSON.parse(JSON.stringify(designerStore.components));
    designerStore.history.future.push(current);
    const previous = designerStore.history.past.pop();
    designerStore.components = previous as any;
    designerStore.selectedComponentIds = [];
    validateScene(designerStore.components as any);
  }
};

export const redo = () => {
  if (designerStore.history.future.length > 0) {
    const current = JSON.parse(JSON.stringify(designerStore.components));
    designerStore.history.past.push(current);
    const next = designerStore.history.future.pop();
    designerStore.components = next as any;
    designerStore.selectedComponentIds = [];
    validateScene(designerStore.components as any);
  }
};

export const toggleExplodedView = () => {
  designerStore.explodedView = !designerStore.explodedView;
};
