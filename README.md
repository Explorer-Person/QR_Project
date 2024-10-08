
# This Article Includes:
- Backend Architecture
- Clients Architecture
- Directory Info
- Project Structure
- Environment Configuration
- API Structure
- Static File Serving
- Database Management
- Middleware Implementation
- Error Handling
- Validation Logic
- Session Management
- Deployment Process

# QRGenerator APP

This document provides a detailed overview of the `QRGenerator` application, its architecture, technologies, configuration, and deployment.

## Project Overview

The `QRGenerator` app is designed to generate and manage QR codes for both users and admins, providing two separate interfaces (clients) for these roles. The backend provides API endpoints for QR code generation, data management, and various other operations.

## Project Structure

The `QRGenerator` project is split into two main clients:

1. **UserInfoPanel** - Client-side interface for user operations.
2. **AdminPanel** - Client-side interface for admin operations.

Both clients interact with the backend through RESTful APIs, and their static files are served from the following directories:

- **UserInfoPanel static files**: `QRGenerator/clients/UserInfoPanel/dist`
- **AdminPanel static files**: `QRGenerator/clients/AdminPanel/dist`

### Backend Structure

- **app.js**: The main entry point for the backend application is located outside the `src` directory.
- **Routes**: API routes are dynamically fetched using environment variables for the server URL. The format for API requests is: 
  ```js
  ${import.meta.env.VITE_ENV_SERVER_URL}/api/user/getOne${endpoint}
  ```

## Key Features

1. **QR Code Generation**: Generates QR codes for user and admin interactions, handled via API requests.
2. **Session Management**: Handles user and admin sessions securely, including authentication and session termination during logout.
3. **Static File Serving**: Express serves static files from the `dist` directories of both clients.
4. **Custom Validation**: Data is validated differently based on whether it's received as `multipart/form-data` or `application/json`.
5. **Notification System**: Uses React Toastify for displaying API response messages in a user-friendly way, ensuring only one error message per parameter.

## Technologies Used

### Frontend

- **React**: The frontend for both the `UserInfoPanel` and `AdminPanel` is built using React.
- **React Toastify**: Used for notifications.
- **TypeScript**: The frontend is written using TypeScript for type safety and better development experience.

### Backend

- **Node.js/Express.js**: The backend is built using Express.js, a fast, minimalist web framework for Node.js.
- **helmet**: Security middleware used for setting various HTTP headers.
  - Includes `contentSecurityPolicy`, `referrerPolicy`, `frameguard`, `xssFilter`, `noSniff`, and `hidePoweredBy`.
  - Allows specific origins for scripts, images, styles, and connections based on the client and API endpoints.

- **Multer**: Used for handling file uploads (e.g., images, videos).
- **Http-Multipart-Data-Parser**: Handles `multipart/form-data` in requests for better file upload management.

## File Upload Configuration

File uploads are processed differently based on the content type:

- **JSON Requests**: For standard API requests without file uploads.
- **Multipart Requests**: For handling file uploads such as images or MP4 videos, managed using `Multer` and parsed with `Http-Multipart-Data-Parser`.

The database stores file information in the `img` column as JSON objects containing `filePath` and `fileName`.

### Example of JSON data for file storage:

```json
{
  "filePath": "/uploads/images",
  "fileName": "qr-code-image.png"
}
```

## API Routes

### Example Route Configuration

All routes follow this format:
```js
${import.meta.env.VITE_ENV_SERVER_URL}/api/user/getOne${endpoint}
```

### User Routes

- **GET /api/user/getOne/:id**: Fetches information for a specific user.
- **POST /api/user/create**: Creates a new user with QR code details.

### Admin Routes

- **GET /api/admin/getAll**: Retrieves all admin details.
- **POST /api/admin/login**: Handles admin login and session creation.

## Deployment

### Hosting on Heroku

The application is deployed on Heroku under the app name `my-qr-app-test`. Both the client and server are hosted under a single app for simplicity.

- **App URL**: [https://my-qr-app-test-b341ef675a24.herokuapp.com/](https://my-qr-app-test-b341ef675a24.herokuapp.com/)
- The Heroku deployment uses a single dyno to serve both the static assets for the clients and the API routes for the backend.

### Environment Variables

The application uses environment variables for sensitive data, such as API URLs and credentials. The following environment variables are defined:

- `VITE_ENV_SERVER_URL`: The base URL for server-side API calls.
- `CLIENT_USER`: The origin for user-side operations.
- `CLIENT_ADMIN`: The origin for admin-side operations.

### Custom Port Assignment

 Assigned specific static ports for both clients:

- **UserInfoPanel**: Runs on a 5186 port.
- **AdminPanel**: Runs on a 5189 port.


## Security

The app employs various security best practices, including:

- **Helmet**: For setting secure HTTP headers.
- **Session Management**: Sessions are managed securely using session tokens.
- **CORS Policy**: Allows specific origins (`CLIENT_USER`, `CLIENT_ADMIN`) to interact with the backend, enforcing strict domain control.

## Using App in Dev
```cmd  /clients/AdminPanel and /clients/UserInfoPanel
  npm i 
  npm run dev
  ```
 also configure and create .env files on root directory of app and add
 ```.env 
  VITE_ENV_SERVER_URL= your_server_host_url
  ```
 for both client app

In backend: 
create .env in root /QRGenerator
 ```.env 
  VITE_ENV_SERVER_URL= your_server_host_url

  DB_HOST= ...
  DB_USER= ...
  DB_PASSWORD= ...
  DB_NAME= ...

  PORT= ...

  SESSION_SECRET= ...

  NODE_ENV= production_or_development

  CLIENT_ADMIN= ...
  CLIENT_USER= ...
  VITE_ENV_SERVER_URL= ...
  ```
 and also there
 ```cmd
  npm i
  npm start
  # also you can install nodemon globally with 'npm i nodemon -g --save' and start with
  nodemon app.js
   
  ```

---

---
## Project Directory: `\QRGenerator`

### Root Files:
```
.env
.gitignore
app.js
module-alias.js
package-lock.json
package.json
Procfile
```

### Folders:
- `clients/`
- `src/`

---

### Folder: `clients/`

#### Subfolders:
- `AdminPanel/`
- `UserInfoPanel/`

---

### Folder: `clients/AdminPanel/`

#### Root Files:
```
.babelrc
.env
.eslintrc.cjs
.gitignore
index.html
package-lock.json
package.json
README.md
tsconfig.json
tsconfig.node.json
tsconfig.node.tsbuildinfo
vite.config.d.ts
vite.config.js
vite.config.ts
```

#### Subfolders:
- `dist/`
- `public/`
- `src/`

---

### Folder: `clients/AdminPanel/src/`

#### Root Files:
```
App.tsx
main.tsx
vite-env.d.ts
```

#### Subfolders:
- `assets/`
- `components/`
- `data/`
- `error/`
- `hooks/`
- `interfaces/`
- `layouts/`
- `page/`
- `store/`
- `utils/`

---

### Folder: `clients/AdminPanel/src/store/`

#### Files:
```
hook.ts
index.ts
store.ts
```

#### Subfolders:
- `apis/`
- `slices/`

---

### Folder: `clients/UserInfoPanel/`

#### Root Files:
```
.babelrc
.env
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
tsconfig.json
tsconfig.node.json
tsconfig.node.tsbuildinfo
vite.config.d.ts
vite.config.js
vite.config.ts
```

#### Subfolders:
- `dist/`
- `public/`
- `src/`

---

### Folder: `clients/UserInfoPanel/src/`

#### Root Files:
```
App.tsx
main.tsx
vite-env.d.ts
```

#### Subfolders:
- `assets/`
- `data/`
- `error/`
- `interfaces/`
- `layouts/`
- `page/`

---

### Folder: `src/`

#### Subfolders:
- `controllers/`
- `db/`
- `handlers/`
- `middlewares/`
- `migrations/`
- `models/`
- `qrs/`
- `queries/`
- `routes/`
- `uploads/`
- `utils/`
- `validator/`

---
# More Info About Architecture

The project follows a **Three-Tier Architecture**:

### Backend:
- Built using the **MVC (Model-View-Controller)** structure to separate concerns.
- The **Model** handles database interactions and data logic.
- The **View** serves static files, which are the pre-built clients (`AdminPanel` and `UserInfoPanel`).
- The **Controller** manages the request handling, connecting the view and the model.

### Clients:
- The application has two clients: **AdminPanel** and **UserInfoPanel**.
- Both clients are built separately using **Vite** and **TypeScript**.
- These clients are **served statically** from the backend after being built, ensuring they are part of the overall deployment.

### Three-Tier Structure:
1. **Presentation Layer**: The frontend clients (`AdminPanel` and `UserInfoPanel`) handle user interaction.
2. **Application Layer**: The backend manages business logic, request routing, and middleware.
3. **Data Layer**: The backend interacts with the database, utilizing models and queries to handle data persistence and retrieval.

This structure ensures a modular and maintainable codebase where the clients and backend are well-separated but seamlessly integrated.




Images: 


![Ekran görüntüsü 2024-09-23 142440](https://github.com/user-attachments/assets/d344f6e5-f007-4b9c-baa4-3d33aa94aeeb)

![Ekran görüntüsü 2024-09-23 142041](https://github.com/user-attachments/assets/fada1406-34d1-4def-a583-0c950da2f8dc)

![Ekran görüntüsü 2024-09-23 142253](https://github.com/user-attachments/assets/ea43056d-94a8-442d-a1f7-d97646362db8)

![Ekran görüntüsü 2024-09-23 142440](https://github.com/user-attachments/assets/a0c581c8-15c3-4a23-8892-07865682969a)

![Ekran görüntüsü 2024-09-23 142636](https://github.com/user-attachments/assets/0ff52d61-9ef6-4b52-92e0-e8b6ec9caaa3)

![Ekran görüntüsü 2024-09-24 091156](https://github.com/user-attachments/assets/1eec6421-823e-4c0b-8510-07c0d58d6e20)

![Ekran görüntüsü 2024-09-23 142710](https://github.com/user-attachments/assets/d53391ba-790d-44df-b276-f0a7c1ae9647)

![Ekran görüntüsü 2024-09-23 142747](https://github.com/user-attachments/assets/768e2c4d-5b59-4fe7-9bb8-29a4434c70d5)

![Ekran görüntüsü 2024-09-23 142821](https://github.com/user-attachments/assets/4c907544-c2e9-43c1-8a0c-c9ee92dac640)

![Ekran görüntüsü 2024-09-23 142848](https://github.com/user-attachments/assets/ea30999c-c31a-4fe0-b5d8-aac13c8200ae)

![Ekran görüntüsü 2024-09-23 142909](https://github.com/user-attachments/assets/8107c7ec-c627-4767-b11e-4cdf972ab0dd)

![Ekran görüntüsü 2024-09-23 143012](https://github.com/user-attachments/assets/127dc6f3-0e49-4b89-9507-d1b937fd72f4)
