/* ============================================================
   TypeScript Types — Furniture System
   Core type definitions for furniture, components, and structure
   ============================================================ */

/** Supported furniture categories */
export type FurnitureTypeId = 
  | 'study-table' 
  | 'office-table' 
  | 'dining-table' 
  | 'coffee-table' 
  | 'tv-unit';

/** Metadata for a furniture type/category */
export interface FurnitureType {
  id: FurnitureTypeId;
  name: string;
  description: string;
  icon: string;
  defaultDimensions: Dimensions;
  componentCategories: ComponentCategory[];
  thumbnail?: string;
}

/** Dimensions in centimeters */
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

/** Category grouping within a furniture type */
export interface ComponentCategory {
  id: string;
  name: string;
  icon?: string;
  components: ComponentDefinition[];
}

/** Definition of a draggable furniture component (template) */
export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  furnitureType: FurnitureTypeId;
  description: string;
  geometryType: GeometryType;
  defaultDimensions: Dimensions;
  defaultMaterial: string;
  defaultColor: string;
  basePrice: number;
  weight: number; // kg
  snapTargets: string[];       // which component types this can attach to
  snapPositions: SnapPosition[]; // valid attachment positions
  maxCount: number;             // max instances per design (0 = unlimited)
  incompatibleWith: string[];   // component IDs that conflict
  isRequired: boolean;          // whether at least one must be present
  properties: ComponentProperty[];
}

/** Geometry generation type */
export type GeometryType = 
  | 'box'
  | 'cylinder'
  | 'l-shape'
  | 'curved-top'
  | 'drawer-unit'
  | 'cabinet'
  | 'shelf'
  | 'tray'
  | 'wheel'
  | 'handle'
  | 'panel'
  | 'frame'
  | 'custom';

/** Where a component can snap to */
export type SnapPosition = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'front'
  | 'back'
  | 'under-top'
  | 'on-top'
  | 'leg-position'
  | 'side-mount'
  | 'center';

/** Placed instance of a component in the workspace */
export interface ComponentInstance {
  instanceId: string;
  definitionId: string;
  furnitureType: FurnitureTypeId;
  name: string;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  dimensions: Dimensions;
  material: string;
  color: string;
  properties: Record<string, string | number | boolean>;
  snapPoint?: SnapPointConnection;
  isSelected: boolean;
  isHovered: boolean;
  isValid: boolean;
  validationErrors: string[];
  price: number;
  addedAt: number;
}

/** Connection info for snapped components */
export interface SnapPointConnection {
  parentInstanceId: string;
  parentSnapPosition: SnapPosition;
  childSnapPosition: SnapPosition;
}

/** A 3D vector */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Configurable property on a component */
export interface ComponentProperty {
  key: string;
  label: string;
  type: 'select' | 'slider' | 'toggle' | 'color' | 'number';
  options?: PropertyOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue: string | number | boolean;
}

export interface PropertyOption {
  value: string;
  label: string;
  priceModifier?: number; // ₹ added/subtracted
}

/** Snap rule for the snap engine */
export interface SnapRule {
  sourceType: string;
  targetType: string;
  validPositions: SnapPosition[];
  offsetCalculation: 'auto' | 'manual';
  magneticRadius: number; // pixels
  requiresAlignment: boolean;
}

/** Validation issue found during physics check */
export interface ValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  componentInstanceId: string;
  message: string;
  suggestedFix?: string;
  autoFixable: boolean;
}
