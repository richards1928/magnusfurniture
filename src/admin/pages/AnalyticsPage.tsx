import { StatCard } from '../components/StatCard';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Business performance insights</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 20, marginBottom: 40,
      }}>
        <StatCard title="Page Views" value="—" icon={<BarChart3 size={18} />} subtitle="Connect analytics to track" />
        <StatCard title="Conversion Rate" value="—" icon={<TrendingUp size={18} />} subtitle="Leads / Visitors" />
        <StatCard title="Avg. Order Value" value="—" icon={<Package size={18} />} subtitle="From quotes" />
        <StatCard title="Active Visitors" value="—" icon={<Users size={18} />} subtitle="Real-time" />
      </div>

      <div style={{
        padding: 48, background: '#fff', borderRadius: 16,
        border: '1px solid #EBEBEB', textAlign: 'center',
      }}>
        <BarChart3 size={48} color="#D4D4D4" style={{ marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Analytics Dashboard</h3>
        <p style={{ fontSize: 14, color: '#888', maxWidth: 400, margin: '0 auto' }}>
          Connect Google Analytics or a custom analytics backend to see real-time visitor data, conversion funnels, and revenue tracking here.
        </p>
      </div>
    </div>
  );
}
