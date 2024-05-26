# Crowdfunding App Backend API

Welcome to the **Crowdfunding App Backend API**! This RESTful API is designed for a scalable, high-performance crowdfunding platform. Built with Node.js, Express, MongoDB, Redis, JWT and BullMQ, it supports clustering and is fully containerized using Docker. A CI/CD pipeline ensures smooth deployment and maintenance.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
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
   git clone https://github.com/bamlakugetachew1/kickstarterprod.git
   
2. **Install dependencies**:
   ```sh
   cd kickstarterprod
   npm install
   
3. **Set up environment variables: Copy the .env.sample file to .env and obtain any necessary API keys from third-party services if needed**:

4. **Start development server**:
   ```sh
   npm start
   ```

5. **Run Docker**:
   ```sh
   docker-compose.dev up --build

## Usage

Once the server is up and running:

- If you're accessing through `npm start`, you can browse the API documentation at `http://localhost:3000/api-docs`.
- If you're using Docker, the API documentation can be found at `http://localhost/api-docs`, as Nginx is set up to proxy requests to port 3000 internally.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

