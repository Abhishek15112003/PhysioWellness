import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Booking />
      <Testimonials />
      <Blog />
      <Contact />
    </div>
  );
}
