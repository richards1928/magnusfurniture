import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Image,
  MessageSquareQuote,
  Users,
  Wand2,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
  { to: '/admin/workspace-requests', icon: Wand2, label: 'Workspace Requests' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const width = collapsed ? 72 : 260;

  return (
    <aside
      style={{
        width,
        minHeight: '100vh',
        background: '#1A1612',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 16px' : '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minHeight: 72,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: '#D4AF37',
            color: '#1A1612',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 16,
            fontFamily: 'var(--font-heading)',
            flexShrink: 0,
          }}
        >
          M
        </div>

        {!collapsed && (
          <div>
            <div
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.05em',
              }}
            >
              MAGNUS
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Admin Portal
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {links.map((link) => {
          const isActive = link.end
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '12px 16px' : '10px 16px',
                borderRadius: 10,
                textDecoration: 'none',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                background: isActive
                  ? 'rgba(212,175,55,0.12)'
                  : 'transparent',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <link.icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        style={{
          padding: '12px 8px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 12,
            width: '100%',
            padding: '10px 16px',
            borderRadius: 10,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 13,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.15s ease',
          }}
        >
          <ChevronLeft
            size={16}
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s',
            }}
          />
          {!collapsed && 'Collapse'}
        </button>

        {!collapsed && user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              marginTop: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.2)',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {user.name.charAt(0)}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name}
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 11,
                }}
              >
                {user.role.replace('_', ' ')}
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              style={{
                color: 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 4,
              }}
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}