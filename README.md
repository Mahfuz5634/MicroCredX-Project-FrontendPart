# 🏦 LoanLink - Microloan Request & Approval Tracker System

## 📋 Project Overview

LoanLink is a comprehensive web-based microloan management system designed to streamline the loan application, review, and approval process for small financial organizations, NGOs, and microloan providers. The platform connects borrowers with loan officers and administrators through an intuitive dashboard system.

## 🌐 Live URL

**Live Site:** https://microcredx.vercel.app/

## 🔗 Repository Links

- **Server Repository:**- https://github.com/Mahfuz5634/MicroCredX-Project-ServerPart

## 🎯 Project Purpose

The system addresses the challenge faced by microloan providers in managing loan applications, verification processes, approvals, EMI schedules, and repayments in one centralized platform. It provides role-based access for three types of users:
- **Admin** - Full system control and user management
- **Manager (Loan Officer)** - Loan creation and application management
- **Borrower** - Loan application and tracking

## ✨ Key Features

### 🔐 Authentication & Authorization
- Email/Password authentication with Firebase
- Social login (Google/GitHub)
- Role-based access control (Admin, Manager, Borrower)
- Firebase SDK authentication system
- Protected private routes

### 👥 User Roles & Permissions

#### Admin Dashboard
- Manage all users and their roles
- View and manage all loans in the system
- Control which loans appear on the homepage
- Monitor all loan applications with filtering
- Suspend or approve user accounts

#### Manager (Loan Officer) Dashboard
- Create and add new loan products
- Manage personal loan listings
- Review pending loan applications
- Approve or reject applications
- Track approved loans
- View personal profile

#### Borrower Dashboard
- Browse available loan products
- Apply for loans with detailed forms
- Track loan application status
- Make application fee payments via Stripe
- Cancel pending applications
- View personal profile

### 🏠 Public Features
- Modern, animated landing page with Framer Motion
- Available loans showcase (6 loans from database)
- "How It Works" section
- Customer feedback carousel
- Complete loan catalog page (All Loans)
- Detailed loan information pages
- Dark/Light theme toggle

### 💳 Payment Integration
- Stripe payment gateway for $10 application fees
- Payment status tracking
- Transaction details modal

### 🔍 Advanced Functionality
- Search and filter on user management
- Loan filtering by status (Pending, Approved, Rejected)
- Pagination on multiple pages
- Real-time data updates
- Toast/SweetAlert notifications
- Loading spinners for better UX
- 404 error page
- Dynamic page titles

## 🛠️ Technologies & Packages Used

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Icons** - Icon library
- **SweetAlert2** - Beautiful alerts
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Stripe** - Payment processing

### Authentication & Hosting
- **Firebase Authentication** - User authentication
- **Vercel/Netlify** - Frontend hosting
- **Vercel/Railway/Render** - Backend hosting

## 📦 NPM Packages

### Client Dependencies
```json
{
  "react": "^18.x.x",
  "react-router-dom": "^6.x.x",
  "tailwindcss": "^3.x.x",
  "framer-motion": "^11.x.x",
  "react-hook-form": "^7.x.x",
  "axios": "^1.x.x",
  "firebase": "^10.x.x",
  "sweetalert2": "^11.x.x",
  "react-toastify": "^10.x.x",
  "react-icons": "^5.x.x",
  "@tanstack/react-query": "^5.x.x",
  "@stripe/stripe-js": "^3.x.x",
  "@stripe/react-stripe-js": "^2.x.x",
  "react-confetti": "^6.x.x"
}
```

### Server Dependencies
```json
{
  "express": "^4.x.x",
  "mongodb": "^6.x.x",
  "mongoose": "^8.x.x",
  "jsonwebtoken": "^9.x.x",
  "bcrypt": "^5.x.x",
  "cookie-parser": "^1.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x",
  "stripe": "^14.x.x"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account
- Firebase project
- Stripe account

### Installation

#### Clone the repositories
```bash
# Clone client repository
git clone [your-client-repo-url]
cd loanlink-client

# Clone server repository
git clone [your-server-repo-url]
cd loanlink-server
```

#### Client Setup
```bash
npm install

# Create .env.local file
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

npm run dev
```

#### Server Setup
```bash
npm install

# Create .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_URL=your_frontend_url
PORT=5000

npm start
```

## 🎨 Features Implemented

✅ Role-based authentication system  
✅ Complete Admin dashboard with user & loan management  
✅ Manager dashboard for loan creation & approval workflow  
✅ Borrower dashboard for loan applications  
✅ Stripe payment integration for application fees  
✅ Real-time status updates  
✅ Search, filter, and pagination  
✅ Dark/Light theme toggle  
✅ Responsive design for all devices   
✅ Toast notifications for all actions  
✅ Loading states and error handling  
✅ 404 error page  
✅ Dynamic page titles  

## 🔒 Security Features

- Environment variables for sensitive data
- Protected API routes
- CORS configuration
- Firebase authentication
- Role-based access control

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1023px)
- 💻 Desktops (1024px and above)

## 🎯 Challenge Features Completed

✅ Search and filter on user management page  
✅ Pagination implementation  
✅ Admin suspend functionality with reason collection  
✅ Stripe payment integration for application fees  

## 👨‍💻 Admin Credentials

**Email:** admin@demo.microdex.com
**Password:** Admin@123

## 👔 Manager Credentials

**Email:** Manager@demo.microdex.com
**Password:** Manager@123


## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB for database solutions
- Stripe for payment processing
- All open-source package contributors

---

**Developed with ❤️ by Mahfuz**