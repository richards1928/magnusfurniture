import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title?: string;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IconButton({ 
  icon: Icon, 
  onClick, 
  title, 
  isActive = false,
  variant = 'secondary',
  size = 'md',
  className = ''
}: IconButtonProps) {
  
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
  };

  const variants = {
    primary: {
      backgroundColor: isActive ? 'var(--accent)' : 'var(--accent-bg)',
      color: isActive ? '#fff' : 'var(--accent)',
      boxShadow: isActive ? '0 0 15px var(--accent-border)' : 'none',
    },
    secondary: {
      backgroundColor: isActive ? 'var(--border)' : 'rgba(255, 255, 255, 0.1)',
      color: 'var(--text-h)',
      border: '1px solid var(--border)',
    },
    danger: {
      backgroundColor: isActive ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
      color: isActive ? '#fff' : '#ef4444',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isActive ? 'var(--accent)' : 'var(--text)',
    }
  };

  const sizes = {
    sm: { width: 32, height: 32, padding: 6 },
    md: { width: 40, height: 40, padding: 8 },
    lg: { width: 48, height: 48, padding: 12 },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={title}
      className={className}
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
      }}
    >
      <Icon size={sizes[size].width - sizes[size].padding * 2} />
    </motion.button>
  );
}
