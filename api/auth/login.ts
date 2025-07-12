import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { storage } from '../_storage';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { email, password } = req.body;
    
    // Allow "admin" as a shorthand for the admin email
    if (email === "admin") {
      email = "admin@aanjanaji.com";
    }
    
    const validatedData = loginSchema.parse({ email, password });
    console.log("Login attempt for email:", validatedData.email);
    
    // Find user by email
    const user = await storage.getUserByEmail(validatedData.email);
    console.log("User found:", user ? `${user.firstName} ${user.lastName} (${user.role})` : "No user found");
    
    if (!user || !user.isActive) {
      console.log("Login failed: User not found or inactive");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
    console.log("Password valid:", isValidPassword);
    
    if (!isValidPassword) {
      console.log("Login failed: Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from response
    const { password: userPassword, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid login data", errors: error.errors });
    } else {
      res.status(500).json({ message: "Login failed" });
    }
  }
}
