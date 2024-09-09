
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

---
