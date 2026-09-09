# Property Tax Collection & Tracking Platform

A web-based Property Tax Collection & Tracking Platform designed to simplify property registration, tax assessment, payment tracking, receipt management, notifications, and complaint handling through a centralized system.

## 📌 Project Overview

Property owners often need to manage property details, tax information, payment status, due dates, and receipts through different processes. This project provides a centralized platform where users can manage their properties and property tax information, while administrators can verify properties, manage tax assessments, monitor payments, and handle complaints.

The system is designed as a full-stack web application with a **React + Vite frontend**, **Java Spring Boot backend**, and **PostgreSQL database**.

## 🎯 Objectives

* Provide a centralized platform for property tax management.
* Allow users to register and manage their properties.
* Calculate and display property tax information.
* Track tax due dates and payment status.
* Provide online property tax payment functionality.
* Generate and manage payment receipts.
* Notify users about upcoming and overdue payments.
* Allow users to submit complaints.
* Provide administrators with tools to manage users, properties, taxes, payments, and complaints.

## 👥 User Roles

### User / Property Owner

* Register and log in.
* Register and manage properties.
* View property tax details.
* View tax amount and due dates.
* Check payment status.
* Make property tax payments.
* View payment history.
* View/download receipts.
* Receive notifications.
* Submit complaints.

### Admin

* Manage registered users.
* Manage property information.
* Verify properties.
* Manage tax assessments.
* Manage tax rules.
* Monitor payments.
* Manage receipts.
* Manage notifications.
* View and resolve complaints.
* Monitor pending, paid, and overdue taxes.

## ✨ Key Features

* User Registration and Login
* Role-Based Access
* Property Registration
* Property Verification
* Property Tax Assessment
* Tax Calculation
* Tax Due-Date Tracking
* Payment Management
* Payment History
* Receipt Generation
* Notifications
* Complaint Management
* Admin Dashboard
* Pending / Paid / Overdue Tax Tracking

## 🗃️ Core Database Entities

The main entities in the system are:

1. `USER`
2. `PROPERTY`
3. `LOCATION`
4. `PROPERTY_VERIFICATION`
5. `PROPERTY_TAX`
6. `TAX_RULE`
7. `PAYMENT`
8. `RECEIPT`
9. `NOTIFICATION`
10. `COMPLAINT`
11. `PROPERTY_TAX_RULE`

### Many-to-Many Relationship

The system contains a Many-to-Many relationship between `PROPERTY` and `TAX_RULE`.

This relationship is implemented using the junction table:

```text
PROPERTY_TAX_RULE
```

The table uses a composite primary key:

```text
PRIMARY KEY (property_id, rule_id)
```

Relationship:

```text
PROPERTY  M ───── N  TAX_RULE
              │
              ▼
      PROPERTY_TAX_RULE
```

## 🏗️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Axios / Fetch API

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Database

* PostgreSQL

### Development Tools

* Visual Studio Code
* Git
* GitHub

## 🔄 System Architecture

```text
┌─────────────────────────────┐
│       React + Vite          │
│          Frontend           │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│      Spring Boot            │
│          Backend            │
└──────────────┬──────────────┘
               │
               │ JPA / Hibernate
               ▼
┌─────────────────────────────┐
│        PostgreSQL           │
│          Database           │
└─────────────────────────────┘
```

## 📂 Planned Project Structure

```text
Property-Tax-Collection-and-Tracking-Platform/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── Problem_Statement.md
├── README.md
└── ...
```

## 🔐 Security

The application will implement:

* Role-based access control.
* Authentication and authorization.
* Secure password handling.
* Input validation.
* Database constraints.
* Protection against unauthorized access.
* Secure communication between frontend and backend APIs.

## 📊 Tax Status

The platform will track property tax using statuses such as:

* **Pending**
* **Due Soon**
* **Paid**
* **Overdue**

## 💳 Payment

For the project prototype, payment functionality may be demonstrated using simulated/mock payment processing.

Real bank transactions and government payment gateway integration are outside the project scope.

## 🔔 Notifications

The system will provide notifications for:

* Upcoming tax due dates.
* Overdue tax payments.
* Successful payments.
* Other relevant property tax updates.

## 📝 Complaints

Users can submit complaints related to their property tax or property information.

Administrators can:

* View complaints.
* Track complaint status.
* Review complaints.
* Resolve complaints.

## 🚫 Out of Scope

The following features are not included in the current project scope:

* Real government payment gateway integration.
* Real bank transaction processing.
* Integration with official government property databases.
* Aadhaar or government identity verification.
* GIS-based property boundary detection.
* Real SMS gateway integration.
* Mobile application development.
* AI-based tax prediction.
* Real-time property valuation using external data.
* Multi-state government tax integration.
* Production deployment for actual government use.

## 🎓 Project Context

This project is developed as an academic/project implementation to demonstrate database design, backend development, REST API development, frontend development, authentication, role-based access, and property tax management.

## 📌 Current Status

**Project Stage:** Initial Setup

Completed:

* Project repository created.
* Problem statement finalized.
* Git repository initialized.
* GitHub repository connected.
* `Problem_Statement.md` created.

Upcoming:

* Traditional ER Diagram
* Schema Mapping
* PostgreSQL Database Creation
* Backend Development
* REST API Development
* React + Vite Frontend
* Frontend–Backend Integration
* Testing
* Documentation

## 👩‍💻 Author

**Seetha Lakshmi**

Property Tax Collection & Tracking Platform
