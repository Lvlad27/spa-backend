# Design Document: Social Media App Backend

This document describes the current implementation of the backend for a social media application. It complements a [frontend built with Vanilla JavaScript](https://github.com/Lvlad27/spa-frontend), focusing on providing a RESTful API for data management.

## 1. Introduction

This backend serves as a data provider for a [single-page application (SPA) frontend](https://github.com/Lvlad27/spa-frontend). The frontend, developed with HTML, CSS, and Vanilla JavaScript, utilizes this backend to persist data related to users and posts. This document outlines the technologies, architecture, and current functionalities of this specific backend implementation.

## 2. Purpose

The backend provides a RESTful API for user and post management, persisting data in a MongoDB database. It implements CRUD operations for both entities and handles image uploads.

## 3. Technical Design

### 3.1. Architecture

The backend follows a Model-View-Controller (MVC) architectural pattern.

*   **Models:** Define the data structure (User and Post) and interact with the MongoDB database using Mongoose. Located in the `models` directory (`UserModel.js`, `PostModel.js`).
*   **Controllers:** Handle incoming HTTP requests, interact with the models to perform CRUD operations, and return responses. Located in the `controllers` directory (`UserController.js`, `PostController.js`).
*   **Routes:** Define the API endpoints and map them to the corresponding controller actions. Located in the `routes` directory (`UserRouter.js`, `PostRouter.js`).

### 3.2. Technologies

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for creating the API.
*   **MongoDB:** NoSQL database for data storage.
*   **Mongoose:** ORM for MongoDB.
*   **dotenv:** For loading environment variables from a `.env` file.
*   **cors:** Enables Cross-Origin Resource Sharing (CORS).
*   **body-parser:** Middleware for parsing request bodies.
*   **multer:** Middleware for handling file uploads.

### 3.3. Modules and Components

*   **index.js (Entry Point):**
    *   Imports and configures Express.
    *   Connects to MongoDB using Mongoose.
    *   Uses `cors` and `body-parser` middleware.
    *   Mounts the `UserRouter` and `PostRouter` at `/dataservice` and `/dataservice/posts` respectively.
    *   Starts the Express server.

*   **Routes (UserRouter.js, PostRouter.js):**
    *   `UserRouter`: Handles requests related to users at `/dataservice`. Includes routes for creating, reading, updating, and deleting users, as well as uploading profile images.
    *   `PostRouter`: Handles requests related to posts at `/dataservice/posts`. Includes routes for creating, reading, and uploading images for posts.
    *   Utilizes `multer` for handling image uploads, storing them locally in `uploads` (UserRouter) and `posts` (PostRouter) directories.

*   **Controllers (UserController.js, PostController.js):**
    *   `UserController`: Contains functions for handling user-related operations (create, read all, read by ID, update, delete, upload profile image).
    *   `PostController`: Contains functions for handling post-related operations (create, read all, upload post image).
    *   Uses Mongoose models (`UserModel`, `PostModel`) to interact with the MongoDB database.

*   **Models (UserModel.js, PostModel.js):**
    *   `UserModel`: Defines the schema for users, including fields for email, password, first name, surname, country, birthday, gender, hobbies, and profile image name.
    *   `PostModel`: Defines the schema for posts, including a reference to the user who created the post (`postedBy`) and the filename of the associated image (`photo`).

### 3.4. Data Flow

1.  Frontend sends an HTTP request to an API endpoint.
2.  The Express server receives the request.
3.  The appropriate route matches the request URL and method.
4.  The route invokes the corresponding controller action.
5.  The controller action uses the Mongoose model to interact with MongoDB.
6.  The controller action sends a response back to the frontend.

### 3.5. API Endpoints

*   **User API (`/dataservice`)**
    *   `GET /`: Retrieve all users.
    *   `GET /:id`: Retrieve a specific user by ID.
    *   `GET /:id/posts`: Retrieve all posts by a specific user.
    *   `POST /create`: Create a new user.
    *   `POST /uploadProfileImg`: Upload a profile image for a user.
    *   `PATCH /update`: Update a user's information.
    *   `DELETE /delete`: Delete a user.

*   **Post API (`/dataservice/posts`)**
    *   `GET /`: Retrieve all posts.
    *   `POST /create`: Create a new post.
    *   `POST /upload`: Upload an image for a post.

### 3.6. Data Models

*   **User Model (UserModel.js):**
    *   `email`: String (required, lowercase, unique)
    *   `password`: String (required)
    *   `firstName`: String
    *   `surname`: String
    *   `country`: String
    *   `birthday`: String
    *   `gender`: Array
    *   `hobbies`: Array
    *   `profileImgName`: String

*   **Post Model (PostModel.js):**
    *   `postedBy`: ObjectId (reference to `UserModel`)
    *   `photo`: String
    *   `createdAt`: Date (timestamp - automatically generated)
    *   `updatedAt`: Date (timestamp - automatically generated)

## 4. Local Development Setup

1.  **Install Node.js:** Ensure Node.js is installed.
2.  **Clone the Repository:** Clone the backend repository.
3.  **Install Dependencies:** Run `npm install` in the project directory.
4.  **Configure Environment Variables:** Create a `.env` file with `DB_USERNAME` and `DB_PASSWORD` set to your MongoDB credentials.
5.  **Start MongoDB:** Ensure MongoDB is running.
6.  **Run the Backend:** Run `node index.js` or `npm start`.

## 5. Limitations

*   **Security:** Lacks authentication and authorization.
*   **Error Handling:** Basic error handling is implemented, but could be improved.
*   **Scalability:** Not designed for high traffic.
*   **Image Storage:** Stores images locally, not suitable for production.
*   **Data Validation:** Could benefit from more robust input validation.

---

## Chapter: Suggested Future Improvements

This section outlines potential improvements and enhancements for the current backend implementation. These improvements are not part of the existing functionality but are suggested for future development.

*   **Implement Authentication and Authorization:** Add user authentication (e.g., using JWT) to secure API endpoints and implement authorization to control access to resources based on user roles.
*   **Improve Error Handling:** Implement more comprehensive error handling, including logging, centralized error management, and more informative error messages for the frontend.
*   **Implement Input Validation:** Add robust input validation using libraries like Joi to prevent invalid data from being stored in the database.
*   **Enhance Image Storage:** Migrate image storage to a cloud-based service like AWS S3 or Azure Blob Storage to improve scalability and reliability.
*   **Add Unit Tests:** Implement unit tests using a testing framework like Jest or Mocha to ensure the correctness of the code and prevent regressions.
*   **Implement Caching:** Implement caching to improve performance and reduce database load.
*   **Consider a Message Queue:** Integrate a message queue to handle asynchronous tasks and improve responsiveness.
*   **Improve Code Structure:** Refactor the code to further improve readability, maintainability, and testability.
*   **Implement Logging:** Add robust logging to track API usage, errors, and performance metrics.
*   **API Versioning:** Implement API versioning to allow for future changes without breaking existing clients.
