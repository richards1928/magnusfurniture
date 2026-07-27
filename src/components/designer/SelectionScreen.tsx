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
      background: 'radial-gradient(circle at 50% -20%, var(--accent-bg), var(--bg))'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', background: 'linear-gradient(90deg, var(--text-h), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Design Your Perfect Space
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '600px', margin: '0 auto' }}>
          Select a furniture type below to start customizing. Our interactive 3D builder lets you drag, drop, and design to your exact specifications.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        width: '100%',
        maxWidth: '1200px'
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
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '32px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow)',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>
              {ft.icon}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{ft.name}</h2>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {ft.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
