# Roon

Roon is a real-time messaging app designed to make communication seamless and engaging. It supports features like instant messaging, group chats, and read receipts, ensuring users stay connected effortlessly and never miss a beat. With a focus on reliability and ease of use, Roon brings people together in real-time, whether for work or personal conversations :)
## Table of Contents

- [Roon](#roon)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Docker Support](#docker-support)
  - [Usage](#usage)
  - [Contact](#contact)

---

## Features

- **User Authentication**: Secure user authentication using NextAuth.
- **Real-Time Messaging**: Instant chat updates powered by Pusher.
- **Database**: MongoDB integration with Mongoose for schema and data handling.
- **Responsive Design**: Optimized for desktop and mobile usage.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN
- **Backend**: Next.js API Routes, Node.js, Pusher
- **Database**: MongoDB & Mongoose (ORM)
- **Schema Declaration & Validation**: Zod
- **Authentication**: NextAuth (JWT)
- **Real-Time Updates**: Pusher
- **Containerization**: Docker 

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ojasvi004/Roon.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd Roon
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    - Create a `.env` file in the root directory and configure the following:

    ```env
    NEXTAUTH_SECRET=your_secret
    NEXTAUTH_URL=http://localhost:3000
    DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/chatapp
    PUSHER_APP_ID=your_pusher_app_id
    PUSHER_KEY=your_pusher_key
    PUSHER_SECRET=your_pusher_secret
    PUSHER_CLUSTER=your_pusher_cluster
    ```

5. **Run the application:**

    ```bash
    npm run dev
    ```

6. **Open your browser and visit [http://localhost:3000](http://localhost:3000).**

---

## Docker Support

To run the application using Docker, follow these steps:

1. **Ensure Docker is installed**: Make sure you have Docker installed on your machine. You can download it from [here](https://www.docker.com/get-started).

2. **Build the Docker image**:

    In the root directory of the project, run:

    ```bash
    docker build -t roon .
    ```

3. **Run the application in a Docker container**:

    ```bash
    docker run -p 3000:3000 --env-file .env roon
    ```

4. **Open your browser and visit [http://localhost:3000](http://localhost:3000).**

---

## Usage

- **Register**: Create a new account or log in using existing credentials
- **Start a chat**: Select a contact or group to start chatting. You can also send images
- **Real-time messaging**: Enjoy instant updates as you send or receive messages
- **Profile management**: Update your profile or group profile from the profile page


## Contact

For any questions, please contact `ojasvidoye@gmail.com`
