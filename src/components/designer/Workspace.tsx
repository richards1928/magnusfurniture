import { useSnapshot } from 'valtio';
import { designerStore, setPhase, toggleExplodedView, undo, redo, deleteSelectedComponent, duplicateSelectedComponent, updateComponentMaterial, updateComponentDimensions, updateComponentRotation } from '../../store/designerStore';
import { pricingStore } from '../../store/pricingStore';
import { Sidebar } from '../ui/Sidebar';
import { IconButton } from '../ui/IconButton';
import { ComponentPalette } from './ComponentPalette';
import { ArrowLeft, Layers, Share2, Undo2, Redo2, Copy, Trash2, Download, Upload } from 'lucide-react';
import Scene from '../canvas/Scene';
import { saveScene, loadScene } from '../../engine/serialization';
import { materials } from '../../data/materials';

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

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: '#f8f9fa' }}>
      
      {/* Top Navbar */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        padding: '12px 24px',
        borderRadius: '100px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <IconButton icon={ArrowLeft} onClick={() => setPhase('selection')} title="Back to Selection" variant="ghost" />
        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
        
        <IconButton 
          icon={Undo2} 
          onClick={undo} 
          title="Undo" 
          variant="ghost" 
          className={state.history.past.length === 0 ? "disabled-btn" : ""}
        />
        <IconButton 
          icon={Redo2} 
          onClick={redo} 
          title="Redo" 
          variant="ghost" 
          className={state.history.future.length === 0 ? "disabled-btn" : ""}
        />
        
        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

        <IconButton 
          icon={Copy} 
          onClick={duplicateSelectedComponent} 
          title="Duplicate Selected Component (Duplicate & Move)" 
          variant="ghost"
          className={state.selectedComponentIds.length === 0 ? "disabled-btn" : ""}
        />
        <IconButton 
          icon={Trash2} 
          onClick={deleteSelectedComponent} 
          title="Delete Selected Component" 
          variant="ghost"
          className={state.selectedComponentIds.length === 0 ? "disabled-btn" : ""}
        />

        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

        <IconButton 
          icon={Layers} 
          onClick={toggleExplodedView} 
          isActive={state.explodedView} 
          title="Toggle Exploded View" 
          variant={state.explodedView ? 'primary' : 'ghost'} 
        />
        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

        
        <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-h)', minWidth: '100px', textAlign: 'center' }}>
          {pricing.formattedTotal}
        </div>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
        
        <IconButton icon={Download} onClick={saveScene} title="Save Design as JSON" variant="ghost" />
        
        <label style={{ cursor: 'pointer', display: 'flex' }}>
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileUpload} />
          <IconButton icon={Upload} onClick={() => {}} title="Load Design from JSON" variant="ghost" className="pointer-events-none" />
        </label>
        
        <IconButton icon={Share2} onClick={() => alert('Share link copied!')} title="Share Design" variant="ghost" />
      </div>

      <Sidebar side="left" isOpen={true} width={340}>
        <ComponentPalette />
      </Sidebar>

      <Sidebar side="right" isOpen={true} width={340}>
        <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Properties
          </h2>

          {state.selectedComponentIds.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎯</div>
              <p style={{ fontWeight: 500 }}>Select a component in 3D</p>
              <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '6px' }}>
                Click any part in the scene to edit materials, colors, dimensions, and rotation.
              </p>
            </div>
          ) : (() => {
            const selectedComp = state.components.find(c => c.instanceId === state.selectedComponentIds[0]);
            if (!selectedComp) return null;
            const currentMat = materials.find(m => m.id === selectedComp.material);

            return (
              <div>
                {/* Component Name Header */}
                <div style={{ padding: '14px 16px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-h)' }}>
                    {selectedComp.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text)', marginTop: 4 }}>
                    Base Price: ₹{selectedComp.price?.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* 1. Material Selector */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', display: 'block', marginBottom: 8 }}>
                    Material Finish
                  </label>
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
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-h)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                    }}
                  >
                    {materials.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Color Variant Selection */}
                {currentMat?.colorVariants && currentMat.colorVariants.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', display: 'block', marginBottom: 8 }}>
                      Color Variant
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {currentMat.colorVariants.map(v => (
                        <button
                          key={v.id}
                          onClick={() => updateComponentMaterial(selectedComp.instanceId, selectedComp.material, v.id)}
                          title={v.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            borderRadius: '20px',
                            border: selectedComp.color === v.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                            background: selectedComp.color === v.id ? 'var(--accent-bg)' : 'var(--bg)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: 'var(--text-h)',
                          }}
                        >
                          <span style={{ width: 14, height: 14, borderRadius: '50%', background: v.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Dimensions Sliders */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', display: 'block', marginBottom: 8 }}>
                    Dimensions (W × D × H cm)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text)', marginBottom: 4 }}>
                        <span>Width</span>
                        <span>{selectedComp.dimensions.width} cm</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="300"
                        value={selectedComp.dimensions.width}
                        onChange={(e) => updateComponentDimensions(selectedComp.instanceId, { width: Number(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text)', marginBottom: 4 }}>
                        <span>Depth</span>
                        <span>{selectedComp.dimensions.depth} cm</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={selectedComp.dimensions.depth}
                        onChange={(e) => updateComponentDimensions(selectedComp.instanceId, { depth: Number(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text)', marginBottom: 4 }}>
                        <span>Height</span>
                        <span>{selectedComp.dimensions.height} cm</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="120"
                        value={selectedComp.dimensions.height}
                        onChange={(e) => updateComponentDimensions(selectedComp.instanceId, { height: Number(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Rotation Controls */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', display: 'block', marginBottom: 8 }}>
                    Rotate Component (Y-Axis)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                    {[0, 90, 180, 270].map(deg => (
                      <button
                        key={deg}
                        onClick={() => updateComponentRotation(selectedComp.instanceId, { y: deg })}
                        style={{
                          padding: '8px 0',
                          borderRadius: '8px',
                          border: (selectedComp.rotation?.y || 0) === deg ? '2px solid var(--accent)' : '1px solid var(--border)',
                          background: (selectedComp.rotation?.y || 0) === deg ? 'var(--accent-bg)' : 'var(--bg)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: 'var(--text-h)',
                        }}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <button 
                    onClick={duplicateSelectedComponent}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-h)', fontWeight: 500 }}
                  >
                    <Copy size={16} /> Duplicate
                  </button>
                  <button 
                    onClick={deleteSelectedComponent}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer', color: '#ef4444', fontWeight: 500 }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                {/* Request Quote CTA */}
                <button
                  onClick={() => alert(`Thank you! Your custom design proposal request (${state.components.length} components, total ${pricing.formattedTotal}) has been submitted to Magnus Workspace Design team. We will contact you within 2 hours!`)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'var(--color-primary, #3e2723)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  }}
                >
                  Request Quote for Custom Design
                </button>
              </div>
            );
          })()}
        </div>
      </Sidebar>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene />
      </div>
    </div>
  );
}
