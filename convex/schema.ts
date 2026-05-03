import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  quotes: defineTable({
    name: v.string(),
    phone: v.string(),
    message: v.string(),
    status: v.string(), // "pending", "contacted", etc.
  }),
});
