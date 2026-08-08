import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ content, children, position = 'bottom', delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-6px)' };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-6px)' };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(6px)' };
      case 'bottom':
      default:
        return { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(6px)' };
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      style={{ position: 'relative', display: 'inline-flex' }}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            ...getPositionStyles(),
            zIndex: 1000,
            padding: '5px 10px',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#f8fafc',
            fontSize: '11px',
            fontWeight: 500,
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
