import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { 
  designerStore, 
  updateComponentMaterial, 
  updateComponentDimensions, 
  updateComponentRotation, 
  duplicateSelectedComponent, 
  deleteSelectedComponent 
} from '../../store/designerStore';
import { pricingStore } from '../../store/pricingStore';
import { materials } from '../../data/materials';
import { Copy, Trash2, Sliders, ChevronDown, Check } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export function PropertiesPanel() {
  const state = useSnapshot(designerStore);
  useSnapshot(pricingStore);

  const selectedComp = state.selectedComponentIds.length > 0 
    ? state.components.find(c => c.instanceId === state.selectedComponentIds[0])
    : null;

  // Local state for direct numeric input validation
  const [widthInput, setWidthInput] = useState<string>('');
  const [depthInput, setDepthInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('');
  
  const [widthError, setWidthError] = useState<string | null>(null);
  const [depthError, setDepthError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);

  // Sync inputs with selected component dimensions
  useEffect(() => {
    if (selectedComp) {
      setWidthInput(String(selectedComp.dimensions.width));
      setDepthInput(String(selectedComp.dimensions.depth));
      setHeightInput(String(selectedComp.dimensions.height));
      setWidthError(null);
      setDepthError(null);
      setHeightError(null);
    }
  }, [selectedComp?.instanceId, selectedComp?.dimensions.width, selectedComp?.dimensions.depth, selectedComp?.dimensions.height]);

  if (!selectedComp) {
    return (
      <div style={{
        padding: '40px 24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
          color: '#38bdf8'
        }}>
          <Sliders size={26} />
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
          No Component Selected
        </h3>
        <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, maxWidth: 230 }}>
          Click any component in the 3D viewport to inspect, resize, and edit materials.
        </p>
      </div>
    );
  }

  const currentMat = materials.find(m => m.id === selectedComp.material);

  // Helper for numeric input commits
  const handleWidthSubmit = (valStr: string) => {
    const val = Number(valStr);
    if (isNaN(val) || val < 20 || val > 300) {
      setWidthError('Must be between 20 & 300 cm');
    } else {
      setWidthError(null);
      updateComponentDimensions(selectedComp.instanceId, { width: val });
    }
  };

  const handleDepthSubmit = (valStr: string) => {
    const val = Number(valStr);
    if (isNaN(val) || val < 10 || val > 150) {
      setDepthError('Must be between 10 & 150 cm');
    } else {
      setDepthError(null);
      updateComponentDimensions(selectedComp.instanceId, { depth: val });
    }
  };

  const handleHeightSubmit = (valStr: string) => {
    const val = Number(valStr);
    if (isNaN(val) || val < 1 || val > 120) {
      setHeightError('Must be between 1 & 120 cm');
    } else {
      setHeightError(null);
      updateComponentDimensions(selectedComp.instanceId, { height: val });
    }
  };

  return (
    <div style={{
      padding: '22px 20px',
      height: '100%',
      overflowY: 'auto',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }}>
      {/* Component Title Header */}
      <div style={{
        padding: '16px 18px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 14,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>
          {selectedComp.name}
        </div>
        <div style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600, marginTop: 4 }}>
          Base Price: ₹{selectedComp.price?.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Material Selector */}
      <div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 10 }}>
          Material Finish
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedComp.material}
            onChange={(e) => {
              const matId = e.target.value;
              const matDef = materials.find(m => m.id === matId);
              const defaultColor = matDef?.colorVariants?.[0]?.id || matDef?.id;
              updateComponentMaterial(selectedComp.instanceId, matId, defaultColor);
            }}
            style={{
              width: '100%',
              height: 42,
              padding: '0 14px',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.14)',
              background: 'rgba(15, 23, 42, 0.7)',
              color: '#f8fafc',
              fontSize: 14,
              fontWeight: 500,
              appearance: 'none',
              cursor: 'pointer',
            }}
          >
            {materials.map(m => (
              <option key={m.id} value={m.id} style={{ background: '#0f172a', color: '#f8fafc' }}>
                {m.name} ({m.category})
              </option>
            ))}
          </select>
          <ChevronDown size={18} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
        </div>
      </div>

      {/* Color Swatch Selector */}
      {currentMat?.colorVariants && currentMat.colorVariants.length > 0 && (
        <div>
          <label style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 12 }}>
            Color Variant
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {currentMat.colorVariants.map(v => {
              const isSelected = selectedComp.color === v.id;
              return (
                <Tooltip key={v.id} content={v.name} position="top">
                  <button
                    onClick={() => updateComponentMaterial(selectedComp.instanceId, selectedComp.material, v.id)}
                    style={{
                      position: 'relative',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: v.hex,
                      border: isSelected ? '3px solid #38bdf8' : '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: isSelected ? '0 0 14px rgba(56, 189, 248, 0.5)' : 'none',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <Check size={16} style={{ color: '#ffffff', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }} />
                    )}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}

      {/* Dimensions Controls */}
      <div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 14 }}>
          Dimensions (cm)
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Width */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#cbd5e1', fontWeight: 600 }}>Width</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="number"
                  value={widthInput}
                  onChange={(e) => {
                    setWidthInput(e.target.value);
                    handleWidthSubmit(e.target.value);
                  }}
                  onBlur={() => handleWidthSubmit(widthInput)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleWidthSubmit(widthInput);
                  }}
                  style={{
                    width: 66,
                    height: 32,
                    padding: '2px 8px',
                    borderRadius: 8,
                    border: widthError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>cm</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              value={selectedComp.dimensions.width}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWidthInput(String(val));
                setWidthError(null);
                updateComponentDimensions(selectedComp.instanceId, { width: val });
              }}
              style={{
                width: '100%',
                height: 6,
                accentColor: '#38bdf8',
                cursor: 'pointer',
              }}
            />
            {widthError && <div style={{ fontSize: 11.5, color: '#ef4444', marginTop: 4 }}>{widthError}</div>}
          </div>

          {/* Depth */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#cbd5e1', fontWeight: 600 }}>Depth</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="number"
                  value={depthInput}
                  onChange={(e) => {
                    setDepthInput(e.target.value);
                    handleDepthSubmit(e.target.value);
                  }}
                  onBlur={() => handleDepthSubmit(depthInput)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDepthSubmit(depthInput);
                  }}
                  style={{
                    width: 66,
                    height: 32,
                    padding: '2px 8px',
                    borderRadius: 8,
                    border: depthError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>cm</span>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={selectedComp.dimensions.depth}
              onChange={(e) => {
                const val = Number(e.target.value);
                setDepthInput(String(val));
                setDepthError(null);
                updateComponentDimensions(selectedComp.instanceId, { depth: val });
              }}
              style={{
                width: '100%',
                height: 6,
                accentColor: '#38bdf8',
                cursor: 'pointer',
              }}
            />
            {depthError && <div style={{ fontSize: 11.5, color: '#ef4444', marginTop: 4 }}>{depthError}</div>}
          </div>

          {/* Height */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#cbd5e1', fontWeight: 600 }}>Height</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="number"
                  value={heightInput}
                  onChange={(e) => {
                    setHeightInput(e.target.value);
                    handleHeightSubmit(e.target.value);
                  }}
                  onBlur={() => handleHeightSubmit(heightInput)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleHeightSubmit(heightInput);
                  }}
                  style={{
                    width: 66,
                    height: 32,
                    padding: '2px 8px',
                    borderRadius: 8,
                    border: heightError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>cm</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="120"
              value={selectedComp.dimensions.height}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHeightInput(String(val));
                setHeightError(null);
                updateComponentDimensions(selectedComp.instanceId, { height: val });
              }}
              style={{
                width: '100%',
                height: 6,
                accentColor: '#38bdf8',
                cursor: 'pointer',
              }}
            />
            {heightError && <div style={{ fontSize: 11.5, color: '#ef4444', marginTop: 4 }}>{heightError}</div>}
          </div>
        </div>
      </div>

      {/* Rotation Segment Control */}
      <div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 10 }}>
          Rotation (Y-Axis)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[0, 90, 180, 270].map(deg => {
            const isActive = (selectedComp.rotation?.y || 0) === deg;
            return (
              <button
                key={deg}
                onClick={() => updateComponentRotation(selectedComp.instanceId, { y: deg })}
                style={{
                  height: 38,
                  borderRadius: 10,
                  border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {deg}°
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
        <button
          onClick={duplicateSelectedComponent}
          style={{
            flex: 1,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '0 12px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 12,
            cursor: 'pointer',
            color: '#f8fafc',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
        >
          <Copy size={16} /> Duplicate
        </button>

        <button
          onClick={deleteSelectedComponent}
          style={{
            flex: 1,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '0 12px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12,
            cursor: 'pointer',
            color: '#f87171',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {/* Quote Request CTA */}
      <button
        onClick={() => alert(`Thank you! Your custom table proposal request (${state.components.length} components) has been submitted to Magnus Workspace Design team. We will contact you shortly!`)}
        style={{
          width: '100%',
          height: 46,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #d4a853 0%, #b8860b 100%)',
          color: '#0f172a',
          border: 'none',
          fontWeight: 800,
          fontSize: 14,
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(212, 168, 83, 0.3)',
          marginTop: 4,
          transition: 'all 0.15s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
      >
        Request Quote for Design
      </button>
    </div>
  );
}
