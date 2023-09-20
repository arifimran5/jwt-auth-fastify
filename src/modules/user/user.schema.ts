import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
})
export type LoginUserInput = z.infer<typeof loginSchema>

const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
})
