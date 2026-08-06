import { proxy } from 'valtio';
import type { 
  DesignerState, 
  FurnitureTypeId, 
  ComponentInstance, 
  DesignerPhase,
  ComponentDefinition
} from '../types';
import { validateScene } from '../engine/validationEngine';
import { getFurnitureType } from '../data/furniture-types';

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

  // Spawn initial starter 3D model assembly
  const typeDef = getFurnitureType(id);
  if (typeDef && typeDef.componentCategories.length > 0) {
    const topComp = typeDef.componentCategories.find(c => c.id === 'tops' || c.id === 'console')?.components[0];
    const legComp = typeDef.componentCategories.find(c => c.id === 'legs')?.components[0];

    if (topComp) {
      const topWidth = topComp.defaultDimensions.width;
      const topDepth = topComp.defaultDimensions.depth;

      // 1. Add Table Top at y = 72
      const topId = crypto.randomUUID();
      designerStore.components.push({
        instanceId: topId,
        definitionId: topComp.id,
        furnitureType: id,
        name: topComp.name,
        position: { x: 0, y: 72, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        dimensions: { ...topComp.defaultDimensions },
        material: topComp.defaultMaterial,
        color: topComp.defaultColor,
        properties: {},
        isSelected: false,
        isHovered: false,
        isValid: true,
        validationErrors: [],
        price: topComp.basePrice,
        addedAt: Date.now()
      });

      // 2. Add 4 corner legs if legComp exists
      if (legComp) {
        const legH = 70;
        const offsetX = topWidth / 2 - 8;
        const offsetZ = topDepth / 2 - 8;
        const legOffsets = [
          { x: -offsetX, z: -offsetZ },
          { x: offsetX, z: -offsetZ },
          { x: -offsetX, z: offsetZ },
          { x: offsetX, z: offsetZ }
        ];

        legOffsets.forEach(off => {
          designerStore.components.push({
            instanceId: crypto.randomUUID(),
            definitionId: legComp.id,
            furnitureType: id,
            name: legComp.name,
            position: { x: off.x, y: legH / 2, z: off.z },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            dimensions: { width: legComp.defaultDimensions.width, height: legH, depth: legComp.defaultDimensions.depth },
            material: legComp.defaultMaterial,
            color: legComp.defaultColor,
            properties: {},
            isSelected: false,
            isHovered: false,
            isValid: true,
            validationErrors: [],
            price: legComp.basePrice,
            addedAt: Date.now()
          });
        });
      }

      // Select top by default
      designerStore.selectedComponentIds = [topId];
      const selectedObj = designerStore.components.find(c => c.instanceId === topId);
      if (selectedObj) selectedObj.isSelected = true;
    }
  }

  validateScene(designerStore.components as any);
};

export const addComponent = (definition: ComponentDefinition) => {
  commitHistory();
  const instance: ComponentInstance = {
    instanceId: crypto.randomUUID(),
    definitionId: definition.id,
    furnitureType: definition.furnitureType,
    name: definition.name,
    position: { x: 0, y: 72, z: 0 },
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
  designerStore.components.forEach(c => c.isSelected = (c.instanceId === instance.instanceId));
  validateScene(designerStore.components as any);
};

export const selectComponent = (id: string | null) => {
  if (id) {
    designerStore.selectedComponentIds = [id];
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

export const updateComponentMaterial = (id: string, material: string, color?: string) => {
  commitHistory();
  const component = designerStore.components.find(c => c.instanceId === id);
  if (component) {
    component.material = material;
    if (color) component.color = color;
  }
};

export const updateComponentDimensions = (id: string, dims: { width?: number, height?: number, depth?: number }) => {
  commitHistory();
  const component = designerStore.components.find(c => c.instanceId === id);
  if (component) {
    if (dims.width !== undefined) component.dimensions.width = dims.width;
    if (dims.height !== undefined) component.dimensions.height = dims.height;
    if (dims.depth !== undefined) component.dimensions.depth = dims.depth;
  }
};

export const updateComponentRotation = (id: string, rot: { x?: number, y?: number, z?: number }) => {
  commitHistory();
  const component = designerStore.components.find(c => c.instanceId === id);
  if (component) {
    if (rot.x !== undefined) component.rotation.x = rot.x;
    if (rot.y !== undefined) component.rotation.y = rot.y;
    if (rot.z !== undefined) component.rotation.z = rot.z;
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
      
      // Smart offset so duplicate appears clearly beside original
      const widthOffset = (source.dimensions?.width || 30) + 15;
      duplicate.position.x += widthOffset;
      duplicate.snapPoint = undefined;

      // Deselect all existing, select only the new duplicate
      designerStore.components.forEach(c => { c.isSelected = false; });
      duplicate.isSelected = true;

      designerStore.components.push(duplicate);
      designerStore.selectedComponentIds = [duplicate.instanceId];
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
