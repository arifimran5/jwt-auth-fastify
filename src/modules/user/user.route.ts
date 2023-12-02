import { FastifyInstance } from 'fastify'
import { createUser, getUsers, login, logout } from './user.controller'
import { $ref } from './user.schema'

export async function userRoutes(app: FastifyInstance) {
	app.get(
		'/',
		{
			preHandler: [app.authenticate],
		},
		getUsers
	)
	app.post(
		'/register',
		{
			schema: {
				body: $ref('createUserSchema'),
				response: {
					201: $ref('createUserResponseSchema'),
				},
			},
		},
		createUser
	)
	app.post(
		'/login',
		{
			schema: {
				body: $ref('loginSchema'),
				response: {
					201: $ref('loginResponseSchema'),
				},
			},
		},
		login
	)
	app.delete('/logout', { preHandler: [app.authenticate] }, logout)

	app.log.info('user routes registered')
}
