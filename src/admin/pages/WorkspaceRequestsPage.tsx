import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { workspaceService } from '../services/workspace.service';
import type { WorkspaceRequest, WorkspaceRequestStatus } from '../types/admin.types';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../components/FormField';

const statusColors: Record<WorkspaceRequestStatus, { bg: string; color: string }> = {
  pending: { bg: 'rgba(230,126,34,0.1)', color: '#E67E22' },
  in_review: { bg: 'rgba(52,152,219,0.1)', color: '#3498DB' },
  quoted: { bg: 'rgba(155,89,182,0.1)', color: '#9B59B6' },
  approved: { bg: 'rgba(45,138,78,0.1)', color: '#2D8A4E' },
  completed: { bg: 'rgba(45,138,78,0.15)', color: '#1A6B3A' },
  cancelled: { bg: 'rgba(0,0,0,0.05)', color: '#888' },
};

export function WorkspaceRequestsPage() {
  const [requests, setRequests] = useState<WorkspaceRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ companyName: '', contactName: '', email: '', phone: '', teamSize: '', floorArea: '', requirements: '', budget: '', timeline: '', status: 'pending' as WorkspaceRequestStatus, notes: '' });

  const load = () => workspaceService.getAll().then(setRequests);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await workspaceService.create(form);
    setForm({ companyName: '', contactName: '', email: '', phone: '', teamSize: '', floorArea: '', requirements: '', budget: '', timeline: '', status: 'pending', notes: '' });
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Workspace Requests</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{requests.length} design submissions</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Add Request</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormField label="Company Name" value={form.companyName} onChange={v => set('companyName', v)} required />
            <FormField label="Contact Name" value={form.contactName} onChange={v => set('contactName', v)} required />
            <FormField label="Email" type="email" value={form.email} onChange={v => set('email', v)} required />
            <FormField label="Phone" value={form.phone} onChange={v => set('phone', v)} required />
            <FormField label="Team Size" value={form.teamSize} onChange={v => set('teamSize', v)} placeholder="e.g. 50 people" />
            <FormField label="Floor Area" value={form.floorArea} onChange={v => set('floorArea', v)} placeholder="e.g. 3000 sq ft" />
            <FormField label="Budget" value={form.budget} onChange={v => set('budget', v)} placeholder="e.g. ₹5-8 Lakhs" />
            <FormField label="Timeline" value={form.timeline} onChange={v => set('timeline', v)} placeholder="e.g. 4 weeks" />
          </div>
          <FormField label="Requirements" type="textarea" value={form.requirements} onChange={v => set('requirements', v)} rows={3} style={{ marginBottom: 16 }} />
          <button type="submit" style={{ padding: '10px 24px', background: '#1A1612', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Save Request</button>
        </form>
      )}

      <DataTable
        data={requests}
        searchKeys={['companyName', 'contactName', 'email']}
        columns={[
          { key: 'companyName', label: 'Company', sortable: true, render: (r) => (
            <div>
              <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{r.companyName}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{r.contactName}</div>
            </div>
          )},
          { key: 'teamSize', label: 'Team Size' },
          { key: 'budget', label: 'Budget' },
          { key: 'status', label: 'Status', render: (r) => (
            <select value={r.status} onChange={async e => { await workspaceService.update(r.id, { status: e.target.value as WorkspaceRequestStatus }); load(); }}
              onClick={e => e.stopPropagation()}
              style={{ padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: statusColors[r.status].bg, color: statusColors[r.status].color, border: 'none', cursor: 'pointer' }}
            >
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="quoted">Quoted</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )},
          { key: 'createdAt', label: 'Date', sortable: true, render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
        actions={(r) => (
          <button onClick={async (e) => { e.stopPropagation(); if (confirm('Delete?')) { await workspaceService.remove(r.id); load(); } }}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer' }}>
            <Trash2 size={14} color="#C0392B" />
          </button>
        )}
        emptyMessage="No workspace requests yet."
      />
    </div>
  );
}
