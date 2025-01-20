This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
Task Manager App
A Next.js task management application with Clerk Authentication, MongoDB for data storage, and Tailwind CSS for styling. Users can log in via Google or manually using email and password. The app features task management with To-Do, In Progress, and Completed columns, search, filtering, drag-and-drop functionality, and a responsive design.

Table of Contents
Features

Technologies Used

Installation

Configuration

Running the Project

Challenges and Solutions

Contributing

License

Features
Authentication
Clerk Authentication:

Users can log in using Google or email/password.

Secure session management and user authentication.

Task Management
Task Columns:

To-Do: Tasks that need to be done.

In Progress: Tasks currently being worked on.

Completed: Finished tasks.

Drag-and-Drop:

Users can drag tasks between columns to update their status.

Search:

Search for tasks by title or description.

Filtering:

Filter tasks by category (e.g., Work, Personal) and due date (Today, This Week, This Month).

User Interface
Responsive Design:

Works seamlessly on desktop, tablet, and mobile devices.

Tailwind CSS:

Modern and customizable styling.

Database
MongoDB:

Stores user data and tasks securely.

Technologies Used
Frontend:

Next.js: React framework for server-side rendering and static site generation.

Tailwind CSS: Utility-first CSS framework for responsive design.

TypeScript: Strongly typed JavaScript for better code quality.

Backend:

Clerk: Authentication and user management.

MongoDB: NoSQL database for storing user and task data.

Other Tools:

Svix: Webhook verification for Clerk events.

Vercel: Deployment platform.

Installation
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
Install Dependencies:

bash
Copy
npm install
Configuration
Environment Variables:
Create a .env.local file in the root directory and add the following variables:

env
Copy
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
SIGNING_SECRET=your_clerk_signing_secret
MONGODB_URL=your_mongodb_connection_string
Clerk Dashboard:

Go to the Clerk Dashboard.

Create a new application and configure the authentication providers (Google, email/password).

Add the webhook URL (e.g., https://your-app.vercel.app/api/webhooks/clerk) and set the signing secret.

MongoDB:

Create a MongoDB database (e.g., using MongoDB Atlas).

Add the connection string to the .env.local file.

Running the Project
Start the Development Server:

bash
Copy
npm run dev
The app will be available at http://localhost:3000.

Build for Production:

bash
Copy
npm run build
npm start
Deploy to Vercel:

Push your code to GitHub.

Connect your repository to Vercel and deploy.

Challenges and Solutions
1. Clerk Webhook Integration
Challenge:

Clerk webhooks required a secure endpoint to handle user events (e.g., user.created).

Solution:

Used Svix to verify webhook signatures and ensure secure communication.

Created a dedicated API route (/api/webhooks/clerk) to handle webhook events.

2. Drag-and-Drop Functionality
Challenge:

Implementing drag-and-drop for tasks across columns while maintaining state consistency.

Solution:

Used React DnD (Drag and Drop) library to handle drag-and-drop functionality.

Updated the task status in the database on drop.

3. Responsive Design
Challenge:

Ensuring the app works seamlessly on all screen sizes.

Solution:

Used Tailwind CSS to create a responsive layout with utility classes.

4. Database Connection in Serverless Environment
Challenge:

Managing MongoDB connections in a serverless environment (Vercel).

Solution:

Implemented connection caching to reuse the database connection across function invocations.

Contributing
Contributions are welcome! Follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Clerk for authentication.

MongoDB for database storage.

Next.js and Tailwind CSS for the frontend framework and styling.
