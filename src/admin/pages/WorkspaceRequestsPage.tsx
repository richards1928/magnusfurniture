import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { workspaceService } from '../services/workspace.service';
import type { WorkspaceRequest, WorkspaceRequestStatus } from '../types/admin.types';
import { Plus, Trash2, Eye, X, Box } from 'lucide-react';
import { FormField } from '../components/FormField';

const statusColors: Record<WorkspaceRequestStatus, { bg: string; color: string }> = {
  pending: { bg: 'rgba(230,126,34,0.1)', color: '#E67E22' },
  in_review: { bg: 'rgba(52,152,219,0.1)', color: '#3498DB' },
  quoted: { bg: 'rgba(155,89,182,0.1)', color: '#9B59B6' },
  approved: { bg: 'rgba(45,138,78,0.1)', color: '#2D8A4E' },
  completed: { bg: 'rgba(45,138,78,0.15)', color: '#1A6B3A' },
  cancelled: { bg: 'rgba(0,0,0,0.05)', color: '#888' },
};

interface DesignComponent {
  instanceId?: string;
  name?: string;
  dimensions?: { width: number; height: number; depth: number };
  material?: string;
  color?: string;
  position?: { x: number; y: number; z: number };
}

interface ParsedDesignData {
  furnitureType?: string;
  componentCount?: number;
  components?: DesignComponent[];
  createdAt?: string;
}

export function WorkspaceRequestsPage() {
  const [requests, setRequests] = useState<WorkspaceRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<WorkspaceRequest | null>(null);
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

  const parseDesignData = (raw?: string | null): ParsedDesignData | null => {
    if (!raw) return null;
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (Array.isArray(parsed)) {
        return { componentCount: parsed.length, components: parsed };
      }
      return parsed as ParsedDesignData;
    } catch {
      return null;
    }
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
          { key: 'designData', label: '3D Specs', render: (r) => {
            const has3D = Boolean(r.designData);
            return has3D ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(212, 168, 83, 0.15)', color: '#B8860B', fontSize: 11, fontWeight: 700 }}>
                <Box size={12} /> 3D Scene
              </span>
            ) : (
              <span style={{ color: '#aaa', fontSize: 12 }}>Standard</span>
            );
          }},
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
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedRequest(r); }}
              title="View Details & 3D Specs"
              style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Eye size={14} color="#1A1A1A" />
            </button>
            <button
              onClick={async (e) => { e.stopPropagation(); if (confirm('Delete?')) { await workspaceService.remove(r.id); load(); } }}
              title="Delete"
              style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Trash2 size={14} color="#C0392B" />
            </button>
          </div>
        )}
        emptyMessage="No workspace requests yet."
      />

      {/* Details & 3D Specs Modal */}
      {selectedRequest && (() => {
        const design = parseDesignData(selectedRequest.designData);
        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
            onClick={() => setSelectedRequest(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 680,
                maxHeight: '90vh',
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #EBEBEB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                    {selectedRequest.companyName}
                  </h3>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    Contact: {selectedRequest.contactName} • {selectedRequest.email} • {selectedRequest.phone}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <X size={20} color="#888" />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Meta details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: 14, background: '#F9F9F9', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Status</div>
                    <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{selectedRequest.status.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Team Size</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedRequest.teamSize || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Timeline</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedRequest.timeline || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Budget</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedRequest.budget || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Floor Area</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedRequest.floorArea || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>Submitted Date</div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{new Date(selectedRequest.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Requirements / Notes</div>
                  <div style={{ padding: 12, background: '#F5F5F5', borderRadius: 8, fontSize: 13, color: '#333', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {selectedRequest.requirements || 'No specific requirements notes provided.'}
                  </div>
                </div>

                {/* 3D Designer Specifications */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Box size={16} color="#B8860B" /> 3D Workspace Scene Configuration
                    </div>
                    {design?.components && design.components.length > 0 && (
                      <span style={{ fontSize: 12, color: '#888' }}>
                        {design.components.length} components
                      </span>
                    )}
                  </div>

                  {design?.components && design.components.length > 0 ? (
                    <div style={{ border: '1px solid #EBEBEB', borderRadius: 10, overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <thead>
                          <tr style={{ background: '#F9F9F9', borderBottom: '1px solid #EBEBEB', textAlign: 'left' }}>
                            <th style={{ padding: '8px 12px' }}>Component</th>
                            <th style={{ padding: '8px 12px' }}>Dimensions (cm)</th>
                            <th style={{ padding: '8px 12px' }}>Material</th>
                            <th style={{ padding: '8px 12px' }}>Color</th>
                          </tr>
                        </thead>
                        <tbody>
                          {design.components.map((c, i) => (
                            <tr key={i} style={{ borderBottom: i < (design.components?.length ?? 0) - 1 ? '1px solid #F0F0F0' : 'none' }}>
                              <td style={{ padding: '8px 12px', fontWeight: 600 }}>{c.name || 'Component'}</td>
                              <td style={{ padding: '8px 12px', color: '#666' }}>
                                {c.dimensions ? `${c.dimensions.width}W × ${c.dimensions.depth}D × ${c.dimensions.height}H` : 'N/A'}
                              </td>
                              <td style={{ padding: '8px 12px', color: '#666', textTransform: 'capitalize' }}>{c.material || 'Default'}</td>
                              <td style={{ padding: '8px 12px', color: '#666' }}>
                                {c.color ? (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, border: '1px solid #ccc' }} />
                                    {c.color}
                                  </span>
                                ) : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ padding: 14, background: '#FAFAFA', borderRadius: 8, fontSize: 12, color: '#888' }}>
                      No 3D canvas objects attached to this request (Standard quotation form submission).
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '14px 24px', borderTop: '1px solid #EBEBEB', display: 'flex', justifyContent: 'flex-end', background: '#FAFAFA' }}>
                <button
                  onClick={() => setSelectedRequest(null)}
                  style={{ padding: '8px 18px', background: '#1A1612', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
