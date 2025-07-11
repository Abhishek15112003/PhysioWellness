import { defineConfig } from "drizzle-kit";

// For development, we use in-memory storage and don't need a real database
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://localhost:5432/physiowellness", // Default for schema generation
  },
});
