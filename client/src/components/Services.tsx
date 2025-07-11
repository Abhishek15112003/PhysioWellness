import { Button } from "@/components/ui/button";
import { 
  Activity, 
  UserX, 
  Stethoscope, 
  Zap, 
  HandHeart, 
  Dumbbell,
  ArrowRight
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Activity,
      title: "Sports Injury Therapy",
      description: "Specialized treatment for sports-related injuries, helping athletes return to peak performance safely and effectively.",
      color: "bg-[hsl(217,91%,60%)]"
    },
    {
      icon: UserX,
      title: "Post-Operative Rehabilitation",
      description: "Comprehensive recovery programs designed to restore function and mobility after surgical procedures.",
      color: "bg-[hsl(142,76%,36%)]"
    },
    {
      icon: Stethoscope,
      title: "Back Pain Treatment",
      description: "Targeted therapy for chronic and acute back pain, addressing root causes for long-term relief.",
      color: "bg-[hsl(38,92%,50%)]"
    },
    {
      icon: Zap,
      title: "Dry Needling",
      description: "Advanced technique for treating muscle tension and trigger points, promoting faster healing and pain relief.",
      color: "bg-purple-600"
    },
    {
      icon: HandHeart,
      title: "Manual Therapy",
      description: "Hands-on techniques including massage, joint mobilization, and soft tissue manipulation for optimal healing.",
      color: "bg-pink-600"
    },
    {
      icon: Dumbbell,
      title: "Exercise Rehabilitation",
      description: "Customized exercise programs to strengthen, condition, and prevent future injuries.",
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
                  variant="ghost" 
                  className="text-[hsl(217,91%,60%)] font-semibold hover:text-[hsl(217,91%,55%)] transition-colors p-0"
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
