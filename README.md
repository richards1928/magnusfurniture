# Magnus Office Furniture

A premium office furniture management platform built with modern web technologies.

## Features Completed

### Public Website
- Premium responsive website
- Office furniture branding
- Homepage
- About
- Products
- Product Details
- Workspace Design Solutions
- Workspace Designer
- Contact
- SEO optimization

### Admin Dashboard
- Authentication
- Dashboard
- Product Management
- Categories
- Lead Management
- Testimonials
- Gallery
- Analytics
- Settings

### UI
- Premium responsive design
- Framer Motion animations
- Modern component architecture

### Current Data Layer
- localStorage service abstraction
- Ready for API integration

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM v7
- Lucide React Icons
- Three.js & React Three Fiber (3D Configurator)
- Dexie (IndexedDB)
- localStorage Service Layer

## Folder Structure

```
magnusfurniture/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── admin/              # Admin Dashboard module
│   │   ├── components/     # Reusable admin UI components
│   │   ├── context/        # Auth state management
│   │   ├── hooks/          # Custom admin hooks
│   │   ├── pages/          # Admin views (Products, Leads, etc.)
│   │   ├── services/       # Data layer (localStorage backed)
│   │   └── types/          # Admin-specific TypeScript interfaces
│   ├── assets/             # Global assets
│   ├── components/         # Public website components
│   │   ├── layout/         # Navbar, Footer, Layout wrapper
│   │   ├── product/        # Product cards, grids
│   │   ├── sections/       # Landing page sections
│   │   └── ui/             # Reusable atomic UI (Buttons, Cards)
│   ├── data/               # Seed data for public site
│   ├── engine/             # 3D Configurator Engine (React Three Fiber)
│   ├── pages/              # Public website pages
│   ├── store/              # Global state management
│   ├── styles/             # CSS files and design tokens
│   └── types/              # Global TypeScript interfaces
└── package.json            # Dependencies and scripts
```

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Demo Login

**Admin Portal:** `http://localhost:5173/admin`

- **Email:** `admin@magnus.com`
- **Password:** `magnus2024`

## Roadmap

**Current Version:** v0.4.0

**Upcoming:**
- PostgreSQL Integration
- Prisma ORM
- REST APIs
- JWT Authentication
- Image Upload (Cloudinary/S3)
- Quote Management
- Workspace Designer Backend
- AI Workspace Recommendations
- Production Deployment

## License

MIT License. Copyright (c) 2024 Magnus Office Furniture.
