import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { leadsService } from '../services/leads.service';
import type { Lead, LeadStatus } from '../types/admin.types';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../components/FormField';

const statusColors: Record<LeadStatus, { bg: string; color: string }> = {
  new: { bg: 'rgba(52,152,219,0.1)', color: '#3498DB' },
  contacted: { bg: 'rgba(230,126,34,0.1)', color: '#E67E22' },
  qualified: { bg: 'rgba(155,89,182,0.1)', color: '#9B59B6' },
  converted: { bg: 'rgba(45,138,78,0.1)', color: '#2D8A4E' },
  closed: { bg: 'rgba(0,0,0,0.05)', color: '#888' },
};

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', source: 'website' as Lead['source'], productInterest: '', status: 'new' as LeadStatus, notes: '' });

  const load = () => leadsService.getAll().then(setLeads);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await leadsService.create(form);
    setForm({ name: '', email: '', phone: '', company: '', message: '', source: 'website', productInterest: '', status: 'new', notes: '' });
    setShowForm(false);
    load();
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    await leadsService.update(id, { status });
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Leads</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{leads.length} customer inquiries</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Add Lead</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          padding: 24, background: '#fff', borderRadius: 16,
          border: '1px solid #EBEBEB', marginBottom: 24,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormField label="Name" value={form.name} onChange={v => set('name', v)} required />
            <FormField label="Email" type="email" value={form.email} onChange={v => set('email', v)} required />
            <FormField label="Phone" value={form.phone} onChange={v => set('phone', v)} required />
            <FormField label="Company" value={form.company} onChange={v => set('company', v)} />
            <FormField label="Source" type="select" value={form.source} onChange={v => set('source', v)}
              options={[{ label: 'Website', value: 'website' }, { label: 'WhatsApp', value: 'whatsapp' }, { label: 'Phone', value: 'phone' }, { label: 'Referral', value: 'referral' }]} />
            <FormField label="Product Interest" value={form.productInterest} onChange={v => set('productInterest', v)} />
          </div>
          <FormField label="Message" type="textarea" value={form.message} onChange={v => set('message', v)} rows={3} style={{ marginBottom: 16 }} />
          <button type="submit" style={{
            padding: '10px 24px', background: '#1A1612', color: '#fff',
            borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
          }}>Save Lead</button>
        </form>
      )}

      <DataTable
        data={leads}
        searchKeys={['name', 'email', 'company']}
        columns={[
          { key: 'name', label: 'Name', sortable: true, render: (l) => (
            <div>
              <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{l.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{l.email}</div>
            </div>
          )},
          { key: 'phone', label: 'Phone' },
          { key: 'source', label: 'Source', render: (l) => (
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>{l.source}</span>
          )},
          { key: 'status', label: 'Status', render: (l) => (
            <select value={l.status} onChange={e => handleStatusChange(l.id, e.target.value as LeadStatus)}
              onClick={e => e.stopPropagation()}
              style={{
                padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                background: statusColors[l.status].bg, color: statusColors[l.status].color,
                border: 'none', cursor: 'pointer',
              }}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          )},
          { key: 'createdAt', label: 'Date', sortable: true, render: (l) => new Date(l.createdAt).toLocaleDateString() },
        ]}
        actions={(l) => (
          <button onClick={async (e) => { e.stopPropagation(); if (confirm('Delete?')) { await leadsService.remove(l.id); load(); } }}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer' }}>
            <Trash2 size={14} color="#C0392B" />
          </button>
        )}
        emptyMessage="No leads yet. Customer inquiries will appear here."
      />
    </div>
  );
}
