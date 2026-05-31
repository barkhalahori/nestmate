# NestMate 🏠

A full-stack microservices platform for finding compatible flatmates, built with Spring Boot, React, Kafka, JWT auth, Stripe payments, ML-based matching, and a locally hosted AI chatbot.

---

## Microservices

| Service | Port | Description |
|---|---|---|
| api-gateway | 8080 | Single entry point, routes all requests |
| user-service | 8081 | Register, login, JWT auth, Google OAuth, roles |
| listing-service | 8082 | Post and manage flatmate listings |
| notification-service | 8083 | Kafka consumer, real-time alerts |
| matching-service | 8084 | ML-based compatibility scoring |
| payment-service | 8085 | Stripe payment integration |
| chatbot-service | 8086 | AI-powered doubt solving (Ollama + Llama 3.2) |

---

## Tech Stack

**Backend**
- Spring Boot 4.x, Spring Security
- Spring Cloud Gateway (API Gateway)
- Apache Kafka (event-driven messaging)
- MySQL (separate database per service)
- Maven, Lombok

**Frontend**
- React.js, React Router
- Axios for API calls
- Role-based UI (Seeker / Landlord)

**Auth**
- JWT — access token (15 min) + refresh token (7 days)
- Google OAuth2 login
- Role-based access control (SEEKER / LANDLORD)

**Payments**
- Stripe — PaymentIntent API, webhook handling

**ML / AI**
- Cosine similarity-based compatibility scoring across 6 lifestyle parameters
- Ollama + Llama 3.2 (locally hosted AI chatbot)

---

## Key Features

- ✅ JWT authentication with access token (15 min) and refresh token (7 days)
- ✅ Google OAuth2 login with automatic role assignment (SEEKER / LANDLORD)
- ✅ Role-based access control across all microservices
- ✅ Event-driven notifications via Apache Kafka
- ✅ ML compatibility scoring — ranks flatmate listings on 6 lifestyle parameters using cosine similarity
- ✅ Stripe payment integration for background verification (₹99)
- ✅ Duplicate payment prevention — blocks multiple payments from same user
- ✅ Each microservice independently secured with JWT filter
- ✅ Locally hosted AI chatbot using Ollama + Llama 3.2
- ✅ React frontend with role-based dashboard
- ✅ Floating chatbot widget accessible on all pages
- ✅ API Gateway as single entry point routing all requests

---

## Getting Started

### Prerequisites
- Java 21+
- MySQL
- Apache Kafka
- Maven
- Node.js + npm
- Ollama (for chatbot)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/barkhalahori/nestmate.git
cd nestmate
```

**2. Create MySQL databases**
```sql
CREATE DATABASE nestmate_users;
CREATE DATABASE nestmate_listings;
CREATE DATABASE nestmate_payments;
```

**3. Configure each service**

For each service, open `src/main/resources/application.properties` and set:
```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

For user-service, also set Google OAuth credentials:
```properties
spring.security.oauth2.client.registration.google.client-id=your_client_id
spring.security.oauth2.client.registration.google.client-secret=your_client_secret
```

For payment-service, set Stripe key:
```properties
stripe.secret.key=your_stripe_secret_key
```

**4. Start Kafka**
```bash
cd C:\kafka
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

**5. Start Ollama (for chatbot)**
```bash
ollama serve
ollama pull llama3.2
```

**6. Start all services in order**
```bash
cd user-service && mvn spring-boot:run
cd listing-service && mvn spring-boot:run
cd notification-service && mvn spring-boot:run
cd matching-service && mvn spring-boot:run
cd payment-service && mvn spring-boot:run
cd chatbot-service && mvn spring-boot:run
cd api-gateway && mvn spring-boot:run
```

All backend requests go through the gateway at `http://localhost:8080`

**7. Start the frontend**
```bash
cd nestmate-frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login, returns JWT tokens | No |
| POST | /auth/refresh | Get new access token | No |

### Profile
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /profile | Save user preferences | Yes |
| GET | /profile/{userId} | Get user preferences | Yes |

### Listings
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /listings | Create a listing | Yes |
| GET | /listings | Get all listings | Yes |
| GET | /listings/user/{userId} | Get listings by user | Yes |

### Matching
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /match/{userId} | Get AI-ranked compatible listings | Yes |

### Payments
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /payments/create-intent | Create Stripe payment intent | Yes |
| POST | /payments/webhook | Handle payment confirmation | No |
| GET | /payments/{userId} | Get payment history | Yes |

### Chatbot
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /chat | Send message to AI chatbot | No |

---

## How Matching Works

1. Seeker fills in lifestyle preferences (location, budget, vegetarian, AC, gender preference etc.)
2. Matching service fetches all available listings
3. Each listing is scored against seeker's preferences using weighted cosine similarity across 6 parameters:
   - Location match → 35% weight
   - Budget match → 25% weight
   - Vegetarian preference → 15% weight
   - Gender preference → 10% weight
   - AC availability → 8% weight
   - Electricity inclusion → 7% weight
4. Listings are sorted by score (highest first) and returned

---

## Author

**Barkha Lahori**
- GitHub: [@barkhalahori](https://github.com/barkhalahori)
