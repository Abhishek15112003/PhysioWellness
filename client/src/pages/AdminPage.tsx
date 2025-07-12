import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Calendar, Phone, Mail, User, MessageSquare, Star, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import type { Appointment, ContactMessage, Testimonial } from "@shared/schema";

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (!token || !userStr) {
      setLocation("/admin/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        setLocation("/admin/login");
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid user data:", error);
      setLocation("/admin/login");
      return;
    }
    
    setIsLoading(false);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocation("/");
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-[hsl(217,91%,60%)] mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => setLocation("/admin/login")}>
            Go to Admin Login
          </Button>
        </div>
      </div>
    );
  }

  const { data: appointments } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const { data: contactMessages } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  const { data: allTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/all"],
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <Button 
              onClick={() => setLocation('/')}
              className="text-[hsl(217,91%,60%)] hover:text-[hsl(217,91%,55%)] bg-transparent border-none shadow-none hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Website
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-medium text-gray-800">Admin User</p>
              </div>
              <Button 
                onClick={handleLogout}
                className="border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-white"
              >
                Logout
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[hsl(217,91%,60%)] rounded-full flex items-center justify-center">
              <Shield className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Aanjanaji Physio Care Administration</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointments */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Appointments ({appointments?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {appointments?.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{appointment.firstName} {appointment.lastName}</h3>
                    <Badge className={`${getStatusColor(appointment.status)} text-white`}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-3 w-3" />
                      {appointment.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-3 w-3" />
                      {appointment.phone}
                    </div>
                    <div><strong>Service:</strong> {appointment.service}</div>
                    <div><strong>Date:</strong> {appointment.preferredDate}</div>
                    <div><strong>Time:</strong> {appointment.preferredTime}</div>
                    {appointment.therapist && <div><strong>Therapist:</strong> {appointment.therapist}</div>}
                    {appointment.notes && <div><strong>Notes:</strong> {appointment.notes}</div>}
                    <div className="text-xs text-gray-400 mt-2">
                      Submitted: {formatDate(appointment.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {(!appointments || appointments.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  No appointments yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Messages */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Messages ({contactMessages?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {contactMessages?.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{message.name}</h3>
                    <Badge className={message.isRead ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}>
                      {message.isRead ? 'Read' : 'Unread'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-3 w-3" />
                      {message.email}
                    </div>
                    <div><strong>Subject:</strong> {message.subject}</div>
                    <div><strong>Message:</strong> {message.message}</div>
                    <div className="text-xs text-gray-400 mt-2">
                      Submitted: {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {(!contactMessages || contactMessages.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  No messages yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Testimonials ({allTestimonials?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {allTestimonials?.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <Badge className="bg-green-500 text-white">
                      Published
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <User className="mr-2 h-3 w-3" />
                      {testimonial.occupation}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1">({testimonial.rating}/5)</span>
                    </div>
                    <div><strong>Review:</strong> {testimonial.review}</div>
                    <div className="text-xs text-gray-400 mt-2">
                      Submitted: {formatDate(testimonial.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {(!allTestimonials || allTestimonials.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  No testimonials yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[hsl(217,91%,60%)]">{appointments?.length || 0}</div>
              <div className="text-sm text-gray-600">Total Appointments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[hsl(142,76%,36%)]">{contactMessages?.length || 0}</div>
              <div className="text-sm text-gray-600">Contact Messages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[hsl(38,92%,50%)]">{allTestimonials?.length || 0}</div>
              <div className="text-sm text-gray-600">Testimonials</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
