/* ============================================================
   TypeScript Types — Designer State
   ============================================================ */

import type { ComponentInstance, FurnitureTypeId, ValidationIssue, Vec3 } from './furniture';

/** Main designer state shape */
export interface DesignerState {
  /** Current phase of the designer */
  phase: DesignerPhase;
  /** Selected furniture type (null = selection screen) */
  selectedFurnitureType: FurnitureTypeId | null;
  /** All placed component instances */
  components: ComponentInstance[];
  /** Currently selected component instance IDs */
  selectedComponentIds: string[];
  /** Currently hovered component instance ID */
  hoveredComponentId: string | null;
  /** Camera state */
  camera: CameraState;
  /** View mode */
  viewMode: ViewMode;
  /** Lighting preset */
  lightingPreset: LightingPreset;
  /** Measurement overlay visible */
  showMeasurements: boolean;
  /** Grid visible */
  showGrid: boolean;
  /** Auto-rotate demo mode */
  autoRotate: boolean;
  /** Exploded view */
  explodedView: boolean;
  /** Validation issues */
  validationIssues: ValidationIssue[];
  /** Design health status */
  designHealth: DesignHealth;
  /** Current drag state */
  dragState: DragState | null;
  /** Design metadata */
  designMeta: DesignMeta;
  /** Budget mode */
  budgetMode: BudgetModeState;
  /** History stack */
  history: {
    past: ComponentInstance[][];
    future: ComponentInstance[][];
  };
  /** Snap settings */
  snapEnabled: boolean;
  snapGridSize: number;
  /** Layers popover open state */
  layersOpen: boolean;
  /** Left sidebar collapsed state */
  leftPanelCollapsed: boolean;
}

export type DesignerPhase = 
  | 'selection'     // Choosing furniture type
  | 'building'      // Main workspace
  | 'reviewing';    // Final review / exploded view

export interface CameraState {
  position: Vec3;
  target: Vec3;
  zoom: number;
  preset: CameraPreset;
}

export type CameraPreset = 
  | 'three-quarter'
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'custom';

export type ViewMode = 'normal' | 'exploded' | 'wireframe' | 'xray';

export type LightingPreset = 'studio' | 'daylight' | 'warm' | 'showroom';

export type DesignHealth = 'healthy' | 'warning' | 'error';

export interface DragState {
  componentDefinitionId: string;
  isDraggingOver3D: boolean;
  ghostPosition: Vec3 | null;
  isValidDrop: boolean;
  nearestSnapPoint: Vec3 | null;
  invalidReason?: string;
}

export interface DesignMeta {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  version: number;
  thumbnailDataUrl?: string;
}

export interface BudgetModeState {
  enabled: boolean;
  targetPrice: number;
  currentTotal: number;
}

/* --- Undo/Redo --- */
export interface HistoryEntry {
  id: string;
  timestamp: number;
  label: string;
  components: ComponentInstance[];
  thumbnailDataUrl?: string;
}

export interface UndoRedoState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxHistory: number;
}

/* --- UI State --- */
export interface UIState {
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  leftPanelTab: 'components' | 'favorites' | 'recent';
  rightPanelTab: 'properties' | 'materials' | 'pricing' | 'bom';
  activeModal: ModalType | null;
  toasts: Toast[];
  tourActive: boolean;
  tourStep: number;
  soundEnabled: boolean;
  showKeyboardShortcuts: boolean;
  searchQuery: string;
  isMobile: boolean;
  isTablet: boolean;
  contextMenu: ContextMenuState | null;
  savedIndicatorVisible: boolean;
}

export type ModalType = 
  | 'share'
  | 'quote'
  | 'reset'
  | 'save'
  | 'keyboard-shortcuts'
  | 'compare-materials'
  | 'version-history';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration: number;
  createdAt: number;
}

export interface ContextMenuState {
  x: number;
  y: number;
  targetComponentId: string;
}
