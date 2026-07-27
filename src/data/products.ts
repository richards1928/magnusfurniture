export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  dimensions: string;
  material: string;
  features: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  { id: '1', slug: 'executive-chairs', name: 'Executive Chairs', description: 'Premium ergonomic seating for executives', icon: '💺', productCount: 12, image: '' },
  { id: '2', slug: 'manager-chairs', name: 'Manager Chairs', description: 'Comfortable seating for daily operations', icon: '💺', productCount: 8, image: '' },
  { id: '3', slug: 'visitor-chairs', name: 'Visitor Chairs', description: 'Elegant seating for your guests', icon: '🪑', productCount: 15, image: '' },
  { id: '4', slug: 'office-tables', name: 'Office Tables', description: 'Functional desks for modern professionals', icon: '🖥️', productCount: 10, image: '' },
  { id: '5', slug: 'conference-tables', name: 'Conference Tables', description: 'Large tables for collaborative meetings', icon: '🤝', productCount: 6, image: '' },
  { id: '6', slug: 'reception-desks', name: 'Reception Desks', description: 'Make a lasting first impression', icon: '🏢', productCount: 5, image: '' },
  { id: '7', slug: 'workstations', name: 'Workstations', description: 'Optimized modular systems for teams', icon: '💻', productCount: 8, image: '' },
  { id: '8', slug: 'storage-cabinets', name: 'Storage Cabinets', description: 'Secure and organized office storage', icon: '🗄️', productCount: 11, image: '' },
  { id: '9', slug: 'office-sofas', name: 'Office Sofas', description: 'Comfortable lounge seating for common areas', icon: '🛋️', productCount: 7, image: '' },
  { id: '10', slug: 'training-furniture', name: 'Training Furniture', description: 'Flexible furniture for training rooms', icon: '🎓', productCount: 9, image: '' },
  { id: '11', slug: 'modular-office-furniture', name: 'Modular Office Furniture', description: 'Scalable solutions for growing businesses', icon: '🧩', productCount: 14, image: '' },
];

export const products: Product[] = [
  {
    id: '1', slug: 'titan-executive-chair', name: 'Titan Executive Ergonomic Chair', category: 'Executive Chairs', categorySlug: 'executive-chairs',
    price: 24990, originalPrice: 29990, description: 'The Titan Executive Chair is engineered for long hours of comfortable work. Featuring a breathable mesh back, 4D adjustable armrests, and dynamic lumbar support, it ensures perfect posture throughout the day. The premium aluminum base and heavy-duty gas lift provide lasting durability.',
    shortDescription: 'Premium ergonomic chair with dynamic lumbar support.',
    dimensions: 'W 70 × D 68 × H 115-125 cm', material: 'Premium Mesh, Aluminum Base', features: ['4D Adjustable Armrests', 'Dynamic Lumbar Support', 'Synchronized Tilt Mechanism', 'Breathable Mesh Back'],
    images: [], badge: 'Bestseller', inStock: true,
  },
  {
    id: '2', slug: 'nova-workstation', name: 'Nova 4-Seater Linear Workstation', category: 'Workstations', categorySlug: 'workstations',
    price: 68990, description: 'Maximize your office floor plan with the Nova 4-Seater Workstation. Designed for collaborative teams, it includes acoustic privacy screens, integrated cable management trays, and under-desk mobile pedestals for each user. Built with high-grade engineered wood and a sturdy steel frame.',
    shortDescription: 'Collaborative 4-seater desk with privacy screens.',
    dimensions: 'W 240 × D 120 × H 75 cm', material: 'Engineered Wood, Steel Frame', features: ['Acoustic Privacy Screens', 'Integrated Cable Management', 'Includes 4 Mobile Pedestals', 'Anti-scratch surface'],
    images: [], inStock: true,
  },
  {
    id: '3', slug: 'summit-conference-table', name: 'Summit 10-Seater Conference Table', category: 'Conference Tables', categorySlug: 'conference-tables',
    price: 85990, originalPrice: 95990, description: 'Make a statement in your boardroom with the Summit Conference Table. Featuring a rich walnut finish and a boat-shaped top for optimal sightlines during meetings. It includes dual central power modules with AC and USB ports for seamless connectivity.',
    shortDescription: '10-seater boardroom table with integrated power modules.',
    dimensions: 'W 300 × D 120 × H 75 cm', material: 'Walnut Veneer, Metal Base', features: ['Integrated Power & USB Ports', 'Boat-shaped Top', 'Heavy-duty Metal Base', 'Seats 10 comfortably'],
    images: [], badge: 'Premium', inStock: true,
  },
  {
    id: '4', slug: 'vertex-office-desk', name: 'Vertex Manager Desk', category: 'Office Tables', categorySlug: 'office-tables',
    price: 32990, description: 'A sleek and professional desk designed for managers. The Vertex Desk features a spacious L-shaped work surface, a built-in credenza for ample storage, and a modesty panel. The contemporary design elevates any private office.',
    shortDescription: 'L-shaped manager desk with built-in credenza.',
    dimensions: 'W 180 × D 160 × H 75 cm', material: 'Pre-laminated Particle Board', features: ['L-shaped Design', 'Built-in Storage Credenza', 'Modesty Panel', 'Wire Management Grommets'],
    images: [], inStock: true,
  },
  {
    id: '5', slug: 'aero-visitor-chair', name: 'Aero Visitor Chair (Set of 2)', category: 'Visitor Chairs', categorySlug: 'visitor-chairs',
    price: 18990, description: 'Welcome guests in comfort with the Aero Visitor Chair. Designed with a cantilever sled base for a slight bounce, it features padded armrests and a contoured mesh back. Perfect for reception areas or opposite an executive desk.',
    shortDescription: 'Comfortable cantilever visitor chairs with mesh back.',
    dimensions: 'W 60 × D 62 × H 95 cm', material: 'Mesh, Chrome Frame', features: ['Cantilever Sled Base', 'Contoured Mesh Back', 'Padded Armrests', 'Sold as a set of 2'],
    images: [], badge: 'Popular', inStock: true,
  },
  {
    id: '6', slug: 'vault-storage-cabinet', name: 'Vault Full-Height Storage Cabinet', category: 'Storage Cabinets', categorySlug: 'storage-cabinets',
    price: 22990, description: 'Keep your office organized and secure with the Vault Storage Cabinet. This full-height metal unit features 4 adjustable shelves, a 3-point locking system, and a powder-coated finish for maximum durability. Ideal for files, supplies, and equipment.',
    shortDescription: 'Secure metal storage cabinet with adjustable shelves.',
    dimensions: 'W 90 × D 45 × H 195 cm', material: 'Powder-coated Steel', features: ['4 Adjustable Shelves', '3-point Locking System', 'Heavy-duty Steel Construction', 'Anti-tilt mechanism'],
    images: [], inStock: true,
  },
  {
    id: '7', slug: 'halo-reception-desk', name: 'Halo Curved Reception Desk', category: 'Reception Desks', categorySlug: 'reception-desks',
    price: 45990, description: 'Create a stunning first impression with the Halo Reception Desk. Its elegant curved design features a transaction counter for guests and a lowered working surface for the receptionist. Integrated LED lighting adds a modern touch.',
    shortDescription: 'Curved reception desk with transaction counter and LED lighting.',
    dimensions: 'W 220 × D 80 × H 110 cm', material: 'High-gloss MDF, Glass', features: ['Curved Design', 'Glass Transaction Counter', 'Integrated LED Lighting', 'Ample Storage Space'],
    images: [], inStock: true,
  },
  {
    id: '8', slug: 'lounge-office-sofa', name: 'Oasis 3-Seater Office Sofa', category: 'Office Sofas', categorySlug: 'office-sofas',
    price: 38990, originalPrice: 44990, description: 'Provide a comfortable breakout area for employees and clients with the Oasis Office Sofa. Upholstered in premium, easy-to-clean commercial-grade faux leather, it features a minimalist square profile and durable stainless steel legs.',
    shortDescription: 'Modern 3-seater sofa for reception and breakout areas.',
    dimensions: 'W 210 × D 80 × H 78 cm', material: 'Commercial Faux Leather, Steel', features: ['Commercial-grade Upholstery', 'High-density Foam', 'Stainless Steel Legs', 'Easy to clean'],
    images: [], badge: 'New', inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
