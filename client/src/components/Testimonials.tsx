import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Edit, Eye, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { Testimonial, InsertTestimonial } from "@shared/schema";

export default function Testimonials() {
  const [, setLocation] = useLocation();
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

  // Sort testimonials by date and time (newest first) and calculate overall rating
  const sortedTestimonials = testimonials ? 
    [...testimonials].sort((a, b) => {
      // Handle null/undefined createdAt values
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      
      // Sort by newest first (descending order)
      return dateB - dateA;
    }) : [];
  
  const overallRating = testimonials && testimonials.length > 0 ? 
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1) : "0.0";
  
  // Show only the 3 most recent reviews on the home page
  const displayedTestimonials = sortedTestimonials.slice(0, 3);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    // Show relative time for recent reviews
    if (diffInHours < 24) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      if (diffInMinutes < 60) {
        return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
      } else {
        const hours = Math.floor(diffInHours);
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
      }
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  };

  const createTestimonialMutation = useMutation({
    mutationFn: async (testimonial: InsertTestimonial) => {
      const response = await apiRequest("POST", "/api/testimonials", testimonial);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review has been published!",
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Recent reviews from our satisfied patients - see what they have to say about their experience.
          </p>
          
          {/* Overall Rating Display */}
          {testimonials && testimonials.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(Math.round(parseFloat(overallRating)))}
                </div>
                <span className="text-2xl font-bold text-[hsl(217,91%,60%)]">{overallRating}</span>
              </div>
              <div className="text-gray-600">
                Based on {testimonials.length} review{testimonials.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials?.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex mr-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="text-gray-600 font-semibold">{testimonial.rating}.0</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(testimonial.createdAt)}</span>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* See More Reviews Button */}
            {sortedTestimonials.length > 3 && (
              <Button
                onClick={() => setLocation('/reviews')}
                className="border-[hsl(217,91%,60%)] text-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,60%)] hover:text-white px-8 py-4 text-lg font-semibold transition-colors bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                See More Reviews ({sortedTestimonials.length - 3} more)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            
            {/* Leave a Review Button */}
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
                    <Select onValueChange={(value: string) => handleInputChange("rating", parseInt(value))}>
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
      </div>
    </section>
  );
}
