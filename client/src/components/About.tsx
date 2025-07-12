import { UserCheck, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[hsl(210,20%,98%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Aanjanaji Physio Care</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 2022, we've been dedicated to providing exceptional physiotherapy care with 3 years of clinical experience, 
            helping more than 1000 happy patients achieve their health and wellness goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[hsl(217,91%,60%)]">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide compassionate, evidence-based physiotherapy care that empowers our patients 
              to achieve optimal health and return to the activities they love. We believe in treating 
              the whole person, not just the symptoms.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(217,91%,60%)]">3</div>
                <p className="text-gray-600">Years Clinical Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(142,76%,36%)]">1000+</div>
                <p className="text-gray-600">Happy Patients</p>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern physiotherapy clinic interior" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[hsl(217,91%,60%)] rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="text-white h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold">Expert Team</h4>
            <p className="text-gray-600">Certified physiotherapists with specialized training in various treatment modalities</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[hsl(142,76%,36%)] rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-white h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold">Patient-Centered Care</h4>
            <p className="text-gray-600">Personalized treatment plans tailored to your specific needs and goals</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[hsl(38,92%,50%)] rounded-full flex items-center justify-center mx-auto">
              <Award className="text-white h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold">Proven Results</h4>
            <p className="text-gray-600">Evidence-based treatments with measurable outcomes and high success rates</p>
          </div>
        </div>
      </div>
    </section>
  );
}
