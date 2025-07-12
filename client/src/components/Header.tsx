import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Phone, User, LogOut, Shield } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLocation("/");
  };

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      setLocation('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    setLocation(path);
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
              <h1 className="text-2xl font-bold text-[hsl(217,91%,60%)]">Aanjanaji Physio Care</h1>
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
              onClick={() => navigateToPage('/reviews')}
              className="text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => navigateToPage('/blog')}
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
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user.firstName}
                </span>
                {user.role === "admin" && (
                  <Button
                    onClick={() => navigateToPage('/admin')}
                    className="bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,55%)] transition-colors"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                )}
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  onClick={() => navigateToPage('/login')}
                  className="bg-transparent text-[hsl(217,91%,60%)] border border-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,60%)] hover:text-white transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigateToPage('/signup')}
                  className="bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,55%)] transition-colors"
                >
                  Sign Up
                </Button>
                <button
                  onClick={() => navigateToPage('/admin/login')}
                  className="text-xs text-gray-500 hover:text-[hsl(217,91%,60%)] transition-colors ml-2"
                  title="Admin Login"
                >
                  <Shield className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <a href="tel:+918770316948">
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
              onClick={() => navigateToPage('/reviews')}
              className="block w-full text-left py-2 text-[hsl(217,33%,17%)] hover:text-[hsl(217,91%,60%)] transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => navigateToPage('/blog')}
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
            
            {/* Mobile Auth Section */}
            <div className="border-t pt-4 mt-4">
              {user ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 px-0 py-2">
                    Welcome, {user.firstName}
                  </div>
                  {user.role === "admin" && (
                    <button
                      onClick={() => navigateToPage('/admin')}
                      className="block w-full text-left py-2 text-[hsl(217,91%,60%)] font-medium"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => navigateToPage('/login')}
                    className="block w-full text-left py-2 text-[hsl(217,91%,60%)] font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigateToPage('/signup')}
                    className="block w-full text-left py-2 text-[hsl(217,91%,60%)] font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigateToPage('/admin/login')}
                    className="block w-full text-left py-2 text-gray-500 text-sm font-medium"
                  >
                    <Shield className="inline h-4 w-4 mr-2" />
                    Admin Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
