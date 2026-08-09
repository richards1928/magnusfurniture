import { useEffect } from 'react';

const LAST_UPDATED = 'August 9, 2026';

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    body: `Magnus Office Furniture ("Magnus", "we", "us", or "our") is committed to protecting the privacy of visitors to our website and clients who contact us for products or services. This Privacy Policy explains what information we may collect, how we use it, and your rights with respect to that information.\n\nBy using our website at magnusofficefurniture.com, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our website.`,
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    body: `We may collect the following categories of information:\n\n• Contact Information: When you submit an enquiry, request a quote, or chat with us (including via WhatsApp), you may provide your name, phone number, email address, company name, and business address.\n\n• Technical / Usage Data: Like most websites, we may automatically collect technical data such as your IP address, browser type, referring URL, pages visited, and session duration. This data is collected through standard server logs and, where applicable, analytics tools.\n\n• Communications: Records of correspondence between you and Magnus Office Furniture, including email and WhatsApp messages.\n\n• Showroom Visit Preferences: If you schedule a visit or consultation, we may record your preferred date, product interests, and workspace requirements.`,
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Information',
    body: `We use the information we collect to:\n\n• Respond to enquiries, provide quotations, and deliver requested services.\n• Communicate product availability, pricing updates, and order status.\n• Improve our website, services, and customer experience.\n• Maintain records of transactions and business communications.\n• Comply with applicable legal obligations.\n\nWe do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    id: 'contact-enquiry',
    title: '4. Contact & Enquiry Information',
    body: `When you contact Magnus Office Furniture via our website contact form, email, or WhatsApp, we retain your contact details and the content of your enquiry in order to follow up and maintain service continuity.\n\nThis information is used solely to respond to your request and manage our business relationship with you. We do not share enquiry details with third parties unless required to fulfil your order (e.g., delivery partners).`,
  },
  {
    id: 'cookies',
    title: '5. Cookies and Website Analytics',
    body: `Our website may use cookies — small text files stored on your device — to improve the browsing experience. These may include:\n\n• Essential cookies required for the website to function correctly.\n• Analytics cookies to help us understand how visitors use our website (e.g., pages visited, session length).\n\nYou can control or disable cookies through your browser settings. Disabling certain cookies may affect website functionality.\n\nNote: We do not currently use third-party advertising cookies or behavioural tracking cookies.`,
  },
  {
    id: 'third-party',
    title: '6. Third-Party Services',
    body: `Our website may include links to and integrations with third-party services, including:\n\n• Google Maps — for displaying our showroom location. Google's own Privacy Policy applies.\n• WhatsApp (Meta) — for direct communication. WhatsApp's Privacy Policy governs those interactions.\n\nMagnus Office Furniture is not responsible for the privacy practices of third-party websites or services. We encourage you to review their respective privacy policies.`,
  },
  {
    id: 'data-security',
    title: '7. Data Security',
    body: `We take reasonable measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.\n\n[Business/Legal Note: Specific technical security certifications or infrastructure details should be confirmed and updated here by the Magnus IT/legal team.]`,
  },
  {
    id: 'data-retention',
    title: '8. Data Retention',
    body: `We retain your personal information for as long as is necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.\n\nEnquiry records are generally retained for a period of up to three (3) years, unless a longer retention period is required by law or legitimate business necessity.\n\n[Business/Legal Note: Confirm and adjust data retention periods according to Magnus business policy and applicable Indian data protection regulations.]`,
  },
  {
    id: 'your-rights',
    title: '9. Your Rights',
    body: `Subject to applicable law, you may have the right to:\n\n• Request access to the personal information we hold about you.\n• Request correction of inaccurate or incomplete information.\n• Request deletion of your personal information, where we are not legally required to retain it.\n• Withdraw consent, where processing is based on your consent.\n\nTo exercise any of these rights, please contact us at hello@magnusofficefurniture.com.\n\n[Business/Legal Note: Rights available to individuals are subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023. Legal review is recommended to confirm specific obligations.]`,
  },
  {
    id: 'childrens',
    title: '10. Children\'s Privacy',
    body: `Our website and services are intended for business and professional use and are not directed at children under the age of 18. We do not knowingly collect personal information from individuals under 18. If you believe we have inadvertently collected such information, please contact us and we will take steps to delete it.`,
  },
  {
    id: 'changes',
    title: '11. Changes to This Privacy Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. When we make changes, we will update the "Last Updated" date at the top of this page.\n\nWe encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:\n\nMagnus Office Furniture\nBP Raju Marg, M R Elite, 3rd Floor\nAbove BKP Homes, Opposite Sarath City\nRatnadeep Right Side Lane, Kondapur\nHyderabad, Telangana – 500084\n\nPhone: +91 90906 26209\nEmail: hello@magnusofficefurniture.com`,
  },
];

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Magnus Office Furniture';
  }, []);

  return (
    <div style={{ background: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: 96 }}>
      {/* Page header band */}
      <div
        style={{
          background: 'linear-gradient(135deg, #130f0c 0%, #1e1814 60%, #2a2118 100%)',
          paddingTop: 'calc(var(--nav-height) + 64px)',
          paddingBottom: 64,
          borderBottom: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginBottom: 16,
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 600,
              color: '#fff',
              marginBottom: 12,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em' }}>
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 820, paddingTop: 64 }}>
        {/* Intro note */}
        <div
          style={{
            background: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.18)',
            borderRadius: 12,
            padding: '20px 24px',
            marginBottom: 52,
            fontSize: '0.92rem',
            color: 'var(--color-gray-600)',
            lineHeight: 1.75,
          }}
        >
          This policy describes how Magnus Office Furniture collects, uses, and safeguards information you provide when visiting our website or contacting us for products and services.
        </div>

        {/* Sections */}
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.id}
            id={sec.id}
            style={{
              marginBottom: 48,
              paddingBottom: 48,
              borderBottom: i < SECTIONS.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 22,
                  borderRadius: 2,
                  background: '#D4AF37',
                  flexShrink: 0,
                }}
              />
              {sec.title}
            </h2>
            <div style={{ fontSize: '0.97rem', color: 'var(--color-gray-600)', lineHeight: 1.9 }}>
              {sec.body.split('\n').map((line, li) =>
                line.trim() === '' ? (
                  <div key={li} style={{ height: 12 }} />
                ) : (
                  <p key={li} style={{ margin: 0, marginBottom: 4 }}>
                    {line}
                  </p>
                )
              )}
            </div>
          </div>
        ))}

        {/* Contact card */}
        <div
          style={{
            marginTop: 16,
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.20)',
            borderRadius: 16,
            padding: '32px 36px',
            boxShadow: '0 4px 24px rgba(62,39,35,0.06)',
          }}
        >
          <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: 10 }}>
            Questions?
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--color-dark)', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 16 }}>
            Contact our team for any privacy-related enquiries.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="tel:+919090626209"
              style={{ fontSize: '0.92rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}
            >
              +91 90906 26209
            </a>
            <span style={{ color: 'var(--color-gray-300)' }}>|</span>
            <a
              href="mailto:hello@magnusofficefurniture.com"
              style={{ fontSize: '0.92rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}
            >
              hello@magnusofficefurniture.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
