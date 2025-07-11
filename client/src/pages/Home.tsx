import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      <MobileMenu />
    </div>
  );
}
