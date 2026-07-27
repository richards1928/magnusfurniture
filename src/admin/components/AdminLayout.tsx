import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../context/AuthContext';

export function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFFDF8', color: '#888', fontSize: 14,
      }}>Loading...</div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F5F2' }}>
      <AdminSidebar />
      <main style={{
        flex: 1, marginLeft: 260, padding: '32px 40px',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
