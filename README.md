## Token based authentication with Fastify, JWT and Prisma

This is a repository for a JWT authentication service using **Fastify**, **Prisma**, **sqlite db** and **TypeScript**. It allows users to register, login, logout, and get a list of users from a sqlite database. It uses bcrypt for hashing passwords, zod for validating schemas, and fastify-jwt for generating and verifying tokens.

## App structure

```
jwt-auth-fastify
├── package.json
├── tsconfig.json
├── prisma
│ ├── migrations
│ └── schema.prisma
└── src
  ├── app.ts
  ├── modules
  │  └── user
  │     ├── user.controller.ts
  │     ├── user.route.ts
  │     └── user.schema.ts
  └── utils
    ├── prisma.ts
    └── types.ts
```

## Installation

To install this project, you need to have Node.js, pnpm installed on your machine.

Then, run the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/arifimran5/jwt-auth-fastify.git

# Change directory
cd jwt-auth-fastify

# Install dependencies
pnpm install

# Run migrations
pnpm prisma migrate dev

# Start the development server
pnpm dev
```

The server will run on http://localhost:8000 by default.

## Usage

The project exposes four endpoints for user authentication:

- GET /: returns a list of users with their name, id, and email. Requires an access token in the cookie or the authorization header.
- POST /register: creates a new user with the given name, email, and password. Returns the user data and an access token.
- POST /login: logs in an existing user with the given email and password. Returns the user data and an access token.
- DELETE /logout: logs out the current user by clearing the access token cookie.

You can use a tool like Postman Here are some examples:

- GET /: returns a list of users with their name, id, and email. Requires an access token in the cookie or the authorization header.
- POST /register: creates a new user with the given name, email, and password. Returns the user data and an access token.
- POST /login: logs in an existing user with the given email and password. Returns the user data and an access token.
- DELETE /logout: logs out the current user by clearing the access token cookie.

## Parameters

The API accepts the following parameters in the request body:

- name: the name of the user. Required for the /register endpoint. Must be a string.
- email: the email of the user. Required for the /register and /login endpoints. Must be a valid email address.
- password: the password of the user. Required for the /register and /login endpoints. Must be a string with at least 6 characters.

## Dependencies

The project uses the following dependencies:

- @fastify/cookie: for setting and clearing cookies
- @fastify/jwt: for generating and verifying JSON web tokens
- @prisma/client: for interacting with the PostgreSQL database
- bcrypt: for hashing and comparing passwords
- fastify: for creating the web server
- fastify-zod: for validating request and response schemas
- zod: for defining schemas

The project also uses the following dev dependencies:

- @types/bcrypt: for TypeScript type definitions for bcrypt
- @types/node: for TypeScript type definitions for Node.js
- prisma: for managing the database schema and migrations
- tsx: for compiling and watching TypeScript files
- typescript: for writing and checking TypeScript code

## Contribution

If you want to contribute to this project, you can fork the repository and create a pull request with your changes. Please follow the code style and conventions of the project, and write clear and concise commit messages. You can also report any issues or suggestions on the GitHub issue tracker.
