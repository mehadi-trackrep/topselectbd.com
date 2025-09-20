import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const products = pgTable("products", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    nameEn: text("name_en").notNull(),
    description: text("description").notNull(),
    descriptionEn: text("description_en").notNull(),
    price: integer("price").notNull(), // in paisa
    image: text("image").notNull(),
    category: text("category").notNull(),
    categoryEn: text("category_en").notNull(),
    stock: integer("stock").notNull().default(0),
    weight: text("weight").notNull(),
    shelfLife: text("shelf_life").notNull(),
    ingredients: text("ingredients").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow(),
});
export const orders = pgTable("orders", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    userId: varchar("user_id"),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerAddress: text("customer_address").notNull(),
    items: text("items").notNull(), // JSON string
    subtotal: integer("subtotal").notNull(),
    shippingCost: integer("shipping_cost").notNull(),
    total: integer("total").notNull(),
    status: text("status").notNull().default("pending"),
    paymentMethod: text("payment_method").notNull().default("cod"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const cartItems = pgTable("cart_items", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    productId: varchar("product_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
    sessionId: text("session_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
});
export const insertProductSchema = createInsertSchema(products).omit({
    id: true,
    createdAt: true,
});
export const insertOrderSchema = createInsertSchema(orders).omit({
    id: true,
    createdAt: true,
});
export const insertCartItemSchema = createInsertSchema(cartItems).omit({
    id: true,
    createdAt: true,
});
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
export const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
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
