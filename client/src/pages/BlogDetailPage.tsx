import { useRoute, useLocation } from "wouter";
import BlogDetail from "@/components/BlogDetail";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:id");
  const [, setLocation] = useLocation();
  
  const blogId = params?.id ? parseInt(params.id) : null;

  if (!blogId) {
    setLocation('/blog');
    return null;
  }

  return (
    <BlogDetail 
      blogId={blogId} 
      onBack={() => setLocation('/')} 
    />
  );
}
