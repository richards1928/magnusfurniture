import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  target?: string;
  style?: CSSProperties;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  target,
  style,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '8px 20px', fontSize: 'var(--fs-small)' },
    md: { padding: '12px 28px', fontSize: 'var(--fs-body)' },
    lg: { padding: '16px 36px', fontSize: 'var(--fs-body-lg)' },
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      background: 'var(--color-dark)',
      color: '#fff',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-gray-700)',
      border: 'none',
    },
    whatsapp: {
      background: 'var(--color-whatsapp)',
      color: '#fff',
      border: 'none',
      boxShadow: 'var(--shadow-sm)',
    },
  };

  const hoverStyles: Record<string, any> = {
    primary: {
      background: 'var(--color-primary-light)',
      boxShadow: 'var(--shadow-md)',
      scale: 1.02,
    },
    secondary: {
      background: 'var(--color-gray-900)',
      boxShadow: 'var(--shadow-md)',
      scale: 1.02,
    },
    outline: {
      background: 'var(--color-primary-bg)',
      scale: 1.02,
    },
    ghost: {
      background: 'var(--color-gray-100)',
      color: 'var(--color-primary)',
    },
    whatsapp: {
      background: '#20BA56',
      boxShadow: 'var(--shadow-md)',
      scale: 1.02,
    },
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    borderRadius: 'var(--radius-full)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all var(--duration-fast) var(--ease-in-out)',
    letterSpacing: 'var(--ls-wide)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const content = (
    <motion.span
      whileHover={disabled ? {} : hoverStyles[variant]}
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={baseStyle}
      className={className}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled} style={{ background: 'none', border: 'none', padding: 0 }}>
      {content}
    </button>
  );
}
