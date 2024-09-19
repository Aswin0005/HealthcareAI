import Hero from '../components/LandingPage/Hero';
import Services from '../components/LandingPage/Services';
import AboutUs from '../components/LandingPage/AboutUs';
import Testimonials from '../components/LandingPage/Testimonials';
import Faq from '../components/LandingPage/Faq';
import Footer from '../components/LandingPage/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
}
