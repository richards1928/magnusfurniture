import type { CSSProperties } from 'react';

/**
 * Magnus Office Furniture — Gold "M" Monogram SVG
 * A premium geometric "M" constructed from the brand's Walnut Charcoal + Champagne Gold palette.
 */
export function MagnusMonogram({
  size = 40,
  color = 'gold',
  style,
  className,
}: {
  size?: number;
  color?: 'gold' | 'white' | 'dark';
  style?: CSSProperties;
  className?: string;
}) {
  const fill =
    color === 'gold'
      ? '#D4AF37'
      : color === 'white'
      ? '#FFFFFF'
      : '#3E2723';

  const accent =
    color === 'gold'
      ? '#B8962E'
      : color === 'white'
      ? 'rgba(255,255,255,0.6)'
      : '#5D4037';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-label="Magnus Office Furniture Monogram"
    >
      {/* Outer hexagonal ring – premium frame */}
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        fill="none"
        stroke={fill}
        strokeWidth="2.5"
        opacity="0.35"
      />

      {/* Inner letter M – bold geometric serif construction */}
      {/* Left stem */}
      <rect x="18" y="28" width="10" height="44" rx="1.5" fill={fill} />
      {/* Right stem */}
      <rect x="72" y="28" width="10" height="44" rx="1.5" fill={fill} />

      {/* Left diagonal going down-right to center */}
      <polygon
        points="18,28 28,28 50,58 44,65"
        fill={fill}
      />
      {/* Right diagonal going down-left to center */}
      <polygon
        points="82,28 72,28 50,58 56,65"
        fill={fill}
      />

      {/* Center V notch – the valley of the M */}
      <polygon
        points="44,65 50,58 56,65 50,72"
        fill={accent}
        opacity="0.8"
      />

      {/* Top serif bars */}
      <rect x="14" y="26" width="18" height="5" rx="1" fill={fill} opacity="0.6" />
      <rect x="68" y="26" width="18" height="5" rx="1" fill={fill} opacity="0.6" />

      {/* Bottom serif bars */}
      <rect x="14" y="67" width="18" height="5" rx="1" fill={fill} opacity="0.6" />
      <rect x="68" y="67" width="18" height="5" rx="1" fill={fill} opacity="0.6" />
    </svg>
  );
}

/**
 * Full Magnus wordmark: gold monogram + MAGNUS / OFFICE FURNITURE text
 * For use in Navbar, Footer, and brand identity contexts.
 */
export function MagnusWordmark({
  height = 40,
  color = 'dark',
  style,
  className,
}: {
  height?: number;
  color?: 'gold' | 'white' | 'dark';
  style?: CSSProperties;
  className?: string;
}) {
  const textColor =
    color === 'white' ? '#FFFFFF' : color === 'gold' ? '#D4AF37' : '#1A1A1A';
  const subColor =
    color === 'white'
      ? 'rgba(255,255,255,0.55)'
      : color === 'gold'
      ? 'rgba(212,175,55,0.65)'
      : '#888888';

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
      <MagnusMonogram size={height} color={color === 'dark' ? 'gold' : color} />
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
 * Watermark – oversized, very low opacity monogram for section backgrounds.
 * Purely decorative; does not interfere with content or layout.
 */
export function MagnusWatermark({
  size = 320,
  color = 'gold',
  opacity = 0.045,
  style,
}: {
  size?: number;
  color?: 'gold' | 'white' | 'dark';
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity,
        ...style,
      }}
    >
      <MagnusMonogram size={size} color={color} />
    </div>
  );
}

export default MagnusMonogram;
