import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, style, hover = true, onClick, className }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, boxShadow: 'var(--shadow-lg)' } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow var(--duration-normal) var(--ease-out)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
