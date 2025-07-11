import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogListProps {
  onBack: () => void;
  onSelectPost: (id: number) => void;
}

export default function BlogList({ onBack }: BlogListProps) {
  const [, setLocation] = useLocation();
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Exercise Tips":
        return "bg-[hsl(217,91%,60%)]";
      case "Ergonomics":
        return "bg-[hsl(142,76%,36%)]";
      case "Sports Medicine":
        return "bg-[hsl(38,92%,50%)]";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button 
          onClick={onBack}
          className="mb-8 text-[hsl(217,91%,60%)] hover:text-[hsl(217,91%,55%)] bg-transparent border-none shadow-none hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">All Articles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete collection of health and wellness articles written by our expert physiotherapy team.
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (
            <Card key={post.id} className="bg-[hsl(210,20%,98%)] overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <div onClick={() => setLocation(`/blog/${post.id}`)}>
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getCategoryColor(post.category)} text-white`}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(post.publishedAt!)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[hsl(217,91%,60%)] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-[hsl(217,91%,60%)] font-semibold hover:text-[hsl(217,91%,55%)] transition-colors">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts?.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Articles Yet</h3>
            <p className="text-gray-600">Check back soon for new health and wellness content!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-[hsl(210,20%,98%)] p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h3>
          <p className="text-gray-600 mb-6">
            Book an appointment with our expert physiotherapists today.
          </p>
          <Button 
            onClick={() => {
              const bookingSection = document.getElementById('booking');
              if (bookingSection) {
                onBack();
                setTimeout(() => {
                  bookingSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="bg-[hsl(217,91%,60%)] text-white px-8 py-3 text-lg font-semibold hover:bg-[hsl(217,91%,55%)] transition-colors"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
