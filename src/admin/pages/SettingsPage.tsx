import { useState } from 'react';
import { FormField } from '../components/FormField';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: 'Magnus Office Furniture',
    tagline: 'Premium Office Furniture in Hyderabad',
    phone: '+91 90906 26209',
    email: 'hello@magnusofficefurniture.com',
    whatsapp: '919090626209',
    address: 'M R Elite, 3rd Floor, Opposite Sarath City, Kondapur, Hyderabad 500084',
    seoTitle: 'Magnus Office Furniture | Premium Office Furniture in Hyderabad',
    seoDescription: 'Transform your workspace with Magnus Office Furniture. Premium office chairs, workstations, and conference tables in Hyderabad.',
  });
  const [saved, setSaved] = useState(false);

  const set = (k: string, v: string) => setSettings(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    localStorage.setItem('magnus_admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Manage your business information and site settings</p>
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Business Info */}
        <div style={{ padding: 28, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#1A1A1A' }}>Business Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormField label="Business Name" value={settings.businessName} onChange={v => set('businessName', v)} />
            <FormField label="Tagline" value={settings.tagline} onChange={v => set('tagline', v)} />
            <FormField label="Phone" value={settings.phone} onChange={v => set('phone', v)} />
            <FormField label="Email" type="email" value={settings.email} onChange={v => set('email', v)} />
            <FormField label="WhatsApp Number" value={settings.whatsapp} onChange={v => set('whatsapp', v)} />
          </div>
          <div style={{ marginTop: 16 }}>
            <FormField label="Address" type="textarea" value={settings.address} onChange={v => set('address', v)} rows={2} />
          </div>
        </div>

        {/* SEO */}
        <div style={{ padding: 28, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#1A1A1A' }}>SEO Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormField label="SEO Title" value={settings.seoTitle} onChange={v => set('seoTitle', v)} />
            <FormField label="Meta Description" type="textarea" value={settings.seoDescription} onChange={v => set('seoDescription', v)} rows={3} />
          </div>
        </div>

        <button onClick={handleSave} style={{
          padding: '12px 28px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
        }}>
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
