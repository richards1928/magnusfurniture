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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* Custom Back Button overlayed on top of the designer */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
        <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 'var(--radius-full)',
            background: 'var(--color-white)',
            border: '1px solid var(--color-gray-200)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--color-dark)',
            fontSize: 'var(--fs-small)',
            fontWeight: 'var(--fw-semibold)',
            cursor: 'pointer',
          }}>
            <ArrowLeft size={16} /> Exit Workspace Designer
          </button>
        </Link>
      </div>

      {/* Render the original standalone application components */}
      {state.phase === 'selection' ? <SelectionScreen /> : <Workspace />}
    </div>
  );
}
