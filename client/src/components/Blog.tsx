import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import BlogDetail from "./BlogDetail";
import BlogList from "./BlogList";

export default function Blog() {
  const [currentView, setCurrentView] = useState<'home' | 'list' | 'detail'>('home');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Show blog detail view
  if (currentView === 'detail' && selectedBlogId) {
    return (
      <BlogDetail 
        blogId={selectedBlogId} 
        onBack={() => setCurrentView('home')} 
      />
    );
  }

  // Show all articles view
  if (currentView === 'list') {
    return (
      <BlogList 
        onBack={() => setCurrentView('home')}
        onSelectPost={(id) => {
          setSelectedBlogId(id);
          setCurrentView('detail');
        }}
      />
    );
  }

  // Home view (default)
  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </section>
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
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Health & Wellness Blog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest tips, exercises, and insights from our physiotherapy experts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (
            <Card key={post.id} className="bg-[hsl(210,20%,98%)] overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Badge className={`${getCategoryColor(post.category)} text-white`}>
                    {post.category}
                  </Badge>
                  <span className="text-gray-500 text-sm ml-4">
                    {formatDate(post.publishedAt!)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button 
                  onClick={() => {
                    setSelectedBlogId(post.id);
                    setCurrentView('detail');
                  }}
                  className="text-[hsl(217,91%,60%)] font-semibold hover:text-[hsl(217,91%,55%)] transition-colors p-0 bg-transparent border-none shadow-none hover:bg-gray-100"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={() => setCurrentView('list')}
            className="bg-[hsl(217,91%,60%)] text-white px-8 py-4 text-lg font-semibold hover:bg-[hsl(217,91%,55%)] transition-colors"
          >
            <Newspaper className="mr-2 h-5 w-5" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
