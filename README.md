<h1 align="center">dotshare</h1>

## :page_facing_up: Description

Dotshare is a social platform where users can share posts and engage with other users.

## :gear: Tech Stack
- [Next.js 13](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)
- [Next Auth](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next Cloudinary](https://next.cloudinary.com/)

## :rocket: Features

- User authentication with Next Auth through multiple providers *(Google, Github, & Credentials)*
- Users can:
    - Manage their posts *(Full CRUD)*
    - Like and comment on posts
    - Follow and unfollow users
    - Save and unsave posts
    - Edit their profile *(bio, profile picture, username, etc.)*

## :hammer: Local Installation

### Clone the repository

```sh
$ git clone git@github.com:mtsfy/dotshare.git
$ cd dotshare
$ npm install
```

Setup environment variables:
- [MongoDB](https://www.mongodb.com/cloud/atlas)
- [Next Auth](https://next-auth.js.org/getting-started/example)
    - [Google](https://support.google.com/cloud/answer/6158849?hl=en)
    - [Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Next Cloudinary](https://next.cloudinary.dev/installation)

```sh
DATABASE_URL= # MongoDB connection 
NEXT_PUBLIC_NODE_ENV=development # change to production when deploying
NEXT_PUBLIC_GOOGLE_CLIENT_ID= # Google OAuth Client ID
NEXT_PUBLIC_GITHUB_CLIENT_ID= # Github OAuth Client ID
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= # Next Cloudinary
```

Start the frontend server:

```sh
$ npm run dev
```

The frontend will start running on `http://localhost:3000`
