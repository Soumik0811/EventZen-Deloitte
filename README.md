# EventZen

EventZen is a full-stack web application designed to streamline event planning and management. It provides a comprehensive solution for managing events, attendees, venues, vendors, and budgets. Built using modern technologies like React, Node.js, Spring Boot, .NET, and MongoDB, EventZen ensures scalability, efficiency, and an enhanced user experience.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [API Documentation](#api-documentation)
6. [Docker Integration](#docker-integration)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

### Core Functionalities
- **Event Management**:
  - Create, edit, and delete events.
  - Schedule events with time slots and venue assignments.
  - Manage event categories, themes, capacity limits, and pricing.

- **Venue Management**:
  - Maintain a database of available venues.
  - Manage venue capacities, amenities, and pricing.
  - Book and allocate venues for events.

- **Attendee Management**:
  - Create and manage attendee profiles.
  - Process event registrations and ticket sales.
  - Send out event invitations and reminders.
  - Track attendee attendance and feedback.

- **Vendor Management**:
  - Maintain a database of vendors (caterers, decorators, etc.).
  - Manage vendor profiles, contact information, and services.
  - Assign vendors to events and track their performance.

- **Budget Management**:
  - Create and manage event budgets.
  - Track expenses and revenue.
  - Generate detailed financial reports.

### Customer Portal
- Allow customers to view event details, schedules, and venue information.
- Enable online event bookings and ticket purchases.
- Provide a platform for customers to interact with event organizers and ask questions.

### Admin Dashboard
- Centralized dashboard for event managers to monitor event progress, manage bookings, and track revenue.
- Generate reports on event performance, attendee statistics, and financial summaries.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Router, Axios
- **Backend**:
  - Node.js (Express) for Attendee Management
  - Spring Boot for Event APIs
  - .NET for Vendor and Venue Management
- **Database**: MongoDB (Atlas cloud)
- **Containerization**: Docker, Docker Compose
- **Other Tools**: Axios, React Hot Toast, Lucide React Icons

# EventZen - Backend and Frontend Endpoints

## Backend Endpoints

### Authentication
- **POST /api/auth/organizer/signup**  
  Description: Register a new organizer.  
  Request Body: `{ name, email, password }`  

- **POST /api/auth/organizer/login**  
  Description: Log in an existing organizer.  
  Request Body: `{ email, password }`  

- **POST /api/auth/attendee/signup**  
  Description: Register a new attendee.  
  Request Body: `{ name, email, phone, password }`  

- **POST /api/auth/attendee/login**  
  Description: Log in an existing attendee.  
  Request Body: `{ email, password }`  

---

### Events
- **GET /api/events**  
  Description: Fetch all events.  

- **GET /api/events/:eventId**  
  Description: Fetch details of a specific event.  

- **POST /api/events**  
  Description: Create a new event.  
  Request Body: `{ eventName, eventDateTime, venueName, capacityLimits, pricing, categoryTheme }`  

- **PUT /api/events/:eventId**  
  Description: Update an existing event.  
  Request Body: `{ eventName, eventDateTime, venueName, capacityLimits, pricing, categoryTheme }`  

- **DELETE /api/events/:eventId**  
  Description: Delete an event.  

---

### Attendees
- **GET /api/attendees**  
  Description: Fetch all attendees.  

- **GET /api/attendee/event/:eventId**  
  Description: Fetch attendees registered for a specific event.  

- **POST /api/attendees**  
  Description: Register a new attendee for an event.  
  Request Body: `{ name, email, phone, event_name, ticket_status, payment_status }`  

- **PUT /api/attendees/:attendeeId**  
  Description: Update an attendee's details.  
  Request Body: `{ name, email, phone, event_name, ticket_status, payment_status }`  

- **DELETE /api/attendees/:attendeeId**  
  Description: Delete an attendee.  

---

### Vendors
- **GET /api/events/:eventId/vendors**  
  Description: Fetch vendors assigned to a specific event.  

- **POST /api/events/:eventId/vendors**  
  Description: Add a new vendor for an event.  
  Request Body: `{ name, service, contact }`  

- **PUT /api/events/:eventId/vendors/:vendorId**  
  Description: Update a vendor's details for an event.  
  Request Body: `{ name, service, contact }`  

- **DELETE /api/events/:eventId/vendors/:vendorId**  
  Description: Remove a vendor from an event.  

---

### Venues
- **GET /api/venues**  
  Description: Fetch all venues.  

- **POST /api/venues**  
  Description: Add a new venue.  
  Request Body: `{ name, address, capacity, amenities, pricing }`  

- **PUT /api/venues/:venueId**  
  Description: Update a venue's details.  
  Request Body: `{ name, address, capacity, amenities, pricing }`  

- **DELETE /api/venues/:venueId**  
  Description: Delete a venue.   

---

## Frontend Endpoints

### Pages
- **/**  
  Description: Home page with event details and registration options.  

- **/auth/attendee**  
  Description: Attendee authentication (login/signup).  

- **/auth/organizer**  
  Description: Organizer authentication (login/signup).  

- **/organizer**  
  Description: Organizer dashboard to manage events, attendees, vendors, and venues.  

- **/event/:eventId**  
  Description: Event-specific dashboard for managing details of a particular event.  

- **/create-event**  
  Description: Page for creating new events.  

- **/attendee/profile**  
  Description: Attendee profile page to view or update personal details.  

---

### API Calls (Frontend)
- **GET /api/events**  
  Description: Fetch all events for the home page.  

- **POST /api/auth/organizer/signup**  
  Description: Register a new organizer.  

- **POST /api/auth/organizer/login**  
  Description: Log in an existing organizer.  

- **POST /api/auth/attendee/signup**  
  Description: Register a new attendee.  

- **POST /api/auth/attendee/login**  
  Description: Log in an existing attendee.  

- **GET /api/attendees**  
  Description: Fetch all attendees for the organizer dashboard.  

- **GET /api/attendee/event/:eventId**  
  Description: Fetch attendees for a specific event.  

- **GET /api/events/:eventId/vendors**  
  Description: Fetch vendors for a specific event.  

- **GET /api/venues**  
  Description: Fetch all venues for venue management.    


# Docker Integration for EventZen

EventZen leverages Docker to streamline the development, testing, and deployment processes. Docker ensures consistency across environments by containerizing the application and its dependencies. Below is an explanation of how Docker is integrated into the project, along with instructions for setting up and running the application using Docker.

---

## Why Use Docker?

- **Consistency**: Ensures the application runs the same way on all machines (development, testing, production).
- **Isolation**: Each service (e.g., backend, frontend, database) runs in its own container, avoiding conflicts.
- **Scalability**: Simplifies scaling and deployment using orchestration tools like Docker Compose or Kubernetes.
- **Ease of Setup**: Reduces the complexity of setting up the development environment by automating dependency installations.

---

## Docker Components in EventZen

### 1. **Backend Container**
   - The backend is built using Node.js, Express, and other required libraries.
   - The Dockerfile installs dependencies, starts the server, and connects to the MongoDB container.

### 2. **MongoDB Container**
   - A pre-built MongoDB image is used to run the database service.
   - Data persistence is achieved using Docker volumes to store MongoDB data.

### 4. **Docker Compose**
   - Docker Compose is used to define and manage multi-container setups.
   - It ensures that the frontend, backend, and MongoDB containers communicate seamlessly.

---

## Docker Setup Instructions

### Prerequisites
1. **Install Docker**: Download and install Docker from [https://www.docker.com/](https://www.docker.com/).
2. **Install Docker Compose**: Ensure Docker Compose is installed (included by default in Docker Desktop for Windows and macOS).

### Steps to Run the Application

#### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/eventzen.git
cd eventzen
