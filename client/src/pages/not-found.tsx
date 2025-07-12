import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <Button 
              onClick={() => setLocation('/')}
              className="w-full bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
