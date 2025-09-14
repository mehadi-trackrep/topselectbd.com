import { mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const register = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (existingUser) {
      throw new Error("Username already taken");
    }

    const existingEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingEmail) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.insert("users", {
      username: args.username,
      email: args.email,
      password: hashedPassword,
      name: args.name,
      phone: args.phone,
      address: args.address,
    });

    return user;
  },
});

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(args.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }

    return user;
  },
});
