import { z } from "zod";

// Client-side Zod schemas for validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  customerAddress: z.string().min(1, "Address is required"),
  shippingType: z.enum(["dhaka", "outside"], {
    errorMap: () => ({ message: "Please select a shipping type" })
  }),
});

// Type definitions for client-side data structures
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;

// Helper functions to convert potentially string values to numbers
export const toNumber = (value: number | string): number => {
  return typeof value === 'string' ? parseInt(value, 10) : value;
};

export const toString = (value: number | string): string => {
  return typeof value === 'number' ? value.toString() : value;
};

// Product type for client-side (matching the server response structure)
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number | string; // Can be number or string depending on how it comes from API
  image: string;
  category: string;
  categoryEn: string;
  stock: number | string; // Can be number or string depending on how it comes from API
  weight: string;
  shelfLife: string;
  ingredients: string;
  isActive: boolean;
  createdAt: string | Date; // Date string from API or Date object
}

// User type for client-side
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string; // Date string from API
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  sessionId: string;
  createdAt: string; // Date string from API
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: string; // JSON string
  subtotal: number | string;
  shippingCost: number | string;
  total: number | string;
  status: string;
  paymentMethod: string;
  createdAt: string; // Date string from API
}