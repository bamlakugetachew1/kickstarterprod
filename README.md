# Crowdfunding App Backend API

Welcome to the **Crowdfunding App Backend API**! This RESTful API is designed for a scalable, high-performance crowdfunding platform. Built with Node.js, Express, MongoDB, Redis, JWT and BullMQ, it supports clustering and is fully containerized using Docker. A CI/CD pipeline ensures smooth deployment and maintenance.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication & Authorization**: Secure user registration, login, and JWT based access control .
- **Project Management**: Create, update, and delete crowdfunding projects.
- **Funding Transactions**: Securely process pledges and track funding progress.
- **Rewards Management**: Handle reward tiers for backers.
- **Background Processing**: Queue management for background tasks with BullMQ.
- **Caching**: Enhanced performance and reduced database load with Redis.
- **Data Validation & Error Handling**: Robust input validation and comprehensive error handling.
- **API Documentation**: Detailed API documentation for easy integration.
- **Scalability**: Horizontal scalability supported via clustering and Nginx.
- **Database Efficiency**: Efficient querying using Mongoose aggregate and lean operators.
- **Containerization**: Fully containerized with Docker for consistent environments.
- **CI/CD Pipeline**: Automated testing, integration, and deployment.

## Technologies Used
- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Background Jobs**: BullMQ
- **Caching**: Redis
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Testing**: Jest
- **Documentation**: Swagger

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/crowdfunding-api.git
