<div align="center">
  <img src="public/image.png" alt="Roon" width="600" height="360" style="object-fit: cover; object-position: center;"/>
  
  # Roon
  
  *A real-time messaging app built with Next.js 15*
  
  Chat instantly with friends, create group conversations and share images - all with a clean, modern interface.
</div>

## Table of contents

- [Roon](#roon)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [Getting started](#getting-started)
    - [What you need](#what-you-need)
    - [Quick setup](#quick-setup)
  - [Development](#development)
    - [Commands](#commands)
    - [Project structure](#project-structure)
  - [Contributing](#contributing)
  - [Need help?](#need-help)
  - [License](#license)

## Features

- Real-time messaging with instant delivery
- Group chats and direct messages
- Edit Group information and personal profile
- Image sharing with drag-and-drop
- Read receipts and message status
- User authentication and profiles
- Search and add contacts

## Tech stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes, NextAuth, MongoDB, Mongoose
- **Real-time**: Pusher for WebSocket connections
- **Images**: Cloudinary for uploads
- **Validation**: Zod schemas

## Getting started

### What you need

- Node.js 18+ and npm
- MongoDB Atlas account (free)
- Pusher account (free tier available)
- Cloudinary account (for images)

### Quick setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/ojasvi004/Roon.git
   cd Roon
   npm install
   ```

2. **Environment setup:**
   
   Create `.env` in the root directory:
   ```env
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/roon
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

3. **Get your API keys:**
   - **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a cluster, get connection string
   - **Pusher**: Sign up at [Pusher](https://pusher.com/), create an app, copy credentials
   - **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/), get cloud name from dashboard

4. **Start the app:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) and start chatting :)

## Development

### Commands
- `npm run dev` - Development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server

### Project structure
```
src/
├── app/                 # Pages and API routes
│   ├── (auth)/         # Login/register pages
│   ├── (root)/         # Main app (chats, contacts, profile)
│   └── api/            # Backend API endpoints
├── components/         # UI components
├── models/            # Database schemas (User, Chat, Message)
└── lib/               # Utilities and configurations
```

## Contributing

Want to help improve Roon? Here's how:

1. Fork the repo and create a branch: `git checkout -b feature/cool-feature`
2. Make your changes (follow the existing code style)
3. Test everything works
4. Submit a pull request

**Ideas for contributions:**
- Better mobile experience
- New messaging features (reactions, threads)
- Performance improvements
- UI/UX enhancements
- Bug fixes

## Need help?

Having trouble? Here's what to do:

- Create an issue with details about the problem
- Include your environment (Node version, OS)
- Describe what you expected vs what happened
- Reach out: ojasvidoye@gmail.com

## License

MIT License
