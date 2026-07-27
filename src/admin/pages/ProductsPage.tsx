import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { productsService } from '../services/products.service';
import type { AdminProduct } from '../types/admin.types';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const navigate = useNavigate();

  const load = () => productsService.getAll().then(setProducts);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await productsService.remove(id);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Products</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{products.length} total products</p>
        </div>
        <button onClick={() => navigate('/admin/products/new')} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Add Product</button>
      </div>

      <DataTable
        data={products}
        searchKeys={['name', 'category']}
        columns={[
          { key: 'name', label: 'Product', sortable: true, render: (p) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: p.images[0] ? `url(${p.images[0]}) center/cover` : '#F5F5F5',
                border: '1px solid #EBEBEB', flexShrink: 0,
              }} />
              <div>
                <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{p.slug}</div>
              </div>
            </div>
          )},
          { key: 'category', label: 'Category', sortable: true },
          { key: 'price', label: 'Price', sortable: true, render: (p) => (
            <span style={{ fontWeight: 600 }}>₹{p.price.toLocaleString('en-IN')}</span>
          )},
          { key: 'status', label: 'Status', render: (p) => (
            <span style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              background: p.status === 'active' ? 'rgba(45,138,78,0.1)' : 'rgba(0,0,0,0.05)',
              color: p.status === 'active' ? '#2D8A4E' : '#888',
            }}>{p.status}</span>
          )},
          { key: 'featured', label: 'Featured', render: (p) => p.featured ? '★' : '—' },
        ]}
        actions={(p) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/products/${p.id}`); }} style={{
              padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer',
            }}><Edit size={14} color="#666" /></button>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} style={{
              padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer',
            }}><Trash2 size={14} color="#C0392B" /></button>
          </div>
        )}
        emptyMessage="No products yet. Click 'Add Product' to create your first product."
      />
    </div>
  );
}
