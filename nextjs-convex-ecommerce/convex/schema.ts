import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"]),

  products: defineTable({
    name: v.string(),
    nameEn: v.string(),
    description: v.string(),
    descriptionEn: v.string(),
    price: v.number(), // in paisa
    image: v.string(),
    category: v.string(),
    categoryEn: v.string(),
    stock: v.number(),
    weight: v.string(),
    shelfLife: v.string(),
    ingredients: v.string(),
    isActive: v.boolean(),
  }),

  orders: defineTable({
    userId: v.optional(v.id("users")),
    customerName: v.string(),
    customerPhone: v.string(),
    customerAddress: v.string(),
    items: v.string(), // JSON string
    subtotal: v.number(),
    shippingCost: v.number(),
    total: v.number(),
    status: v.string(),
    paymentMethod: v.string(),
  }),

  cart_items: defineTable({
    productId: v.id("products"),
    quantity: v.number(),
    sessionId: v.string(),
  }),
});
