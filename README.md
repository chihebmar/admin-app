# Enterprise Admin App

Modern full-stack enterprise admin application built with Angular and Spring Boot.

---

# Overview

This project is a modern scalable admin application designed with enterprise architecture principles.

It includes:

* JWT authentication
* Role & status referential system
* User management
* Dashboard
* Profile page
* Internationalization (FR / EN)
* Responsive admin layout
* Reusable Angular components
* Spring Boot REST API
* Backend pagination
* Liquibase database versioning

---

# Tech Stack

## Frontend

* Angular Standalone Components
* TypeScript
* SCSS
* ngx-translate
* PrimeIcons
* Responsive Design

## Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Liquibase
* MySQL
* Maven

---

# Architecture

## Frontend Architecture

```text
admin-frontend/
├── core/
│   ├── guards/
│   ├── interceptors/
│   └── services/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── profile/
│   └── users/
│
├── layout/
│   ├── navbar/
│   ├── sidebar/
│   └── main-layout/
│
├── shared/
│   └── components/
│       ├── data-table/
│       ├── app-modal/
│       ├── search-bar/
│       ├── page-header/
│       └── referentiel-select/
```

## Backend Architecture

```text
admin-backend/
├── auth/
├── common/
├── config/
├── referentiel/
├── security/
└── user/
```

---

# Main Features

## Authentication

* JWT login
* Route protection
* Logout
* Auth interceptor
* Profile endpoint

## User Management

* Create user
* Update user
* Delete user
* Paginated user list
* Dynamic referential selects

## Referential System

Reusable referential architecture:

* Roles
* Statuses
* Configurable future business referentials

## Dashboard

* Total users
* Active users
* Inactive users
* Users by role visualization

## Internationalization

* French / English support
* Dynamic translations
* Dynamic referential labels

## Responsive UI

* Responsive sidebar
* Mobile drawer navigation
* Sticky navbar
* Responsive profile page
* Modern login page

---

# Security

Implemented using Spring Security + JWT.

Protected routes:

* /users
* /dashboard
* /profile

Public routes:

* /login
* /auth/login

---

# Backend APIs

## Authentication

```http
POST /auth/login
GET /auth/me
```

## Users

```http
GET /users
GET /users/page?page=0&size=5
POST /users
PUT /users/{id}
DELETE /users/{id}
```

## Referentials

```http
GET /referentiels/type/{codeRefType}
```

---

# Database Versioning

Liquibase is used for:

* schema creation
* data initialization
* referential initialization
* users initialization

Important rule:

> Never modify executed Liquibase changesets.
> Always create new changesets.

---

# Installation

## Backend

```bash
cd admin-backend
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

## Frontend

```bash
cd admin-frontend
npm install
ng serve
```

Frontend runs on:

```text
http://localhost:4200
```

---

# Future Improvements

* Toast notifications
* Advanced dashboard charts
* Search backend API
* Sorting & filtering
* Role-based permissions
* Referentiel management module
* Dark mode
* Dockerization
* CI/CD pipeline
