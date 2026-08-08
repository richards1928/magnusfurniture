import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { designerStore, selectFurniture, commitHistory } from '../../store/designerStore';
import { furnitureTypes } from '../../data/furniture-types';
import { tablePresets, applyPreset } from '../../data/table-presets';
import { validateScene } from '../../engine/validationEngine';
import { Layers, Palette, Ruler, Sparkles, ChevronDown, Check } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export function DesignModeBar() {
  const state = useSnapshot(designerStore);
  const [activeTab, setActiveTab] = useState<'build' | 'materials' | 'dimensions' | 'presets'>('build');
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  const currentType = furnitureTypes.find(t => t.id === state.selectedFurnitureType);

  const toggleMeasurements = () => {
    designerStore.showMeasurements = !designerStore.showMeasurements;
  };

  return (
    <div style={{
      position: 'absolute',
      top: 18,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 25,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '6px 10px',
      borderRadius: 18,
      border: '1px solid rgba(255, 255, 255, 0.14)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
    }}>
      {/* 1. Table Type Selector Dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            setShowTypeMenu(!showTypeMenu);
            setShowPresetMenu(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 12,
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: '#38bdf8',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <span>{currentType?.icon || '🪑'}</span>
          <span>{currentType?.name || 'Select Table'}</span>
          <ChevronDown size={14} />
        </button>

        {showTypeMenu && (
          <div style={{
            position: 'absolute',
            top: '115%',
            left: 0,
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 14,
            padding: 6,
            minWidth: 200,
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {furnitureTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  selectFurniture(type.id as any);
                  setShowTypeMenu(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: state.selectedFurnitureType === type.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: state.selectedFurnitureType === type.id ? '#38bdf8' : '#cbd5e1',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = state.selectedFurnitureType === type.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent'}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
                {state.selectedFurnitureType === type.id && <Check size={14} style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ width: 1, height: 22, background: 'rgba(255, 255, 255, 0.12)', margin: '0 2px' }} />

      {/* 2. Design Mode Buttons */}
      <Tooltip content="Parts & Component Assembly" position="bottom">
        <button
          onClick={() => setActiveTab('build')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 10,
            background: activeTab === 'build' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
            border: activeTab === 'build' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
            color: activeTab === 'build' ? '#ffffff' : '#94a3b8',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Layers size={15} style={{ color: activeTab === 'build' ? '#38bdf8' : '#94a3b8' }} />
          <span>Assembly</span>
        </button>
      </Tooltip>

      <Tooltip content="Materials & Color Finishes" position="bottom">
        <button
          onClick={() => setActiveTab('materials')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 10,
            background: activeTab === 'materials' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
            border: activeTab === 'materials' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
            color: activeTab === 'materials' ? '#ffffff' : '#94a3b8',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Palette size={15} style={{ color: activeTab === 'materials' ? '#f59e0b' : '#94a3b8' }} />
          <span>Finishes</span>
        </button>
      </Tooltip>

      <Tooltip content="Toggle Live 3D Bounding Box Measurements (W x H x D)" position="bottom">
        <button
          onClick={() => {
            setActiveTab('dimensions');
            toggleMeasurements();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 10,
            background: state.showMeasurements ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            border: state.showMeasurements ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
            color: state.showMeasurements ? '#38bdf8' : '#94a3b8',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Ruler size={15} />
          <span>3D Scale {state.showMeasurements ? '(ON)' : '(OFF)'}</span>
        </button>
      </Tooltip>

      {/* 3. Preset Templates Dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            setShowPresetMenu(!showPresetMenu);
            setShowTypeMenu(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(56, 189, 248, 0.25) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: '#e9d5ff',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Sparkles size={15} style={{ color: '#c084fc' }} />
          <span>Style Templates</span>
          <ChevronDown size={14} />
        </button>

        {showPresetMenu && (
          <div style={{
            position: 'absolute',
            top: '115%',
            right: 0,
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 14,
            padding: 8,
            minWidth: 260,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', padding: '4px 6px', letterSpacing: '0.05em' }}>
              POPULAR DESIGN TEMPLATES
            </div>
            {tablePresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => {
                  applyPreset(preset.id, designerStore, commitHistory, validateScene);
                  setShowPresetMenu(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 10px',
                  borderRadius: 10,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#f8fafc',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{preset.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>{preset.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{preset.category}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8' }}>
                  ₹{preset.price.toLocaleString('en-IN')}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
