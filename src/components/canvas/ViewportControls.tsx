import { useSnapshot } from 'valtio';
import { designerStore, toggleSnap, setSnapGridSize } from '../../store/designerStore';
import { Home, Focus, Magnet, Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { useState } from 'react';

interface ViewportControlsProps {
  onResetView?: () => void;
  onFocusSelected?: () => void;
  onSetCameraPreset?: (preset: string) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export function ViewportControls({ 
  onResetView, 
  onFocusSelected, 
  onSetCameraPreset,
  onZoomIn,
  onZoomOut 
}: ViewportControlsProps) {
  const state = useSnapshot(designerStore);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  const presets = [
    { id: 'perspective', label: 'Perspective' },
    { id: 'front', label: 'Front View' },
    { id: 'back', label: 'Back View' },
    { id: 'left', label: 'Left View' },
    { id: 'right', label: 'Right View' },
    { id: 'top', label: 'Top View' },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 15,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-end',
      pointerEvents: 'auto'
    }}>
      {/* Top Right Floating Toolbar for Navigation & Camera */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(20px)',
        borderRadius: 14,
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.45)',
      }}>
        {/* Zoom In Button */}
        <Tooltip content="Zoom In (+)" position="left">
          <button
            onClick={onZoomIn}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'transparent',
              color: '#e2e8f0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <ZoomIn size={18} />
          </button>
        </Tooltip>

        {/* Zoom Out Button */}
        <Tooltip content="Zoom Out (-)" position="left">
          <button
            onClick={onZoomOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'transparent',
              color: '#e2e8f0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <ZoomOut size={18} />
          </button>
        </Tooltip>

        <div style={{ width: 1, height: 20, background: 'rgba(255, 255, 255, 0.14)' }} />

        {/* Reset View / Home */}
        <Tooltip content="Reset View (Home)" position="left">
          <button
            onClick={onResetView}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'transparent',
              color: '#e2e8f0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Home size={18} />
          </button>
        </Tooltip>

        {/* Focus Selected */}
        <Tooltip content="Focus Selected Component" position="left">
          <button
            onClick={onFocusSelected}
            disabled={state.selectedComponentIds.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'transparent',
              color: state.selectedComponentIds.length > 0 ? '#e2e8f0' : '#475569',
              border: 'none',
              cursor: state.selectedComponentIds.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              if (state.selectedComponentIds.length > 0) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Focus size={18} />
          </button>
        </Tooltip>

        <div style={{ width: 1, height: 20, background: 'rgba(255, 255, 255, 0.14)' }} />

        {/* Camera Views Preset Dropdown */}
        <div style={{ position: 'relative' }}>
          <Tooltip content="Camera Angle Presets" position="left">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 12px',
                height: 36,
                borderRadius: 10,
                background: showPresetsMenu ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: '#e2e8f0',
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Eye size={17} />
              <span style={{ textTransform: 'capitalize' }}>{state.camera.preset || 'View'}</span>
            </button>
          </Tooltip>

          {showPresetsMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              width: 150,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.14)',
              padding: 6,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
              zIndex: 100
            }}>
              {presets.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    if (onSetCameraPreset) onSetCameraPreset(p.id);
                    setShowPresetsMenu(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: state.camera.preset === p.id ? '#38bdf8' : '#cbd5e1',
                    background: state.camera.preset === p.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onMouseOver={(e) => {
                    if (state.camera.preset !== p.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseOut={(e) => {
                    if (state.camera.preset !== p.id) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {p.label}
                  {state.camera.preset === p.id && <span style={{ fontSize: 11 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Snap Control Widget */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 14px',
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(20px)',
        borderRadius: 14,
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.45)',
      }}>
        <button
          onClick={toggleSnap}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 10,
            background: state.snapEnabled ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            color: state.snapEnabled ? '#38bdf8' : '#94a3b8',
            border: state.snapEnabled ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Magnet size={16} />
          Snap {state.snapEnabled ? 'ON' : 'OFF'}
        </button>

        {state.snapEnabled && (
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 5, 10, 25].map(step => (
              <button
                key={step}
                onClick={() => setSnapGridSize(step)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  background: state.snapGridSize === step ? '#38bdf8' : 'rgba(255, 255, 255, 0.06)',
                  color: state.snapGridSize === step ? '#0f172a' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {step}cm
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
