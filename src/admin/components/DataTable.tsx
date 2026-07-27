import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  pageSize?: number;
  searchKeys?: string[];
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data, columns, onRowClick, pageSize = 10, searchKeys = [], actions, emptyMessage = 'No data found.',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKeys.length) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        searchKeys.some(key => String(item[key] ?? '').toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div>
      {/* Search */}
      {searchKeys.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', background: '#FAFAFA', borderRadius: 10,
          border: '1px solid #E5E5E5', marginBottom: 20,
        }}>
          <Search size={16} color="#AAA" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search..."
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: '#1A1A1A', fontFamily: 'var(--font-body)',
            }}
          />
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #EBEBEB' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              {columns.map(col => (
                <th key={col.key}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  style={{
                    padding: '14px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: '#888',
                    borderBottom: '1px solid #EBEBEB',
                    cursor: col.sortable ? 'pointer' : 'default',
                    width: col.width,
                    userSelect: 'none',
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
              {actions && (
                <th style={{
                  padding: '14px 16px', textAlign: 'right',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#888',
                  borderBottom: '1px solid #EBEBEB', width: 120,
                }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} style={{
                  padding: 48, textAlign: 'center', color: '#AAA', fontSize: 14,
                }}>{emptyMessage}</td>
              </tr>
            ) : paged.map((item, i) => (
              <tr key={i}
                onClick={() => onRowClick?.(item)}
                style={{
                  borderBottom: '1px solid #F5F5F5',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '14px 16px', fontSize: 14, color: '#333' }}>
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
                {actions && (
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 16, fontSize: 13, color: '#888',
        }}>
          <span>Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              style={{
                padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E5E5',
                background: '#fff', cursor: page === 0 ? 'default' : 'pointer',
                opacity: page === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center',
              }}
            ><ChevronLeft size={14} /></button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E5E5',
                background: '#fff', cursor: page >= totalPages - 1 ? 'default' : 'pointer',
                opacity: page >= totalPages - 1 ? 0.4 : 1, display: 'flex', alignItems: 'center',
              }}
            ><ChevronRight size={14} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
