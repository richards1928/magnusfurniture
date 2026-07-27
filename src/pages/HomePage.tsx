import { Hero } from '../components/sections/Hero';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { Craftsmanship } from '../components/sections/Craftsmanship';
import { WorkspaceInspiration } from '../components/sections/WorkspaceInspiration';
import { CompletedProjects } from '../components/sections/CompletedProjects';
import { DesignYourOwn } from '../components/sections/DesignYourOwn';
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel';
import { Newsletter } from '../components/sections/Newsletter';

export function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Featured Collections */}
      <FeaturedProducts />

      {/* 3. Why Magnus */}
      <WhyChooseUs />

      {/* 4. Craftsmanship Process */}
      <Craftsmanship />

      {/* 5. Workspace Inspiration */}
      <WorkspaceInspiration />

      {/* 6. Completed Projects */}
      <CompletedProjects />

      {/* 7. Workspace Designer CTA */}
      <DesignYourOwn />

      {/* 8. Testimonials */}
      <TestimonialsCarousel />

      {/* 9. Newsletter */}
      <Newsletter />
    </>
  );
}
