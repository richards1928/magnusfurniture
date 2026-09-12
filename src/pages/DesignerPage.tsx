import { useSnapshot } from 'valtio';
import { designerStore } from '../store/designerStore';
import { SelectionScreen } from '../components/designer/SelectionScreen';
import { Workspace } from '../components/designer/Workspace';
import { useEffect } from 'react';

export function DesignerPage() {
  const state = useSnapshot(designerStore);

  // Set body to hidden overflow only while in the 3D workspace to prevent page scroll interfering with orbit controls
  useEffect(() => {
    if (state.phase !== 'selection') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [state.phase]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflowY: state.phase === 'selection' ? 'auto' : 'hidden',
      overflowX: 'hidden', 
      position: 'relative', 
      background: '#0a0c12' 
    }}>

      {/* Main Designer Components */}
      {state.phase === 'selection' ? <SelectionScreen /> : <Workspace />}
    </div>
  );
}
