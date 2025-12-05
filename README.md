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
  
- **Admin Capabilities**
  - View all submitted messages
  - Delete messages and manage submissions

### 👤 User Management (Admin Only)
- View and edit user profiles (name, email, role)
- Manage user roles and permissions
- Soft-delete or deactivate user accounts
- User activity monitoring

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0, JWT
- **File Storage**: Cloud/Local storage for media files

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials

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
   - Create `.env` files in both backend and frontend directories
   - Add required variables (MongoDB URI, Google OAuth credentials, JWT secret, etc.)

5. Run the application
   ```bash
   # Backend (from backend directory)
   npm start
   
   # Frontend (from frontend directory, in a new terminal)
   npm start
   ```

## Project Structure

```
Media-Gallery-Web-App/
├── backend/          # Express.js API server
├── frontend/         # React.js client application
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on the GitHub repository.