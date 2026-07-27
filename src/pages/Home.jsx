import Hero from '../components/home/Hero';
import CategoriesSection from '../components/home/CategoriesSection';
import AidoxyOrthopedicsSection from '../components/home/AidoxyOrthopedicsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Banners from '../components/home/Banners';
import WhyUs from '../components/home/WhyUs';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <AidoxyOrthopedicsSection />
      <FeaturedProducts />
      <Banners />
      <WhyUs />
      <Testimonials />
    </>
  );
}
