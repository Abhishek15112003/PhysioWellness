import { 
  users, 
  appointments, 
  testimonials, 
  blogPosts, 
  contactMessages,
  type User, 
  type InsertUser,
  type Appointment,
  type InsertAppointment,
  type Testimonial,
  type InsertTestimonial,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import bcrypt from 'bcryptjs';

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private testimonials: Map<number, Testimonial>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentAppointmentId: number;
  private currentTestimonialId: number;
  private currentBlogPostId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentAppointmentId = 1;
    this.currentTestimonialId = 1;
    this.currentBlogPostId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData().catch(console.error);
  }

  private async initializeSampleData() {
    // Sample users with hashed passwords
    const sampleUsers = [
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@aanjanaji.com",
        phone: "+1234567890",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        isActive: true,
        createdAt: new Date()
      },
      {
        firstName: "John",
        lastName: "Patient",
        email: "patient@example.com",
        phone: "+1234567891",
        password: await bcrypt.hash("patient123", 10),
        role: "patient",
        isActive: true,
        createdAt: new Date()
      }
    ];

    sampleUsers.forEach(user => {
      const id = this.currentUserId++;
      this.users.set(id, { 
        ...user, 
        id,
        dateOfBirth: null,
        gender: null
      });
    });

    // Sample testimonials with different timestamps for proper sorting
    const now = new Date();
    const sampleTestimonials = [
      {
        name: "Sarah Mitchell",
        occupation: "Marathon Runner",
        rating: 5,
        review: "After my knee surgery, I was worried I'd never run again. Dr. Johnson and her team created a personalized rehabilitation plan that not only got me back to running but made me stronger than before. I'm forever grateful!",
        isApproved: true,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        name: "Robert Chen",
        occupation: "Office Manager",
        rating: 5,
        review: "I've been dealing with chronic back pain for years. The team at Aanjanaji Physio Care didn't just treat my symptoms - they addressed the root cause. I'm now pain-free and have the tools to stay that way.",
        isApproved: true,
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        name: "Maria Rodriguez",
        occupation: "Tennis Player",
        rating: 5,
        review: "Professional, caring, and incredibly knowledgeable. The dry needling treatment was a game-changer for my shoulder pain. I can't recommend Aanjanaji Physio Care highly enough!",
        isApproved: true,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000) // 3 hours ago
      },
      {
        name: "David Kumar",
        occupation: "Software Engineer",
        rating: 5,
        review: "Working from home led to terrible posture and neck pain. The ergonomic assessment and treatment plan from Aanjanaji Physio Care completely transformed my work setup and eliminated my pain.",
        isApproved: true,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
      },
      {
        name: "Lisa Thompson",
        occupation: "Yoga Instructor",
        rating: 4,
        review: "Excellent physiotherapy services! The staff is very professional and the treatment was effective. I appreciate the detailed explanation of exercises and the follow-up care.",
        isApproved: true,
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });

    // Sample blog posts
    const sampleBlogPosts = [
      {
        title: "5 Essential Exercises for Lower Back Pain Relief",
        excerpt: "Learn simple yet effective exercises you can do at home to strengthen your core and alleviate lower back pain...",
        content: "Lower back pain is one of the most common complaints we see at Aanjanaji Physio Care. Here are 5 exercises that can help...",
        category: "Exercise Tips",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-12-15")
      },
      {
        title: "Creating an Ergonomic Workspace for Better Posture",
        excerpt: "Discover how to set up your workspace to prevent neck and back pain while working from home or the office...",
        content: "With more people working from home, proper ergonomics has become crucial for preventing musculoskeletal issues...",
        category: "Ergonomics",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-12-10")
      },
      {
        title: "Preventing Sports Injuries: Pre-Exercise Preparation",
        excerpt: "Learn the essential warm-up routines and preparation techniques to keep you injury-free during sports and exercise...",
        content: "Sports injuries can be devastating, but many are preventable with proper preparation and warm-up techniques...",
        category: "Sports Medicine",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-12-05")
      }
    ];

    sampleBlogPosts.forEach(post => {
      const id = this.currentBlogPostId++;
      this.blogPosts.set(id, { ...post, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      phone: insertUser.phone ?? null,
      dateOfBirth: null,
      gender: null,
      role: "patient",
      isActive: true,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const newAppointment: Appointment = { 
      ...appointment,
      id, 
      status: "pending",
      therapist: appointment.therapist ?? null,
      notes: appointment.notes ?? null,
      createdAt: new Date()
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = status;
      this.appointments.set(id, appointment);
      return appointment;
    }
    return undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id, 
      isApproved: true, // Auto-approve testimonials
      createdAt: new Date()
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.isApproved);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const newPost: BlogPost = { 
      ...post, 
      id, 
      publishedAt: new Date()
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      isRead: false,
      createdAt: new Date()
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      message.isRead = true;
      this.contactMessages.set(id, message);
      return message;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
