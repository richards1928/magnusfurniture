import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { designerStore, selectFurniture } from '../../store/designerStore';
import { furnitureTypes } from '../../data/furniture-types';

export function SelectionScreen() {
  useSnapshot(designerStore);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: 'radial-gradient(circle at 50% 30%, #1a1e2e 0%, #0a0c14 100%)',
      color: '#f8fafc'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          3D Workspace Configurator
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #d4a853 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Select Furniture Workspace
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
          Choose a baseline furniture configuration to customize dimensions, materials, finishes, and storage layout in real-time 3D.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '28px',
        width: '100%',
        maxWidth: '1100px'
      }}>
        {furnitureTypes.map((ft, i) => (
          <motion.div
            key={ft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectFurniture(ft.id)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '36px 28px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
              e.currentTarget.style.boxShadow = '0 24px 50px rgba(56, 189, 248, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '20px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}>
              {ft.icon}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
              {ft.name}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {ft.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
