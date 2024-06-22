## KANDO - NEXT JS

This application combines a Kanban board and a Todo list for seamless task management. Developed with Next.js and TypeScript, it includes internationalization and authentication features to meet various user requirements. With modern technologies like MongoDB for data storage, bcryptjs for secure authentication, and next-intl for language support.

## Demo

https://kando-nextjs.vercel.app/es/home/login

![GIF demo](https://drive.google.com/uc?export=view&id=1jCANEGV-rlgDGLHNfX3BsG3s7Z2OXjza)

## Tech Stack

next js, typescript, tailwind, shadcn, mongo db, bcryptjs, next-intl, next-auth, vercel.

## Run Locally

Clone the project

```bash
  git clone https://github.com/andresfernandez89/kando-nextjs.git
```

Go to the project directory

```bash
  cd kando-nextjs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your **`.env`** file:

`API_URL= The base URL for your API requests.`

`MONGODB_URL= The connection string for your MongoDB database.`

`GOOGLE_CLIENT_ID= The client ID for Google OAuth authentication.`

`GOOGLE_CLIENT_SECRET= The client secret for Google OAuth authentication.`

`NEXTAUTH_URL= The base URL of your Next.js application for NextAuth.`

`NEXTAUTH_SECRET= A secret key for signing and encrypting NextAuth tokens.`

## Authors

- [@andresfernandez89](https://github.com/andresfernandez89)
- [@Sebailla](https://github.com/Sebailla)
