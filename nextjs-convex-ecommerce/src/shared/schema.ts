import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
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
  shippingType: z.enum(["dhaka", "outside"]),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;

// Manual types based on Convex schema
export type User = {
    _id: string;
    _creationTime: number;
    username: string;
    email: string;
    name: string;
    phone?: string;
    address?: string;
};

export type Product = {
    _id: string;
    _creationTime: number;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    price: number;
    image: string;
    category: string;
    categoryEn: string;
    stock: number;
    weight: string;
    shelfLife: string;
    ingredients: string;
    isActive: boolean;
};

export type Order = {
    _id: string;
    _creationTime: number;
    userId?: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: string;
    subtotal: number;
    shippingCost: number;
    total: number;
    status: string;
    paymentMethod: string;
};

export type CartItem = {
    _id: string;
    _creationTime: number;
    productId: string;
    quantity: number;
    sessionId: string;
};
