
# AlgoRoot Assignment

## Overview
This is a Full Stack(Mern) application designed to manage tasks and user authentication. It is built using React for frontend, Express and Nodejs for Backend(Typescript), Mongodb for database and other essential libraries to enhance performance and functionality.


## Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/MdMassum/algoroot-assignment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd algoroot-assignment
   cd frontend and cd backend (open 2 terminal)
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Backend Details -->

## Backent Project Structure
```
algoroot-assignment/backend
    |── src/
    │   ├── config/
    │   │   ├── cloudinary.ts
    │   │   ├── mongoConfig.ts
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── taskController.ts
    │   ├── middleware/
    │   │   ├── auth.ts
    │   │   ├── error.ts
    │   │   ├── fileUpload.ts
    │   ├── models/
    │   │   ├── authModel.ts
    │   │   ├── taskModel.ts
    │   ├── routes/
    │   │   ├── authRoute.ts
    │   │   ├── taskRoutes.ts
    │   ├── services/
    │   │   ├── taskService.ts
    │   ├── types/
    │   │   ├── express.d.ts
    │   ├── utils/
    │   │   ├── auth.ts
    │   │   ├── cloudinary.ts
    │   │   ├── errorHandler.ts
    │   │   ├── sendMail.ts
    │   │ 
    │   ├── server.ts
    │
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── vercel.json
    ├── tsconfig.json
```

## API Endpoints Documentation

### Authentication Routes

Base URL: `/api/auth`

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/signup`          | Registers a new user           |
| POST   | `/login`           | Logs in an existing user       |
| POST   | `/logout`          | Logs out the authenticated user|
| POST   | `/forgot-password` | Sends password reset link      |
| POST   | `/reset`           | Resets Password                |

---

### Task Routes

Base URL: `/api/tasks`   (All this routes are authenticated)

| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| GET    | `/`            | Retrieves all tasks                 |
| GET    | `/:id`         | Retrieves a specific task by ID     |
| POST   | `/create`      | Creates a new task                  |
| PUT    | `/:id`         | Updates an existing task by ID      |
| DELETE | `/:id`         | Deletes a task by ID                |


## Frontend Project Structure
```
algoroot-assignment/frontend
    │-- public/
    │-- src/
    │   │-- assets/           # Static assets
    │   │-- components/       # Reusable UI components
    │   │-- context/          # context api
    │   │-- layouts/          # contains layout
    │   │-- pages/            # Page components
    │   │-- redux/            # redux setup
    │   │-- App.jsx           # Main application file
    │   │-- index.css          # css file
    │   │-- main.jsx          # Entry point
    │-- .env
    │-- .gitignore
    │-- index.html
    │-- package.json
    │-- README.md
```
## Technologies Used
- Express.js 
- Node.js 
- Nodemailer
- Cloudinary
- React.js
- React Router
- TailwindCSS
- Redux
- Mongodb

## Links

- Frontend Link : [https://algoroot-assignment.vercel.app/](https://algoroot-assignment.vercel.app/)

- Backend Link : [https://algoroot-assignment-backend.vercel.app/](https://algoroot-assignment-backend.vercel.app/)

- Postman Link : [https://www.postman.com/assignment-7873/algoroot-assignment/collection/vr8lvmt/algoroot-assignment?action=share&creator=35181588](https://www.postman.com/assignment-7873/algoroot-assignment/collection/vr8lvmt/algoroot-assignment?action=share&creator=35181588)


