import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  side: 'left' | 'right';
  isOpen: boolean;
  children: ReactNode;
  width?: number;
  className?: string;
}

export function Sidebar({ side, isOpen, children, width = 320, className = '' }: SidebarProps) {
  const isLeft = side === 'left';
  
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
    },
    closed: {
      x: isLeft ? -width - 20 : width + 20,
      opacity: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          style={{
            position: 'absolute',
            top: 20,
            bottom: 20,
            [isLeft ? 'left' : 'right']: 20,
            width: width,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 24,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
