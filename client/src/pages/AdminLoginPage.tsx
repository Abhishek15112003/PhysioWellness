import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield, ArrowLeft, User, Lock } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      // Store the token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      toast({
        title: "Admin Login Successful!",
        description: "Welcome to the admin dashboard.",
      });
      
      // Redirect to admin dashboard
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    // Convert username to email format for backend compatibility
    const email = formData.username === "admin" ? "admin@aanjanaji.com" : formData.username;
    
    console.log("Attempting admin login...");
    
    loginMutation.mutate({
      email: email,
      password: formData.password
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(217,91%,40%)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Button 
            onClick={() => setLocation('/')}
            className="mb-6 text-white hover:text-gray-200 bg-transparent border border-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Shield className="text-[hsl(217,91%,60%)] text-2xl" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-sm text-blue-100">
            Secure access to Aanjanaji Physio Care administration
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-[hsl(217,91%,60%)] text-xl">
              Administrator Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-gray-700">Username</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter admin username"
                    className="pl-10 focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter admin password"
                    className="pl-10 pr-10 focus:ring-[hsl(217,91%,60%)] focus:border-[hsl(217,91%,60%)]"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white py-3 text-lg font-semibold"
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Demo Credentials:</strong><br />
                    Username: <code className="bg-yellow-100 px-1 rounded">admin</code><br />
                    Password: <code className="bg-yellow-100 px-1 rounded">admin123</code>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-blue-100">
            🔒 This is a secure admin area. All access is monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
}
