import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { designerStore, addComponent } from '../../store/designerStore';
import { getFurnitureType } from '../../data/furniture-types';
import { Plus, ChevronDown, ChevronRight, Layers, Table, Disc, Archive } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export function ComponentPalette() {
  const state = useSnapshot(designerStore);
  
  // Track open state for category accordions
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    tops: true,
    legs: true,
    storage: true,
    console: true,
  });

  if (!state.selectedFurnitureType) return null;
  
  const furnitureDef = getFurnitureType(state.selectedFurnitureType);
  if (!furnitureDef) return null;

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'tops':
      case 'console':
        return <Table size={16} style={{ color: '#38bdf8' }} />;
      case 'legs':
        return <Disc size={16} style={{ color: '#f59e0b' }} />;
      case 'storage':
        return <Archive size={16} style={{ color: '#a855f7' }} />;
      default:
        return <Layers size={16} style={{ color: '#38bdf8' }} />;
    }
  };

  const isCollapsed = state.leftPanelCollapsed;

  // Rail view when collapsed
  if (isCollapsed) {
    return (
      <div style={{
        padding: '20px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        color: '#f8fafc'
      }}>
        {furnitureDef.componentCategories.map(category => (
          <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getCategoryIcon(category.id)}
            </div>

            {category.components.map(comp => (
              <Tooltip key={comp.id} content={`+ Add ${comp.name} (₹${comp.basePrice.toLocaleString('en-IN')})`} position="right">
                <button
                  onClick={() => addComponent(comp as any)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Plus size={18} />
                </button>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Expanded full view
  return (
    <div style={{
      padding: '22px 18px',
      height: '100%',
      overflowY: 'auto',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 700,
        color: '#f8fafc',
        letterSpacing: '0.04em',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>TABLE COMPONENTS</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b' }}>
          {furnitureDef.name}
        </span>
      </div>

      {furnitureDef.componentCategories.map(category => {
        const isOpen = openCategories[category.id] !== false;
        return (
          <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Category Accordion Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '6px 2px',
                cursor: 'pointer',
                color: '#cbd5e1'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </div>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Category Component List */}
            {isOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {category.components.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => addComponent(comp as any)}
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
                      e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#f8fafc' }}>
                        {comp.name}
                      </div>
                      <div style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600, marginTop: 4 }}>
                        ₹{comp.basePrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: 'rgba(56, 189, 248, 0.18)',
                      color: '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}>
                      <Plus size={18} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
