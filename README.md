# NestMate 🏠

A backend-heavy microservices platform for finding compatible flatmates,
built with Spring Boot, Kafka, JWT auth, Stripe payments, and ML-based matching.

## Microservices

| Service | Port | Description |
|---------|------|-------------|
| api-gateway | 8080 | Single entry point, routes all requests |
| user-service | 8081 | Register, login, JWT auth, Google OAuth, roles |
| listing-service | 8082 | Post and manage flatmate listings |
| notification-service | 8083 | Kafka consumer, real-time alerts |
| matching-service | 8084 | ML-based compatibility scoring |
| payment-service | 8085 | Stripe payment integration |

## Tech Stack

- **Backend** — Spring Boot 4.x, Spring Security
- **Database** — MySQL (separate DB per service)
- **Auth** — JWT (access token + refresh token), Google OAuth2, Role-based access
- **Messaging** — Apache Kafka (event-driven architecture)
- **Payments** — Stripe
- **ML** — Cosine similarity-based compatibility scoring
- **Tools** — Maven, Lombok, Postman

## Key Features

- JWT authentication with access token (15 min) and refresh token (7 days)
- Google OAuth2 login with role assignment (SEEKER / LANDLORD)
- Role-based access control across all services
- Event-driven notifications via Kafka
- ML compatibility scoring matching flatmates on 8 lifestyle parameters
- Stripe payment integration for background verification feature
- Each microservice independently secured with JWT filter

## Getting Started

### Prerequisites
- Java 21+
- MySQL
- Apache Kafka
- Maven

### Setup

1. Clone the repo
   git clone https://github.com/barkhalahori/nestmate.git

2. For each service, copy the example properties and fill in your values
   cp user-service/src/main/resources/application.properties.example
   user-service/src/main/resources/application.properties

3. Start Kafka
   cd C:\kafka
   .\bin\windows\kafka-server-start.bat .\config\server.properties

4. Start all services in order:
    - user-service
    - listing-service
    - notification-service
    - matching-service
    - payment-service
    - api-gateway

5. All requests go through the gateway at `http://localhost:8080`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns JWT tokens |
| POST | /auth/refresh | Get new access token |

### Listings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /listings | Create a listing |
| GET | /listings/user/{userId} | Get listings by user |

### Matching
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /matching/profile | Save user preferences |
| GET | /matching/{userId} | Get compatible matches |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /payments/create-intent | Create Stripe payment intent |
| POST | /payments/webhook | Handle payment confirmation |
| GET | /payments/{userId} | Get payment history |

## Author

[Barkha Lahori](https://github.com/barkhalahori)