import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, LoginUserInput } from './user.schema'
import bcrypt from 'bcrypt'
import prisma from '../../utils/prisma'

const SALT_ROUNDS = 10

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			id: true,
			email: true,
		},
	})

	return reply.code(200).send(users)
}

export async function createUser(
	req: FastifyRequest<{
		Body: CreateUserInput
	}>,
	reply: FastifyReply
) {
	const { password, email, name } = req.body

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})
	if (user) {
		return reply.code(401).send({
			message: 'User already exists with this email',
		})
	}

	try {
		const hash = await bcrypt.hash(password, SALT_ROUNDS)
		const user = await prisma.user.create({
			data: {
				password: hash,
				email,
				name,
			},
		})

		return reply.code(201).send(user)
	} catch (e) {
		return reply.code(500).send(e)
	}
}

export async function login(
	req: FastifyRequest<{
		Body: LoginUserInput
	}>,
	reply: FastifyReply
) {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({ where: { email: email } })

	const isMatch = user && (await bcrypt.compare(password, user.password))
	if (!user || !isMatch) {
		return reply.code(401).send({
			message: 'Invalid email or password',
		})
	}

	const payload = {
		id: user.id,
		email: user.email,
		name: user.name,
	}
	const token = req.jwt.sign(payload)

	reply.setCookie('access_token', token, {
		path: '/',
		httpOnly: true,
		secure: true,
	})

	return { accessToken: token }
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
	reply.clearCookie('access_token')

	return reply.send({ message: 'Logout successful' })
}
