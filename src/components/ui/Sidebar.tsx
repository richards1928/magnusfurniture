import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface SidebarProps {
  side: 'left' | 'right';
  isOpen: boolean;
  children: ReactNode;
  width?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({ 
  side, 
  isOpen, 
  children, 
  width = 270, 
  isCollapsed = false, 
  onToggleCollapse, 
  className = '' 
}: SidebarProps) {
  const isLeft = side === 'left';
  
  const currentWidth = isCollapsed ? 60 : width;

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      width: currentWidth,
      transition: { type: 'spring' as const, stiffness: 350, damping: 32 }
    },
    closed: {
      x: isLeft ? -currentWidth - 30 : currentWidth + 30,
      opacity: 0,
      width: currentWidth,
      transition: { type: 'spring' as const, stiffness: 350, damping: 32 }
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
          onWheel={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: 20,
            bottom: 20,
            [isLeft ? 'left' : 'right']: 20,
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 20,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={className}
        >
          {/* Collapse Toggle Button */}
          {onToggleCollapse && (
            <div style={{
              position: 'absolute',
              top: 14,
              right: isLeft ? 12 : 'auto',
              left: !isLeft ? 12 : 'auto',
              zIndex: 20
            }}>
              <Tooltip content={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"} position={isLeft ? "right" : "left"}>
                <button
                  onClick={onToggleCollapse}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  {isLeft ? (
                    isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
                  ) : (
                    isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                  )}
                </button>
              </Tooltip>
            </div>
          )}

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
