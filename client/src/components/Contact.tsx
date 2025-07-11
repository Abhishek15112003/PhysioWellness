import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const createContactMessageMutation = useMutation({
    mutationFn: async (message: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", message);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createContactMessageMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-[hsl(217,33%,17%)] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your journey to better health? Contact us today to schedule your consultation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[hsl(217,91%,60%)] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our Location</h3>
                <p className="text-gray-300">123 Health Street, Suite 100<br />Wellness City, WC 12345</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[hsl(142,76%,36%)] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-300">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[hsl(38,92%,50%)] rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300">info@physiowellclinic.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hours</h3>
                <p className="text-gray-300">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          <Card className="bg-white text-[hsl(217,33%,17%)]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your Name"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Subject"
                    className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    placeholder="Your message..."
                    className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={createContactMessageMutation.isPending}
                  className="w-full bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,55%)] transition-colors"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {createContactMessageMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Find Us on Google Maps</h3>
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-400 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  Google Maps Integration<br />
                  <span className="text-sm">Interactive map would be embedded here</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
