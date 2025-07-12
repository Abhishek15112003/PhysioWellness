import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { Testimonial, InsertTestimonial } from "@shared/schema";

export default function ReviewsPage() {
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
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button 
          onClick={() => setLocation('/')}
          className="mb-8 text-[hsl(217,91%,60%)] hover:text-[hsl(217,91%,55%)] bg-transparent border-none shadow-none hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">All Reviews</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(parseFloat(overallRating)) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallRating}</span>
            <span className="text-gray-600">({testimonials?.length || 0} reviews)</span>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            See what our patients say about their experience at Aanjanaji Physio Care
          </p>

          {/* Add Review Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white px-8 py-3 text-lg">
                <Plus className="mr-2 h-5 w-5" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Your profession or occupation"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <Select value={formData.rating.toString()} onValueChange={(value: string) => handleInputChange("rating", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{rating}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review">Your Review *</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => handleInputChange("review", e.target.value)}
                    placeholder="Tell us about your experience with our physiotherapy services..."
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createTestimonialMutation.isPending}
                  className="w-full bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)]"
                >
                  {createTestimonialMutation.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* All Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500">{formatDate(testimonial.createdAt)}</span>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.occupation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}
