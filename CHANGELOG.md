# Changelog

All notable changes to this project will be documented in this file.

## [v0.4.0] - 2024-10-XX

### Added (Admin Dashboard)
- **Secure Admin Portal:** Implemented protected `/admin` routes with JWT-style authentication.
- **Admin Layout:** Created a responsive admin shell with a collapsible sidebar and topbar navigation.
- **Data Abstraction Layer:** Implemented a robust `localStorage` service architecture that returns Promises, completely prepared for a seamless backend (REST/GraphQL) transition.
- **Product Management:** Full CRUD operations for products including multiple image uploads, specifications, dimensions, and status toggles.
- **Categories Management:** Full CRUD operations for product categories.
- **Lead Management:** Built a CRM-style table to track customer inquiries through a sales pipeline (New → Contacted → Qualified → Converted → Closed).
- **Workspace Requests:** Dedicated module to review and manage design submissions from the public Workspace Designer tool.
- **Testimonials Management:** Full CRUD for client reviews with publish/hide toggles.
- **Gallery Management:** Portfolio image uploader and management grid.
- **Analytics & Settings:** Base architecture for KPI tracking and site-wide configuration.

### Added (UI Components)
- **DataTable:** Developed a highly reusable data table component with built-in search, sorting, pagination, and custom action slots.
- **ImageUploader:** Built a drag-and-drop file uploader supporting multiple images, preview generation, and base64 string conversion.
- **FormField:** Standardized form inputs across the admin panel for consistent UI/UX.
- **StatCard:** KPI metric cards for the admin dashboard overview.

### Changed
- Refactored `App.tsx` routing to support an entirely separate route tree for the Admin Dashboard, completely isolated from the public layout.
- Upgraded project design tokens to ensure the Admin Dashboard matches the premium Walnut Charcoal and Champagne Gold aesthetic of the public brand.

### Fixed
- Resolved all remaining TypeScript configuration and strict mode errors.
- Fixed duplicate class names and unused imports across the project to achieve a completely clean production build.
