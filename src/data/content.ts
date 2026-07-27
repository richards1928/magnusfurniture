export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  { id: '1', name: 'Google Reviewer', role: 'Verified Customer', location: 'Hyderabad', quote: 'The quality of the furniture is exceptional – sturdy, stylish, and ergonomically designed. It has completely transformed our workspace.', rating: 5 },
  { id: '2', name: 'Google Reviewer', role: 'Verified Customer', location: 'Hyderabad', quote: 'They have a wide variety of office furniture. They do not compromise on quality.', rating: 5 },
  { id: '3', name: 'Google Reviewer', role: 'Verified Customer', location: 'Hyderabad', quote: 'The staff is patient and helped us choose the right furniture.', rating: 5 },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FaqItem[] = [
  { id: '1', category: 'General', question: 'What types of office furniture do you offer?', answer: 'We offer a comprehensive range of premium office furniture including executive chairs, workstations, manager desks, conference tables, reception desks, storage cabinets, and modular office solutions.' },
  { id: '2', category: 'Customization', question: 'Do you design custom workstations?', answer: 'Yes, we specialize in custom workspace design. Using our Workspace Designer or working with our layout experts, we can tailor workstations and desks to perfectly fit your floor plan and corporate identity.' },
  { id: '3', category: 'Bulk Orders', question: 'Do you handle bulk corporate orders?', answer: 'Absolutely. We regularly execute large-scale corporate projects for IT companies, startups, and commercial buildings. We offer special volume pricing and dedicated project management for bulk orders.' },
  { id: '4', category: 'Delivery', question: 'Is delivery and installation included?', answer: 'Yes, we provide professional delivery and complete on-site installation by our trained technicians for all corporate and individual orders across Hyderabad and surrounding regions.' },
  { id: '5', category: 'Warranty', question: 'What warranty is provided on your furniture?', answer: 'All Magnus Office Furniture comes with robust commercial warranties. Our premium ergonomic chairs and workstations typically carry a 3 to 5-year warranty against manufacturing defects.' },
  { id: '6', category: 'Consultation', question: 'Do you offer office space planning?', answer: 'Yes, our workspace consultation service helps you optimize your office layout for productivity and aesthetics before you make a purchase.' },
];

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: ServiceItem[] = [
  { id: '1', title: 'Workspace Consultation', description: 'Our experts analyze your floor plan and workflows to recommend the most efficient and aesthetically pleasing furniture layouts for your corporate space.', icon: '🏢', features: ['Floor Plan Analysis', 'Ergonomic Assessment', 'Custom Layouts', 'Budget Optimization'] },
  { id: '2', title: 'Corporate Projects & Bulk Orders', description: 'End-to-end execution of large-scale office setups. We manage manufacturing, logistics, and installation for entire commercial buildings and IT parks.', icon: '📈', features: ['Volume Pricing', 'Dedicated Project Manager', 'Timely Execution', 'Quality Assurance'] },
  { id: '3', title: 'Professional Installation', description: 'Our trained technicians ensure that every desk, chair, and workstation is assembled perfectly on-site, with zero disruption to your ongoing operations.', icon: '🛠️', features: ['On-site Assembly', 'Safety Compliance', 'Packaging Disposal', 'Post-installation Check'] },
  { id: '4', title: 'After-Sales & Warranty Support', description: 'We stand by our products. Get prompt maintenance, repairs, and warranty support to ensure your office furniture remains in pristine condition.', icon: '🛡️', features: ['Prompt Maintenance', 'Warranty Claims', 'Repair Service', 'Furniture Care'] },
];
