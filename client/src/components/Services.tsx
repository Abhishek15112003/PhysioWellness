import { Button } from "@/components/ui/button";
import { 
  Activity, 
  UserX, 
  Stethoscope, 
  Zap, 
  HandHeart, 
  Dumbbell,
  ArrowRight,
  Heart,
  Scissors
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Activity,
      title: "Physiotherapy",
      description: "Comprehensive physiotherapy treatments to restore mobility, reduce pain, and improve overall physical function.",
      color: "bg-[hsl(217,91%,60%)]"
    },
    {
      icon: UserX,
      title: "Rehabilitation",
      description: "Personalized rehabilitation programs designed to restore function and help you return to your daily activities.",
      color: "bg-[hsl(142,76%,36%)]"
    },
    {
      icon: Stethoscope,
      title: "Osteopathy",
      description: "Holistic osteopathic treatments focusing on the body's natural healing abilities through manual techniques.",
      color: "bg-[hsl(38,92%,50%)]"
    },
    {
      icon: Heart,
      title: "Cupping",
      description: "Traditional cupping therapy to improve blood circulation, reduce muscle tension, and promote healing.",
      color: "bg-purple-600"
    },
    {
      icon: Scissors,
      title: "Kinesiotapping",
      description: "Specialized taping techniques to support muscles, improve circulation, and enhance athletic performance.",
      color: "bg-pink-600"
    },
    {
      icon: Zap,
      title: "Dry Needling",
      description: "Advanced technique for treating muscle tension and trigger points, promoting faster healing and pain relief.",
      color: "bg-indigo-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive physiotherapy services designed to address a wide range of conditions and help you achieve optimal health.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-[hsl(210,20%,98%)] rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button 
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-[hsl(217,91%,60%)] font-semibold hover:text-[hsl(217,91%,55%)] transition-colors p-0 bg-transparent border-none shadow-none hover:bg-gray-100"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
