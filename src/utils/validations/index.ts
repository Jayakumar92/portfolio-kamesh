/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"

import { isValidServerDateTime } from "@/utils/helpers"

export const apiSchema = <T extends z.ZodObject<any>>(schema: T) =>
  z.object({
    ...successResponseSchema.shape,
    details: schema,
  })

/**
 * from
 */

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const createBlogFormSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(3, "Content is required"),
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is required"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(3, "Description is required"),
  thumbnail: z
    .string({
      required_error: "Thumbnail is required",
    })
    .min(3, "Thumbnail is required"),
})

/**
 * payload schema
 */

export const registerSchema = z
  .object({
    name: z.string().min(3).max(30),
    surname: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const verifyUserSchema = z.object({
  otp: z.string().length(6, { message: "Otp Invalid" }),
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" }),
})

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email({
      message: "Not a valid email address",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters long." }),
  remember: z.boolean().optional().default(false),
})

export const forgetPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email({
      message: "Not a valid email address",
    }),
})

export const resendSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" }),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  resetToken: z.string().length(9, "Reset url is not valid"),
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Reset url is not valid" }),
})

/**
 * Response Schema
 */

export const errorResponseSchema = z.object({
  success: z.literal(false),
  display: z.boolean(),
  status: z.literal("Bad Request"),
  error_message: z.string(),
})

export const successResponseSchema = z.object({
  success: z.literal(true),
  display: z.boolean(),
  status: z.literal("Request processed successfully"),
  message: z.string(),
})

export const registerResponseSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" }),
})

export const loginResponseSchema = z.object({
  emailVerified: z.boolean(),
  id: z.string(),
})

export const verifyResponseSchema = z.object({
  id: z.string(),
})

export const postDetailsResponseSchema = z.object({
  author: z.object({
    name: z.string(),
  }),
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  thumbnail: z.string(),
  description: z.string(),
  publishedAt: z.string().refine(isValidServerDateTime, {
    message: "PublishedAt must be a valid date time string",
  }),
})

export const postsResponseSchema = z.object({
  posts: z.array(
    postDetailsResponseSchema.omit({
      content: true,
    })
  ),
  totalPages: z.number(),
  nextPage: z.number(),
  total: z.number(),
})

export const dashboardResponseSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  name: z.string(),
})
