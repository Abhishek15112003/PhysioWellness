import BlogList from "@/components/BlogList";
import { useLocation } from "wouter";

export default function BlogPage() {
  const [, setLocation] = useLocation();

  return (
    <BlogList 
      onBack={() => setLocation('/')}
      onSelectPost={(id) => setLocation(`/blog/${id}`)}
    />
  );
}
