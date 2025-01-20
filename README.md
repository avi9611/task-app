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
# TaskManager App

This is a Next.js application designed as a task management tool with robust user authentication powered by Clerk. The application is written in TypeScript, styled with Tailwind CSS, and uses MongoDB to store user data.

## Features

### User Authentication
- **Google Sign-In**: Login using Google credentials.
- **Manual Login**: Login via email and password.

### Task Management
- **Task Columns**: Tasks are organized into three categories:
  - **To Do**
  - **In Progress**
  - **Complete**
- **Search Feature**: Quickly locate tasks using keywords.
- **Filter Options**: Filter tasks based on specific criteria.
- **Drag and Drop**: Seamlessly reorder tasks or move them between columns.

### Design
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Tailwind CSS**: Modern and efficient styling.

## Instructions to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API Key>
   CLERK_API_KEY=<Your Clerk API Key>
   MONGODB_URI=<Your MongoDB Connection String>
   ```

4. **Run the Development Server**:
   Start the application locally with:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Build for Production**:
   To create a production build, run:
   ```bash
   npm run build
   ```
   Then start the production server:
   ```bash
   npm start
   ```

## Overview of Implemented Features

1. **Authentication**:
   - Integrated Clerk for seamless user authentication with Google and email/password options.
   
2. **Task Management**:
   - Tasks categorized into "To Do," "In Progress," and "Complete."
   - Implemented drag-and-drop functionality using `react-beautiful-dnd`.

3. **Search and Filter**:
   - Optimized search for quick task location.
   - Filters to refine tasks by status, priority, or due date.

4. **Responsive Design**:
   - Tailwind CSS ensures the application looks great on all devices.

5. **Backend**:
   - MongoDB stores user and task data efficiently.
   - Server-side rendering (SSR) improves SEO and performance.

## Challenges Faced and Solutions Implemented

1. **Authentication Integration**:
   - **Challenge**: Integrating Clerk with MongoDB to ensure user data consistency.
   - **Solution**: Used Clerk hooks and webhooks to sync user authentication data with MongoDB seamlessly.

2. **Drag-and-Drop Feature**:
   - **Challenge**: Managing state updates during drag-and-drop operations.
   - **Solution**: Utilized `react-beautiful-dnd` for smooth and performant drag-and-drop functionality, ensuring tasks are correctly updated in MongoDB.

3. **Responsive Design**:
   - **Challenge**: Ensuring a seamless user experience on all devices.
   - **Solution**: Implemented a mobile-first approach with Tailwind CSS utility classes.

4. **Search and Filter Optimization**:
   - **Challenge**: Maintaining quick search and filter performance for large task datasets.
   - **Solution**: Indexed MongoDB collections and used efficient query mechanisms.

---

Feel free to contribute or raise issues in the repository for any bugs or feature requests.

