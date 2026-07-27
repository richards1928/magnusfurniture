import type { CSSProperties } from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  style?: CSSProperties;
  rows?: number;
}

const inputStyle: CSSProperties = {
  width: '100%', padding: '12px 16px', fontSize: 14,
  border: '1px solid #E5E5E5', borderRadius: 10,
  background: '#FAFAFA', color: '#1A1A1A',
  fontFamily: 'var(--font-body)',
  outline: 'none', transition: 'border-color 0.2s ease',
};

export function FormField({ label, type = 'text', value, onChange, placeholder, required, options, style, rows = 4 }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <label style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#666',
      }}>
        {label}{required && <span style={{ color: '#C0392B', marginLeft: 2 }}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
          onFocus={e => e.currentTarget.style.borderColor = '#3E2723'}
          onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">Select...</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={inputStyle}
          onFocus={e => e.currentTarget.style.borderColor = '#3E2723'}
          onBlur={e => e.currentTarget.style.borderColor = '#E5E5E5'}
        />
      )}
    </div>
  );
}
