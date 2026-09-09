# Problem Statement

## 1. Title

Property Tax Collection & Tracking Platform

## 2. Domain

Property Tax Management / E-Governance

## 3. Who is the user? (2-3 user types, with roles)

### 1. User / Property Owner
- Registers and logs into the application.
- Registers and manages property details.
- Views property tax details, due dates, and payment status.
- Makes property tax payments.
- Downloads/views payment receipts.
- Receives tax due-date notifications.

### 2. Admin
- Manages registered users and properties.
- Verifies property information.
- Manages property tax assessments.
- Monitors payments and tax status.
- Manages notifications and handles complaints.

### 3. Tax Authority / Staff
- Reviews property and tax information.
- Monitors tax collection records.
- Updates tax-related information when required.
- Tracks pending and overdue tax payments.

## 4. What problem are we solving? (3-5 sentences, real-life example)

Property owners may find it difficult to manage property tax information, payment status, due dates, and receipts when these activities are handled through different systems or records. The proposed system provides a centralized platform for managing property tax information for both urban and rural properties. For example, a property owner can register a property, view the calculated tax amount and due date, make a payment, and track the payment status from one dashboard. The system also provides notifications for upcoming and overdue tax payments, helping users avoid missed deadlines.

## 5. Proposed Solution (what the application will do, feature-wise)

The application will provide the following features:

- User registration and login.
- Role-based access for User and Admin.
- Property registration.
- Generation of a unique Property ID / Assessment Number.
- Storage of property details such as property type, area, address, district, and urban/rural classification.
- Property verification and status tracking.
- Property tax assessment and tax amount calculation.
- Display of tax amount and due date.
- Tax status tracking such as Pending, Due Soon, Paid, and Overdue.
- Online property tax payment.
- Payment history tracking.
- Receipt generation after successful payment.
- Notifications for upcoming due dates and overdue taxes.
- Complaint submission and management.
- Admin dashboard for managing users, properties, taxes, payments, and complaints.

## 6. Core Entities / Database Tables (list all, minimum 5)

The core database entities are:

1. USER
2. PROPERTY
3. LOCATION
4. PROPERTY_VERIFICATION
5. PROPERTY_TAX
6. TAX_RULE
7. PAYMENT
8. RECEIPT
9. NOTIFICATION
10. COMPLAINT

### Junction Table

11. PROPERTY_TAX_RULE

`PROPERTY_TAX_RULE` will be used as a junction table for the Many-to-Many relationship between `PROPERTY` and `TAX_RULE`.

The composite primary key will be:

`(property_id, rule_id)`

## 7. User Roles & Permissions (minimum 2 distinct roles)

### USER

Permissions:
- Register and log in.
- Add and manage their property details.
- View property tax details.
- View tax due dates and status.
- Make payments.
- View payment history.
- View/download receipts.
- Receive notifications.
- Submit complaints.

### ADMIN

Permissions:
- Manage users.
- Verify registered properties.
- Manage property information.
- Manage tax assessments.
- Manage tax rules.
- View and monitor payments.
- Generate/manage receipts.
- Send/manage notifications.
- View and resolve complaints.
- Monitor pending, paid, and overdue taxes.

## 8. Success Criteria

The system will be considered successful when:

- A user can register and log in successfully.
- A user can register a property and receive a unique property/assessment number.
- A user can view the tax amount and due date for a registered property.
- A user can check whether the tax is Pending, Due Soon, Paid, or Overdue.
- A user can complete a property tax payment and receive a receipt.
- A user can view their payment history.
- The system can generate notifications for upcoming and overdue tax payments.
- Admin can verify properties and manage tax-related records.
- Admin can view and manage user complaints.
- The database maintains correct relationships, primary keys, foreign keys, unique constraints, and the required composite key.

## 9. Out of Scope (clearly list what you will NOT build, to avoid over-commitment)

The following features are outside the scope of this project:

- Real government payment gateway integration.
- Real bank account or financial transaction processing.
- Integration with official government property databases.
- Automatic verification using government records.
- GIS/map-based property boundary detection.
- Aadhaar or other government identity verification.
- Real SMS gateway integration.
- Mobile application development.
- Advanced AI-based tax prediction.
- Real-time property valuation using external data.
- Multi-state government tax integration.
- Production deployment for actual government use.

For the project prototype, payment, notification, and verification functionality may be demonstrated using simulated/mock data.



## 10. Chosen Track: Java (Spring Boot) / Python (Django or FastAPI)

**Chosen Track: Java (Spring Boot)**

The backend will be developed using Java with Spring Boot.

### Backend Technologies

* Java
* Spring Boot
* PostgreSQL
* REST APIs
* Spring Data JPA / Hibernate
* Maven

### Frontend Technologies

The frontend will be developed using **React with Vite**.

* React
* Vite
* JavaScript
* HTML
* CSS
* Axios / Fetch API for backend communication

The React Vite frontend will communicate with the Spring Boot backend through REST APIs.
