import React from 'react';
import { useSnapshot } from 'valtio';
import { 
  designerStore, 
  setPhase, 
  toggleExplodedView, 
  undo, 
  redo, 
  deleteSelectedComponent, 
  duplicateSelectedComponent,
  toggleLayers,
  toggleLeftPanelCollapsed
} from '../../store/designerStore';
import { pricingStore } from '../../store/pricingStore';
import { Sidebar } from '../ui/Sidebar';
import { ComponentPalette } from './ComponentPalette';
import { PropertiesPanel } from './PropertiesPanel';
import { LayersPanel } from './LayersPanel';
import { DesignModeBar } from './DesignModeBar';
import { Tooltip } from '../ui/Tooltip';
import { ArrowLeft, Layers, Share2, Undo2, Redo2, Copy, Trash2, Download, Upload, Eye } from 'lucide-react';
import Scene from '../canvas/Scene';
import { saveScene, loadScene } from '../../engine/serialization';

export function Workspace() {
  const state = useSnapshot(designerStore);
  const pricing = useSnapshot(pricingStore);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      loadScene(content);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const isUndoDisabled = state.history.past.length === 0;
  const isRedoDisabled = state.history.future.length === 0;
  const isSelectedEmpty = state.selectedComponentIds.length === 0;

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0d0f17',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Top Main Toolbar */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '10px 22px',
        borderRadius: 18,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 18px 45px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }}>
        {/* Navigation & History */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tooltip content="Back to Furniture Selection">
            <button
              onClick={() => setPhase('selection')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Undo Action">
            <button
              onClick={undo}
              disabled={isUndoDisabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: isUndoDisabled ? '#475569' : '#cbd5e1',
                border: 'none',
                cursor: isUndoDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!isUndoDisabled) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Undo2 size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Redo Action">
            <button
              onClick={redo}
              disabled={isRedoDisabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: isRedoDisabled ? '#475569' : '#cbd5e1',
                border: 'none',
                cursor: isRedoDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!isRedoDisabled) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Redo2 size={18} />
            </button>
          </Tooltip>
        </div>

        <div style={{ width: 1, height: 24, background: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Edit & Structure */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tooltip content="Duplicate Selected Component">
            <button
              onClick={duplicateSelectedComponent}
              disabled={isSelectedEmpty}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: isSelectedEmpty ? '#475569' : '#cbd5e1',
                border: 'none',
                cursor: isSelectedEmpty ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!isSelectedEmpty) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Copy size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Delete Selected Component">
            <button
              onClick={deleteSelectedComponent}
              disabled={isSelectedEmpty}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: isSelectedEmpty ? '#475569' : '#ef4444',
                border: 'none',
                cursor: isSelectedEmpty ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!isSelectedEmpty) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)';
              }}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Trash2 size={18} />
            </button>
          </Tooltip>

          <Tooltip content="View Scene Layers">
            <button
              onClick={toggleLayers}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                height: 38,
                borderRadius: 12,
                background: state.layersOpen ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                color: state.layersOpen ? '#38bdf8' : '#cbd5e1',
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!state.layersOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                if (!state.layersOpen) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Layers size={17} />
              <span>Layers</span>
            </button>
          </Tooltip>

          <Tooltip content="Toggle Exploded Assembly View">
            <button
              onClick={toggleExplodedView}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                height: 38,
                borderRadius: 12,
                background: state.explodedView ? 'rgba(212, 168, 83, 0.22)' : 'transparent',
                color: state.explodedView ? '#d4a853' : '#cbd5e1',
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                if (!state.explodedView) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                if (!state.explodedView) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Eye size={17} />
              <span>Explode</span>
            </button>
          </Tooltip>
        </div>

        <div style={{ width: 1, height: 24, background: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Total Price Display */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 12px',
          minWidth: 110
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOTAL ESTIMATE
          </span>
          <span style={{ fontSize: 16.5, fontWeight: 800, color: '#d4a853' }}>
            {pricing.formattedTotal}
          </span>
        </div>

        <div style={{ width: 1, height: 24, background: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Actions (Save / Load / Share) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tooltip content="Save Design (JSON)">
            <button
              onClick={saveScene}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Download size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Load Design from File">
            <label style={{ cursor: 'pointer', display: 'flex' }}>
              <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileUpload} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: 'transparent',
                  color: '#cbd5e1',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Upload size={18} />
              </div>
            </label>
          </Tooltip>

          <Tooltip content="Share Custom Link">
            <button
              onClick={() => alert('Share link copied to clipboard!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'transparent',
                color: '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Share2 size={18} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Floating Design Mode Bar & Template Switcher */}
      <div style={{ position: 'absolute', top: 76, left: 0, right: 0, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <DesignModeBar />
        </div>
      </div>

      {/* Layers Tree Panel Popover */}
      <LayersPanel />

      {/* Left Sidebar (Components Palette) */}
      <Sidebar 
        side="left" 
        isOpen={true} 
        width={260} 
        isCollapsed={state.leftPanelCollapsed}
        onToggleCollapse={toggleLeftPanelCollapsed}
      >
        <ComponentPalette />
      </Sidebar>

      {/* Right Sidebar (Properties Inspector) */}
      <Sidebar side="right" isOpen={true} width={285}>
        <PropertiesPanel />
      </Sidebar>

      {/* Main 3D Canvas Viewport */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene />
      </div>
    </div>
  );
}
