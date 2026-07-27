import { useSnapshot } from 'valtio';
import { designerStore, setPhase, toggleExplodedView, undo, redo, deleteSelectedComponent, duplicateSelectedComponent } from '../../store/designerStore';
import { pricingStore } from '../../store/pricingStore';
import { Sidebar } from '../ui/Sidebar';
import { IconButton } from '../ui/IconButton';
import { ComponentPalette } from './ComponentPalette';
import { ArrowLeft, Layers, Share2, Undo2, Redo2, Copy, Trash2, Download, Upload } from 'lucide-react';
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
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Properties
          </h2>
          {state.selectedComponentIds.length === 0 ? (
            <p style={{ color: 'var(--text)', textAlign: 'center', marginTop: '40px' }}>
              Select a component in the 3D view to edit its properties.
            </p>
          ) : (
            <div>
              <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-h)' }}>
                  {state.components.find(c => c.instanceId === state.selectedComponentIds[0])?.name || 'Component'}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button 
                  onClick={duplicateSelectedComponent}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-h)' }}
                >
                  <Copy size={16} /> Duplicate
                </button>
                <button 
                  onClick={deleteSelectedComponent}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </Sidebar>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene />
      </div>
    </div>
  );
}
