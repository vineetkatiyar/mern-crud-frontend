// src/schemas/bookSchema.js
import { z } from 'zod';

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(4, "Title must be at least 4 characters")
    .max(50, "Title cannot exceed 50 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .min(5, "Author name must be at least 5 characters")
    .max(200, "Author name cannot exceed 200 characters"),
  publishyear: z
    .number({
      required_error: "Publish year is required",
      invalid_type_error: "Publish year must be a number"
    })
    .min(1500, "Year must be greater than 1500")
    .max(new Date().getFullYear(), "Year cannot be in the future")
});

// Optional: You can create a type from the schema
