import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { designerStore } from '../../store/designerStore';
import { workspaceService } from '../../admin/services/workspace.service';
import { X, CheckCircle, AlertCircle, Send, Box } from 'lucide-react';
import { validator } from '../../lib/validation';

interface DesignerQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignerQuoteModal({ isOpen, onClose }: DesignerQuoteModalProps) {
  const state = useSnapshot(designerStore);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const emailCheck = validator.validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    const phoneCheck = validator.validatePhone(phone);
    if (!phoneCheck.isValid) {
      setErrorMessage(phoneCheck.error || 'Please enter a valid phone number.');
      return;
    }

    const cleanName = validator.sanitizeText(name, 100);
    if (!cleanName) {
      setErrorMessage('Full name is required.');
      return;
    }

    const cleanCompany = validator.sanitizeText(company, 150);
    const cleanNotes = validator.sanitizeText(notes, 2000);

    setSubmitting(true);
    setErrorMessage(null);

    try {
      // Serialize full 3D configuration data: components, dimensions, materials, colors, positions
      const designPayload = {
        furnitureType: state.selectedFurnitureType,
        componentCount: state.components.length,
        components: state.components.map(c => ({
          instanceId: c.instanceId,
          name: c.name,
          dimensions: c.dimensions,
          material: c.material,
          color: c.color,
          position: c.position,
          rotation: c.rotation,
          properties: c.properties,
        })),
        createdAt: new Date().toISOString(),
      };

      const designStr = JSON.stringify(designPayload);
      const designCheck = validator.validateDesignData(designStr);
      if (!designCheck.isValid) {
        setErrorMessage(designCheck.error || '3D scene data is invalid.');
        setSubmitting(false);
        return;
      }

      await workspaceService.create({
        companyName: cleanCompany || 'Individual / Startup',
        contactName: cleanName,
        email: emailCheck.sanitizedValue!,
        phone: phoneCheck.sanitizedValue!,
        teamSize: '',
        requirements: `[3D Workspace Quote] Custom design with ${state.components.length} components. Notes: ${cleanNotes}`,
        designData: designStr,
        status: 'pending',
        notes: '',
      });

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2500);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to submit your design proposal. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#131722',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          color: '#f8fafc',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a853', marginBottom: 4 }}>
              3D Workspace Studio
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>
              Request Custom Quote for Design
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(45, 212, 191, 0.1)',
                  color: '#2dd4bf',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>
                Design Quote Request Received!
              </h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Your complete 3D configuration ({state.components.length} components) has been saved. Our CAD engineering team will review your specifications and contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Specs pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: 10,
                  fontSize: 13,
                  color: '#e2e8f0',
                }}
              >
                <Box size={18} color="#d4a853" />
                <span>
                  Configured: <strong style={{ color: '#d4a853' }}>{state.components.length} 3D components</strong> ({state.selectedFurnitureType || 'Custom Table'})
                </span>
              </div>

              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 10,
                    color: '#f87171',
                    fontSize: 13,
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Varma"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#FFFFFF',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Technologies"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#FFFFFF',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#FFFFFF',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90906 26207"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#FFFFFF',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                  Additional Notes or Custom Specifications
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention delivery location, quantities needed, wire-management requirements, etc..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 10,
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  height: 46,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #d4a853 0%, #b8860b 100%)',
                  color: '#0f172a',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 6,
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: '0 4px 18px rgba(212, 168, 83, 0.3)',
                }}
              >
                {submitting ? 'Submitting Design Specifications...' : 'Submit 3D Design for Quote'}
                {!submitting && <Send size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
