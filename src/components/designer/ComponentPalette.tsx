import { useSnapshot } from 'valtio';
import { designerStore, addComponent } from '../../store/designerStore';
import { getFurnitureType } from '../../data/furniture-types';
import { Plus } from 'lucide-react';

export function ComponentPalette() {
  const state = useSnapshot(designerStore);
  
  if (!state.selectedFurnitureType) return null;
  
  const furnitureDef = getFurnitureType(state.selectedFurnitureType);
  if (!furnitureDef) return null;

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        Components
      </h2>
      
      {furnitureDef.componentCategories.map(category => (
        <div key={category.id} style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '12px', letterSpacing: '0.05em' }}>
            {category.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {category.components.map(comp => (
              <div 
                key={comp.id}
                onClick={() => addComponent(comp as any)}
                style={{
                  padding: '16px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: 'var(--shadow)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-h)' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text)', marginTop: '4px' }}>₹{comp.basePrice}</div>
                </div>
                <div style={{ color: 'var(--accent)', background: 'var(--accent-bg)', padding: '6px', borderRadius: '8px' }}>
                  <Plus size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
