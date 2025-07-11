import { Button } from "@/components/ui/button";
import { CalendarPlus, Users, Star } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(217,91%,55%)] text-white py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Restore Your Health, 
              <span className="text-[hsl(142,76%,36%)]"> Reclaim Your Life</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Professional physiotherapy services designed to help you recover, rebuild, and thrive. 
              Our expert team provides personalized treatment plans for optimal healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("booking")}
                className="bg-[hsl(38,92%,50%)] text-white px-8 py-4 text-lg font-semibold hover:bg-[hsl(38,92%,45%)] transition-colors"
              >
                <CalendarPlus className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button 
                onClick={() => scrollToSection("about")}
                className="border-2 border-white text-[hsl(217,91%,60%)] bg-white px-8 py-4 text-lg font-semibold hover:bg-[hsl(217,91%,60%)] hover:text-white transition-colors"
              >
                <Users className="mr-2 h-5 w-5" />
                Meet Our Team
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional physiotherapy treatment session" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-4 -right-4 bg-white text-[hsl(217,33%,17%)] p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[hsl(142,76%,36%)] rounded-full flex items-center justify-center">
                  <Star className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">4.9/5 Rating</p>
                  <p className="text-sm text-gray-600">500+ Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
