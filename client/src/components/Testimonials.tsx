import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial, InsertTestimonial } from "@shared/schema";

export default function Testimonials() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    rating: 5,
    review: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (testimonial: InsertTestimonial) => {
      const response = await apiRequest("POST", "/api/testimonials", testimonial);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. We'll review and publish it soon.",
      });
      setFormData({
        name: "",
        occupation: "",
        rating: 5,
        review: ""
      });
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.occupation || !formData.review) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createTestimonialMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-[hsl(210,20%,98%)]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-[hsl(210,20%,98%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Patients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have experienced the transformative power of our physiotherapy care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-gray-600 font-semibold">{testimonial.rating}.0</span>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.review}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[hsl(217,91%,60%)] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.occupation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[hsl(217,91%,60%)] text-white px-8 py-4 text-lg font-semibold hover:bg-[hsl(217,91%,55%)] transition-colors">
                <Edit className="mr-2 h-5 w-5" />
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Leave a Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Your occupation"
                  />
                </div>
                <div>
                  <Label>Rating *</Label>
                  <Select onValueChange={(value) => handleInputChange("rating", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review">Review *</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => handleInputChange("review", e.target.value)}
                    placeholder="Share your experience..."
                    rows={4}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={createTestimonialMutation.isPending}
                  className="w-full"
                >
                  {createTestimonialMutation.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
