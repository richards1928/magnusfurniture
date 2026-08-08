import { useSnapshot } from 'valtio';
import { designerStore } from '../store/designerStore';
import { SelectionScreen } from '../components/designer/SelectionScreen';
import { Workspace } from '../components/designer/Workspace';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function DesignerPage() {
  const state = useSnapshot(designerStore);

  // Set body to hidden overflow while in the designer to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#0d0f17' }}>
      
      {/* Custom Back Button overlayed only on Selection phase to prevent overlapping workspace sidebar */}
      {state.phase === 'selection' && (
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
          <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              color: '#f8fafc',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.95)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)'}
            >
              <ArrowLeft size={16} /> Exit Designer
            </button>
          </Link>
        </div>
      )}

      {/* Main Designer Components */}
      {state.phase === 'selection' ? <SelectionScreen /> : <Workspace />}
    </div>
  );
}
