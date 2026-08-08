import { useSnapshot } from 'valtio';
import { designerStore, selectComponent, toggleLayers } from '../../store/designerStore';
import { Layers, X, Box, Check } from 'lucide-react';

export function LayersPanel() {
  const state = useSnapshot(designerStore);

  if (!state.layersOpen) return null;

  // Group components by categories or types
  const tops = state.components.filter(c => c.definitionId.includes('top') || c.definitionId.includes('console'));
  const legs = state.components.filter(c => c.definitionId.includes('leg'));
  const storage = state.components.filter(c => c.definitionId.includes('drawer') || c.definitionId.includes('shelf'));
  const others = state.components.filter(c => !tops.includes(c) && !legs.includes(c) && !storage.includes(c));

  const groups = [
    { title: 'Table Tops', items: tops },
    { title: 'Legs', items: legs },
    { title: 'Storage & Accessories', items: storage },
    { title: 'Other Components', items: others },
  ].filter(g => g.items.length > 0);

  return (
    <div style={{
      position: 'absolute',
      top: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      width: 320,
      maxHeight: 420,
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: 16,
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      color: '#f8fafc',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700 }}>
          <Layers size={16} style={{ color: '#38bdf8' }} />
          DESIGN COMPONENTS
        </div>
        <button
          onClick={toggleLayers}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: 4,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <X size={16} />
        </button>
      </div>

      {/* Component Tree List */}
      <div style={{ padding: 12, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {groups.length === 0 ? (
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#64748b', fontSize: 13 }}>
            No components added yet.
          </div>
        ) : (
          groups.map(group => (
            <div key={group.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, paddingLeft: 4 }}>
                {group.title} ({group.items.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.items.map((item, idx) => {
                  const isSelected = state.selectedComponentIds.includes(item.instanceId);
                  return (
                    <div
                      key={item.instanceId}
                      onClick={() => selectComponent(item.instanceId)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 13,
                        fontWeight: 500,
                        color: isSelected ? '#38bdf8' : '#cbd5e1',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseOver={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Box size={14} style={{ color: isSelected ? '#38bdf8' : '#64748b' }} />
                        <span>{item.name} #{idx + 1}</span>
                      </div>
                      {isSelected && <Check size={14} style={{ color: '#38bdf8' }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
