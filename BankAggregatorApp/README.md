# Banking Aggregator App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with React, Material-UI, and Axios to build a full-featured banking aggregator platform.

---

## Overview
The Banking Aggregator App consolidates multiple banking services into a single platform. Users can manage accounts, view transactions, apply for loans, and track investments. Admin users can manage users and banks.

The app is responsive, role-based, and built with secure API integration.

---

## Features

### User Types
**Regular Users:**
- View linked bank accounts
- Apply for loans
- Track investments
- Access transactions  

**Admin Users:**
- Manage users
- Manage banks

### Authentication
- **Login Page:** Secure login for users and admins with JWT token session storage  
- **Role-Based Access:** Redirects unauthorized users and restricts access to sensitive pages  

### Navigation
- **Side Navigation (DrawerMenu):** Displays menu items based on user role  
  - Home, Plans, About, FAQ, Contact  
  - Admin: Manage Users, Manage Banks  
  - Regular User: Accounts, Transactions  
- Clickable items close the drawer automatically  
- Modern UI with hover effects  
- **Routing:** React Router handles page navigation, with a 404 Not Found page for invalid routes  

### Landing Page
- Feature Cards: Savings Account, Current Account, Loans, Investments  
- Click a card to open a dialog form to perform actions  
- Clean, card-based UI with hover effects  
- Dialog shows different forms based on selected feature  

### Accounts & Transactions
- View all linked bank accounts  
- Paginated, sortable, and searchable grid  
- View recent transactions with filters by date, type, and account  

### Loans & Investments
- Apply for personal or home loans  
- Track investments including mutual funds and fixed deposits  
- Summary dashboards for loans and investments  

### Admin Pages
- Manage Users and Banks  
- Role-based access ensures only admins can manage sensitive data  

### Other Pages
- Plans Page, About Us, FAQ, Contact  

---

## Dialog Forms
- Contextual forms open when interacting with features  
- Account forms: create new account, set initial deposit, branch, currency, and limit  
- Loans and Investments: appropriate application or information forms  
- Actions integrate with backend APIs using JWT authorization  

---

## Role-Based Access Control
- **Admin (roleId = 4):** Manage Users and Banks  
- **Regular Users (roleId = 5 or 6):** Access Accounts and Transactions  
- Unauthorized access redirected to login or Not Found page  

---

## UI/UX Highlights
- Material-UI design: cards, dialogs, grids, clean typography  
- Drawer navigation: role-aware menu items  
- Inline form validation and disabled fields for non-editable data  

---

## API Integration
- Axios instance with JWT authorization  
- Endpoints:
  - `/Account/create` – create bank accounts  
  - `/Accounts` – fetch user accounts  
  - `/Transactions` – fetch transactions  
  - `/ManageUsers` – admin user management  
  - `/ManageBanks` – admin bank management  

---

## Project Structure
Bank/
├── components/ # Reusable components (FeatureCard, DrawerMenu)
├── pages/ # Application pages
├── context/ # Authentication and role context
├── api/ # Axios configuration and API integration
├── App.jsx # Main routing and layout
├── styles/ # Global styles and theme management
└── README.md

---

## Installation

### Prerequisites
- Node.js (v22+)  
- npm (Node package manager)  

### Steps
1. Clone the repository:

```bash
git clone https://github.com/Varsha-mohan20/Submission.git
cd Submission/DotNet/Bank

Install dependencies:

npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom@6 axios @mui/x-data-grid

Start the application:

npm start

The app should now be running at http://localhost:3000
.

Available Scripts
npm start

Runs the app in development mode. The page reloads on changes.

npm test

Launches the test runner in interactive watch mode.

npm run build

Builds the app for production in the build folder, optimizing React for best performance.

npm run eject

Warning: One-way operation. Once ejected, you cannot go back. Allows full control over configuration files and build dependencies.