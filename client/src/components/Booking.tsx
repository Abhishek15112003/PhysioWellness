import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertAppointment } from "@shared/schema";

export default function Booking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    therapist: "",
    notes: ""
  });

  const { toast } = useToast();

  const createAppointmentMutation = useMutation({
    mutationFn: async (appointment: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", appointment);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked!",
        description: "We'll contact you soon to confirm your appointment details.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        preferredTime: "",
        therapist: "",
        notes: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.service || !formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createAppointmentMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(217,91%,55%)] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Book Your Appointment</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Schedule your consultation with our expert physiotherapists. Choose your preferred service, date, and time.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white text-[hsl(217,33%,17%)] shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-semibold mb-2">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-semibold mb-2">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold mb-2">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-semibold mb-2">Select Service *</Label>
                  <Select onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]">
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sports-injury">Sports Injury Therapy</SelectItem>
                      <SelectItem value="post-operative">Post-Operative Rehabilitation</SelectItem>
                      <SelectItem value="back-pain">Back Pain Treatment</SelectItem>
                      <SelectItem value="dry-needling">Dry Needling</SelectItem>
                      <SelectItem value="manual-therapy">Manual Therapy</SelectItem>
                      <SelectItem value="exercise-rehab">Exercise Rehabilitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate" className="block text-sm font-semibold mb-2">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold mb-2">Preferred Time *</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                      <SelectTrigger className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]">
                        <SelectValue placeholder="Select time..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-semibold mb-2">Preferred Therapist (Optional)</Label>
                  <Select onValueChange={(value) => handleInputChange("therapist", value)}>
                    <SelectTrigger className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]">
                      <SelectValue placeholder="No preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No preference</SelectItem>
                      <SelectItem value="dr-sarah-johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="dr-michael-chen">Dr. Michael Chen</SelectItem>
                      <SelectItem value="dr-emily-rodriguez">Dr. Emily Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes" className="block text-sm font-semibold mb-2">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                    placeholder="Please describe your condition or any specific requirements..."
                    className="focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={createAppointmentMutation.isPending}
                    className="bg-[hsl(217,91%,60%)] text-white px-8 py-4 text-lg font-semibold hover:bg-[hsl(217,91%,55%)] transition-colors"
                  >
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    {createAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
