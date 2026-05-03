import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    message: v.string(),
  },
  returns: v.id("quotes"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("quotes", {
      name: args.name,
      phone: args.phone,
      message: args.message,
      status: "pending",
    });
  },
});
