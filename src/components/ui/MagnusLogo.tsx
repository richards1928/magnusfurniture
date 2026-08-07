import type { CSSProperties } from 'react';

/**
 * Magnus Office Furniture — Official Logo Component
 * Renders the brand logo from /logomagnus.png with optional border radius
 */
export function MagnusMonogram({
  size = 40,
  borderRadius = 8,
  style,
  className,
}: {
  size?: number;
  borderRadius?: number | string;
  color?: 'gold' | 'white' | 'dark';
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <img
      src="/logomagnus.png"
      alt="Magnus Logo"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        borderRadius,
        ...style,
      }}
      className={className}
    />
  );
}

/**
 * Full Magnus wordmark: Logo image + MAGNUS / OFFICE FURNITURE text
 * For use in Navbar, Footer, and brand identity contexts.
 */
export function MagnusWordmark({
  height = 40,
  borderRadius = 8,
  color = 'dark',
  style,
  className,
}: {
  height?: number;
  borderRadius?: number | string;
  color?: 'gold' | 'white' | 'dark';
  style?: CSSProperties;
  className?: string;
}) {
  const textColor =
    color === 'white' ? '#FFFFFF' : color === 'gold' ? '#D4AF37' : '#1A1A1A';
  const subColor =
    color === 'white'
      ? 'rgba(255,255,255,0.65)'
      : color === 'gold'
      ? 'rgba(212,175,55,0.75)'
      : '#666666';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height,
        ...style,
      }}
      className={className}
    >
      <img
        src="/logomagnus.png"
        alt="Magnus Logo"
        style={{
          height: height,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          borderRadius,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: height * 0.425,
            color: textColor,
            letterSpacing: '0.1em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          Magnus
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: height * 0.22,
            color: subColor,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginTop: 3,
          }}
        >
          Office Furniture
        </div>
      </div>
    </div>
  );
}

/**
 * Watermark – removed as requested.
 */
export function MagnusWatermark() {
  return null;
}

export default MagnusMonogram;
