import { useEffect } from 'react';

const LAST_UPDATED = 'August 9, 2026';

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    body: `These Terms & Conditions ("Terms") govern your use of the Magnus Office Furniture website (magnusofficefurniture.com) and your interactions with Magnus Office Furniture ("Magnus", "we", "us", or "our").\n\nBy accessing or using this website, placing an enquiry, or engaging with our team for products or services, you agree to be bound by these Terms. If you do not agree, please discontinue use of our website.`,
  },
  {
    id: 'website-usage',
    title: '2. Website Usage',
    body: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website.\n\nYou must not:\n\n• Use the site to transmit unlawful, harmful, or fraudulent content.\n• Attempt to gain unauthorised access to any part of our website, systems, or networks.\n• Scrape, copy, or reproduce our product content, pricing, or catalogue without prior written permission.\n\nWe reserve the right to restrict or terminate access to the website at our discretion.`,
  },
  {
    id: 'product-information',
    title: '3. Products & Product Information',
    body: `Magnus Office Furniture provides descriptions, specifications, and images of office furniture products as accurately as possible. However:\n\n• Product images are for illustrative purposes. Actual products may vary slightly in colour, texture, or finish due to photography conditions, material batches, or screen calibration.\n• Product dimensions and specifications are provided in good faith but may be subject to minor manufacturing tolerances.\n• We reserve the right to modify, discontinue, or update any product without prior notice.\n\nFor exact specifications, material samples, or finish confirmation, we recommend visiting our showroom or contacting our team before placing an order.`,
  },
  {
    id: 'pricing',
    title: '4. Pricing & Availability',
    body: `All prices displayed are indicative and subject to change without prior notice. Final pricing will be confirmed at the time of quotation.\n\n• Prices may vary based on product configuration, finish selection, volume, and delivery location.\n• Prices are exclusive of applicable taxes unless otherwise stated.\n• Product availability is subject to stock levels and manufacturing lead times.\n\n[Business/Legal Note: Magnus should confirm whether GST is included or excluded in quoted prices and update this section accordingly.]`,
  },
  {
    id: 'enquiries',
    title: '5. Enquiries and Quotations',
    body: `Submitting an enquiry through our website, email, or WhatsApp does not constitute a binding order or contract. Formal quotations are provided in writing by our sales team upon request.\n\nQuotations issued by Magnus Office Furniture are valid for the period specified in the quotation document. After expiry, pricing and availability are subject to re-confirmation.`,
  },
  {
    id: 'orders-payments',
    title: '6. Orders and Payments',
    body: `Orders are confirmed upon receipt of written acceptance and any applicable advance payment as agreed with our sales team.\n\nPayment terms, advance requirements, and balance schedules will be communicated at the time of order confirmation.\n\n[Business/Legal Note: Specific payment gateway, accepted payment methods, advance percentages, and cancellation/refund conditions should be confirmed by Magnus management and documented here. This section must be completed before publishing these terms for commercial use.]`,
  },
  {
    id: 'delivery',
    title: '7. Delivery',
    body: `Delivery timelines are indicative and subject to product availability, manufacturing schedules, and location accessibility. Magnus Office Furniture will communicate an estimated delivery date upon order confirmation.\n\n• Delivery is available across Hyderabad and surrounding areas. Delivery to other locations is subject to confirmation.\n• Risk and title in products generally transfer to the customer upon successful delivery and acknowledgement.\n• Magnus Office Furniture is not liable for delays caused by circumstances beyond our reasonable control.\n\n[Business/Legal Note: Delivery charges, geographic coverage, and risk transfer terms should be confirmed and updated here.]`,
  },
  {
    id: 'installation',
    title: '8. Installation / Custom Furniture',
    body: `Where installation services are offered, the scope, timeline, and conditions will be defined in the project quotation or agreement.\n\nFor custom furniture orders:\n\n• Custom dimensions, finishes, or designs are confirmed at the time of order placement.\n• Custom orders may be subject to different lead times and advance payment requirements.\n• Changes to custom specifications after order confirmation may not be possible or may incur additional costs.\n\n[Business/Legal Note: Warranty, defect, and modification terms for custom furniture should be confirmed and documented here.]`,
  },
  {
    id: 'ip',
    title: '9. Intellectual Property',
    body: `All content on this website — including text, images, product photographs, logos, design elements, and the Magnus brand identity — is the property of Magnus Office Furniture or its licensors and is protected by applicable intellectual property laws.\n\nYou may not reproduce, distribute, or use any website content without prior written permission from Magnus Office Furniture.`,
  },
  {
    id: 'third-party',
    title: '10. Third-Party Links',
    body: `Our website may contain links to third-party websites, including Google Maps and WhatsApp. These links are provided for convenience only.\n\nMagnus Office Furniture does not endorse, control, or assume responsibility for the content, privacy practices, or reliability of any third-party websites. Accessing third-party links is at your own risk.`,
  },
  {
    id: 'liability',
    title: '11. Limitation of Liability',
    body: `To the fullest extent permitted by applicable law, Magnus Office Furniture shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products.\n\nOur total liability in connection with any claim arising from these Terms shall not exceed the amount paid by you for the relevant product or service.\n\nNothing in these Terms limits liability for fraud, wilful misconduct, or any matter that cannot lawfully be excluded.`,
  },
  {
    id: 'changes',
    title: '12. Changes to These Terms',
    body: `We may update these Terms & Conditions from time to time to reflect changes in our business practices, legal requirements, or operations. The updated version will be published on this page with a revised "Last Updated" date.\n\nContinued use of our website after changes are published constitutes your acceptance of the revised Terms.`,
  },
  {
    id: 'governing-law',
    title: '13. Governing Law',
    body: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.\n\n[Business/Legal Note: Governing law and jurisdiction should be confirmed with a qualified legal advisor before these Terms are finalised for commercial use.]`,
  },
  {
    id: 'contact',
    title: '14. Contact Us',
    body: `If you have any questions regarding these Terms & Conditions, please contact us:\n\nMagnus Office Furniture\nBP Raju Marg, M R Elite, 3rd Floor\nAbove BKP Homes, Opposite Sarath City\nRatnadeep Right Side Lane, Kondapur\nHyderabad, Telangana – 500084\n\nPhone: +91 90906 26209\nEmail: hello@magnusofficefurniture.com`,
  },
];

export function TermsAndConditionsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Magnus Office Furniture';
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
            Terms &amp; Conditions
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
          Please read these Terms & Conditions carefully before using our website or engaging with our products and services. By continuing to use our website, you agree to these terms.
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
            Reach out to our team for any enquiries about these Terms.
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
