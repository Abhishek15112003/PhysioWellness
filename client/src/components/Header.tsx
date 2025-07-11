import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Phone } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg" : "bg-white shadow-lg"
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
              <Heart className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(217,91%,60%)]">PhysioWell</h1>
              <p className="text-sm text-gray-600">Clinic</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Book
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection("blog")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890">
              <Button className="bg-[hsl(142,76%,36%)] text-white hover:bg-[hsl(142,76%,30%)] transition-colors">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </a>
            <button 
              className="md:hidden text-[hsl(217,33%,17%)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Book
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection("blog")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
