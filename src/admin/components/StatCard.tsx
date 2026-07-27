import type { ReactNode, CSSProperties } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: { value: string; positive: boolean };
  style?: CSSProperties;
}

export function StatCard({ title, value, subtitle, icon, trend, style }: StatCardProps) {
  return (
    <div style={{
      padding: 24, background: '#fff', borderRadius: 16,
      border: '1px solid rgba(0,0,0,0.04)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      display: 'flex', flexDirection: 'column', gap: 12,
      ...style,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#888',
        }}>{title}</span>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(62,39,35,0.06)', color: '#3E2723',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{icon}</div>
        )}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: '#1A1A1A', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {trend && (
          <span style={{
            fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
            background: trend.positive ? 'rgba(45,138,78,0.1)' : 'rgba(192,57,43,0.1)',
            color: trend.positive ? '#2D8A4E' : '#C0392B',
          }}>{trend.value}</span>
        )}
        {subtitle && <span style={{ fontSize: 13, color: '#888' }}>{subtitle}</span>}
      </div>
    </div>
  );
}
