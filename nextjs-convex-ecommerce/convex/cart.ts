import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCartItems = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cart_items")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .collect();
  },
});

export const addItem = mutation({
  args: {
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const existingItem = await ctx.db
      .query("cart_items")
      .filter((q) =>
        q.and(
          q.eq(q.field("sessionId"), args.sessionId),
          q.eq(q.field("productId"), args.productId)
        )
      )
      .first();

    if (existingItem) {
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
    } else {
      await ctx.db.insert("cart_items", {
        sessionId: args.sessionId,
        productId: args.productId,
        quantity: args.quantity,
      });
    }
  },
});

export const updateQuantity = mutation({
  args: { cartItemId: v.id("cart_items"), quantity: v.number() },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.cartItemId);
    } else {
      await ctx.db.patch(args.cartItemId, { quantity: args.quantity });
    }
  },
});

export const removeItem = mutation({
  args: { cartItemId: v.id("cart_items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cartItemId);
  },
});

export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cart_items")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }
  },
});
