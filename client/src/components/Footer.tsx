import { Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[hsl(217,33%,17%)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[hsl(217,91%,60%)] rounded-full flex items-center justify-center">
                <Heart className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[hsl(217,91%,60%)]">Aanjanaji Physio Care</h3>
                <p className="text-sm text-gray-400">Clinic</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional physiotherapy care since 2022. More than 1000 happy patients with 3 years of clinical experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/dr.rahulakodia?igsh=MXNtbnVyczBvejZ2MA%3D%3D&utm_source=qr" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("booking")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("blog")}
                  className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Physiotherapy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Rehabilitation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Osteopathy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Cupping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Kinesiotapping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(217,91%,60%)] transition-colors">Dry Needling</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-start">
                <span className="mr-2">📍</span>
                Varunchi Marg, Apposite AK Building<br />
                Freeganj, Ujjain MP
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">📞</span>
                8770316948, 7724925551
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✉️</span>
                Rahulakodiyarp@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2022-2025 Aanjanaji Physio Care. All rights reserved. | 
            <a href="#" className="hover:text-[hsl(217,91%,60%)] transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-[hsl(217,91%,60%)] transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
