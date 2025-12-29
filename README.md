# Media Gallery Management System

A full-stack web application for managing media galleries with contact form integration, built using the MERN stack (MongoDB, Express, Next.js, Node.js).

## Overview

This application enables users to create and manage personal or shared media galleries with secure authentication. It supports multiple user roles (admin and regular users) with role-based access controls, allowing efficient management of media files and user-submitted messages.

## Features

### 🔐 Authentication & Security
- **Google OAuth 2.0** - Social login integration
- **Email/Password Authentication** - Manual registration with Gmail OTP verification
- **Forgot Password** - Password recovery via Gmail OTP
- **Protected Routes** - Middleware-based route protection and session management

### 🖼️ Media Gallery Management

#### Upload & Validation
- Drag & drop image uploads (JPG/PNG formats, max 5MB)
- File preview with metadata (title, description, and tags)
- Real-time validation feedback

#### Gallery Management
- Create personal or shared galleries
- Advanced search and filtering by tags and titles
- Full-screen image viewer with navigation slider

#### CRUD Operations
- Add, edit, and delete media files
- Update metadata (title, description, tags)
- Multiple image selection for bulk operations

#### Batch Operations
- Download selected images as ZIP files
- Support for both frontend and backend processing

### 📬 Contact Form
- **User Capabilities**
  - Submit messages through contact form
  - Edit and delete own messages
  - Real-time message status updates
  
- **Admin Capabilities**
  - View all submitted messages with real-time notifications
  - Delete messages and manage submissions
  - Message list with search and filtering

### 🔔 Real-time Features
- Socket.IO integration for live updates
- Real-time message notifications for admins
- Live user status updates
- Instant feedback on account suspension/activation

### 👤 User Management (Admin Only)
- View and edit user profiles (name, email, role)
- Manage user roles and permissions
- Suspend/unsuspend user accounts with real-time status updates
- User activity monitoring and statistics
- Track active, suspended, and admin users

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons, React Icons
- **File Handling**: React Dropzone, JSZip, FileSaver
- **Real-time**: Socket.IO Client
- **Authentication**: React OAuth Google

### Backend
- **Runtime**: Node.js with Express.js 5
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth 2.0, JWT, bcrypt
- **File Storage**: Cloudinary (cloud storage)
- **File Processing**: Multer, Archiver (ZIP creation)
- **Real-time**: Socket.IO
- **Email**: Nodemailer (OTP verification)

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials
- Cloudinary account (for image storage)
- Gmail account (for OTP verification)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/Media-Gallery-Web-App.git
   cd Media-Gallery-Web-App
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables
   
   **Backend `.env`:**
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   ```
   
   **Frontend `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. Run the application
   ```bash
   # Backend (from backend directory)
   npm run dev    # Development mode with nodemon
   # or
   npm start      # Production mode
   
   # Frontend (from frontend directory, in a new terminal)
   npm run dev    # Development mode
   # or
   npm start      # Production mode
   ```

## Project Structure

```
Media-Gallery-Web-App/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── config/      # Database and Cloudinary configuration
│   │   ├── controllers/ # Business logic (auth, admin, images, etc.)
│   │   ├── middleware/  # Authentication and file upload middleware
│   │   ├── models/      # MongoDB schemas (User, Image, Message)
│   │   ├── routes/      # API endpoints
│   │   ├── utils/       # Email utilities
│   │   ├── app.js       # Express app configuration
│   │   └── server.js    # Server entry point with Socket.IO
│   └── package.json
├── frontend/            # Next.js 16 with TypeScript
│   ├── src/
│   │   └── app/
│   │       ├── admin/           # Admin pages (users, messages)
│   │       ├── auth/            # Authentication pages
│   │       ├── components/      # Reusable UI components
│   │       ├── contact/         # Contact form page
│   │       ├── dashboard/       # User dashboard
│   │       ├── gallery/         # Image gallery
│   │       ├── hooks/           # Custom React hooks
│   │       ├── lib/             # API and auth utilities
│   │       ├── upload/          # Image upload page
│   │       └── zip/             # ZIP download page
│   └── package.json
└── README.md
```

## Key Features Implementation

### Account Suspension
- Admins can suspend user accounts
- Suspended users are automatically logged out
- Dedicated suspended account page
- Real-time status synchronization via Socket.IO

### Image Storage
- Cloudinary integration for reliable cloud storage
- Automatic image optimization and transformation
- Secure upload with multer middleware
- Support for JPG/PNG formats up to 5MB

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on the GitHub repository.