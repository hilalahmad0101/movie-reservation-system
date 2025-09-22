# 🎬 Movie Reservation System

A full-featured Movie Reservation System built with **NestJS**, **TypeORM**, and **PostgreSQL**, supporting comprehensive movie booking functionality with payment processing and real-time seat management.

## ✨ Features

- ✅ **User & Admin Authentication** - JWT-based authentication with role-based access control
- ✅ **Movies Management** - Complete CRUD operations for movie catalog
- ✅ **Cinemas & Screens** - Multi-cinema support with different screen types
- ✅ **Showtimes** - Flexible scheduling system for movie screenings
- ✅ **Seats Management** - VIP/Regular seats with real-time availability tracking
- ✅ **Reservations** - Advanced booking system with seat selection
- ✅ **Discounts & Coupons** - Flexible discount system (flat/percentage)
- ✅ **Payment Processing** - Stripe integration with coupon support
- ✅ **Event-driven Tasks** - Background email notifications for new movies
- ✅ **Role-based Authorization** - Separate admin and user capabilities

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Backend Framework** | NestJS |
| **ORM** | TypeORM |
| **Database** | PostgreSQL (SQLite for development) |
| **Authentication** | JWT with Passport |
| **Queue/Events** | NestJS EventEmitter |
| **Email Service** | @nestjs-modules/mailer + Nodemailer |
| **Payment Gateway** | Stripe |
| **API Documentation** | Swagger (optional) |

## 📂 Project Structure

```
src/
├── app.module.ts                    # Main application module
├── common/                          # Shared utilities and guards
│   ├── enums/
│   │   └── role.enum.ts            # User roles enumeration
│   ├── interceptors/
│   │   └── success-response.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── decorators/
│   │   └── roles.decorator.ts      # Role-based decoration
│   └── guards/
│       └── roles.guard.ts          # Role-based access guard
├── users/                          # User management module
├── admins/                         # Admin management module
├── movies/                         # Movies CRUD module
├── cinemas/                        # Cinema management module
├── screens/                        # Screen management module
├── showtimes/                      # Showtime scheduling module
├── seats/                          # Seat management module
├── reservations/                   # Booking system module
├── discounts/                      # Discount and coupon module
└── payments/                       # Payment processing module
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Stripe account for payment processing

### 1. Clone Repository

```bash
git clone https://github.com/hilalahmad0101/movie-reservation-system.git
cd movie-reservation-system
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Environment Variables

Create a `.env` file with the following configuration:

```env
# Application Settings
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES=1d

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=movie_reservation

# Alternative: SQLite for Development
# DB_TYPE=sqlite
# DB_DATABASE=database.sqlite

# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email Configuration (Choose one)
# Ethereal (for testing)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user
SMTP_PASS=your_ethereal_password

# Gmail SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_gmail@gmail.com
# SMTP_PASS=your_app_password

# SendGrid
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USER=apikey
# SMTP_PASS=your_sendgrid_api_key
```

### 5. Database Setup

```bash
# Run database migrations and synchronization
npm run start:dev

# For production, disable synchronization and use migrations
npm run migration:run
```

### 6. Start the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📌 Feature Details

### 🔐 Authentication & Authorization

- **JWT-based authentication** for secure user sessions
- **Role-based access control** (Admin, User)
- **Password hashing** using bcrypt
- **Protected routes** with guards and decorators

### 🎬 Movies Management

- **CRUD operations** for movie catalog
- **Rich movie metadata** (title, description, genre, duration, rating, etc.)
- **Poster image support** with URL storage
- **Admin-only movie management**
- **Public movie browsing**

### 🏢 Cinemas & Screens

- **Multi-cinema support** for theater chains
- **Screen types** (2D, 3D, IMAX)
- **Flexible screen configuration**
- **Capacity management**

### 🕒 Showtimes

- **Flexible scheduling** system
- **Movie-screen associations**
- **Time slot management**
- **Dynamic pricing** per showtime
- **Conflict prevention**

### 💺 Seat Management

- **Seat categorization** (VIP, Regular)
- **Real-time availability** tracking
- **Seat status management** (available, booked, blocked)
- **Screen-based seat layouts**

### 📖 Reservations

- **Multi-seat booking** in single transaction
- **Automatic seat availability** checking
- **Reservation status tracking**
- **Cancellation support** with seat release
- **User booking history**

### 🎟️ Discounts & Coupons

- **Flexible discount types** (flat amount, percentage)
- **Coupon code system**
- **Expiry date management**
- **Usage limit controls**
- **Real-time validation**

### 💳 Payment Processing

- **Stripe integration** for secure payments
- **Payment Intent** workflow
- **Coupon application** at checkout
- **Automatic reservation confirmation**
- **Payment status tracking**

### 📧 Event-Driven Notifications

- **Asynchronous email notifications**
- **New movie announcements**
- **Event-driven architecture**
- **Background task processing**

## 📬 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/admin/login` | Admin login | No |
| POST | `/users/register` | User registration | No |
| POST | `/users/login` | User login | No |

### Movie Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/movies` | Get all movies | No |
| GET | `/movies/:id` | Get movie by ID | No |
| POST | `/movies` | Create new movie | Admin |
| PATCH | `/movies/:id` | Update movie | Admin |
| DELETE | `/movies/:id` | Delete movie | Admin |

### Cinema & Screen Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/cinemas` | Create cinema | Admin |
| GET | `/cinemas` | Get all cinemas | No |
| POST | `/screens` | Create screen | Admin |
| GET | `/screens` | Get all screens | No |
| GET | `/screens/:id` | Get screen by ID | No |

### Showtime Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/showtimes` | Create showtime | Admin |
| GET | `/showtimes` | Get all showtimes | No |
| GET | `/showtimes/:id` | Get showtime by ID | No |
| PATCH | `/showtimes/:id` | Update showtime | Admin |
| DELETE | `/showtimes/:id` | Delete showtime | Admin |

### Seat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/seats` | Create seats | Admin |
| GET | `/seats` | Get all seats | No |
| GET | `/seats/screen/:screenId` | Get seats by screen | No |
| PATCH | `/seats/:id/status/:status` | Update seat status | Admin |

### Reservation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/reservations` | Create reservation | User |
| GET | `/reservations` | Get all reservations | Admin |
| GET | `/reservations/user/:userId` | Get user reservations | User |
| PATCH | `/reservations/:id/cancel` | Cancel reservation | User/Admin |

### Discount Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/discounts` | Create discount | Admin |
| GET | `/discounts` | Get all discounts | Admin |
| POST | `/discounts/validate/:code` | Validate coupon | User |
| DELETE | `/discounts/:id` | Delete discount | Admin |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments` | Create payment intent | User |
| POST | `/payments/confirm/:paymentIntentId` | Confirm payment | User |

## 🧪 API Usage Examples

### Create a Movie

```json
POST /movies
{
  "title": "Inception",
  "description": "A mind-bending sci-fi thriller about dream infiltration",
  "genre": "Sci-Fi",
  "duration": 148,
  "language": "English",
  "rating": 8.8,
  "release_date": "2010-07-16",
  "poster_url": "https://image.tmdb.org/inception.jpg"
}
```

### Create a Cinema

```json
POST /cinemas
{
  "name": "Cineplex Downtown",
  "address": "123 Main Street, Downtown",
  "city": "New York",
  "phone": "+1-555-0123"
}
```

### Create a Screen

```json
POST /screens
{
  "name": "Screen 1",
  "type": "IMAX",
  "capacity": 200,
  "cinemaId": 1
}
```

### Create a Showtime

```json
POST /showtimes
{
  "movieId": 1,
  "screenId": 1,
  "start_time": "2024-03-15T19:30:00Z",
  "end_time": "2024-03-15T22:00:00Z",
  "price": 15.99
}
```

### Create Seats for a Screen

```json
POST /seats
{
  "screenId": 1,
  "seats": [
    {
      "seat_number": "A1",
      "type": "VIP",
      "row": "A",
      "column": 1
    },
    {
      "seat_number": "A2",
      "type": "Regular",
      "row": "A",
      "column": 2
    }
  ]
}
```

### Make a Reservation

```json
POST /reservations
{
  "userId": 2,
  "showtimeId": 1,
  "seatIds": [1, 2, 3]
}
```

### Create a Discount Coupon

```json
POST /discounts
{
  "code": "WELCOME50",
  "type": "percentage",
  "value": 50,
  "expires_at": "2024-12-31T23:59:59Z",
  "usage_limit": 100
}
```

### Process Payment with Coupon

```json
POST /payments
{
  "reservationId": 1,
  "payment_method": "card",
  "couponCode": "WELCOME50"
}
```

## 💳 Stripe Test Cards

For testing payment functionality, use these test card numbers:

| Card Number | Description | Expected Result |
|-------------|-------------|-----------------|
| `4242 4242 4242 4242` | Visa | Success |
| `4000 0000 0000 0002` | Generic decline | Card declined |
| `4000 0025 0000 3155` | Requires authentication | 3D Secure |
| `4000 0000 0000 9995` | Insufficient funds | Declined |

**Additional test details:**
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3-digit number (e.g., 123)
- **ZIP:** Any valid postal code

## 📧 Email Notifications

The system automatically sends email notifications for:

- **New movie releases** - Sent to all registered users
- **Booking confirmations** - Sent to users after successful payment
- **Cancellation confirmations** - Sent when reservations are cancelled

### Email Configuration Examples

#### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Postman Collection

Import the included Postman collection for comprehensive API testing:

1. Import `movie-reservation-api.postman_collection.json`
2. Set environment variables for base URL and auth tokens
3. Run the collection to test all endpoints

## 🚀 Deployment

### Production Environment Variables

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=your_very_secure_jwt_secret_key
DB_HOST=your_production_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_secure_db_password
DB_NAME=movie_reservation_prod
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
``` 

## 📊 Database Schema

### Key Entities

- **Users** - Customer accounts and authentication
- **Admins** - Administrative accounts
- **Movies** - Movie catalog with metadata
- **Cinemas** - Theater locations
- **Screens** - Individual screening rooms
- **Showtimes** - Movie scheduling
- **Seats** - Seating arrangements
- **Reservations** - Booking records
- **ReservationSeats** - Many-to-many seat assignments
- **Discounts** - Coupon and discount management
- **Payments** - Payment transaction records

### Relationships

- Cinema → Screens (One-to-Many)
- Screen → Seats (One-to-Many)
- Movie + Screen → Showtimes (Many-to-Many)
- User → Reservations (One-to-Many)
- Reservation ↔ Seats (Many-to-Many)
- Reservation → Payment (One-to-One)

## 🚀 Future Roadmap

- [ ] **Queue System** - Implement BullMQ/Redis for scalable background jobs
- [ ] **Seat Map Visualization** - Interactive seat selection with row/column display
- [ ] **Refund System** - Stripe refund handling for cancellations
- [ ] **Loyalty Program** - Points and rewards system
- [ ] **Mobile API** - Optimized endpoints for mobile applications
- [ ] **Push Notifications** - Real-time notifications for bookings
- [ ] **Analytics Dashboard** - Revenue and booking analytics
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Social Integration** - Social media sharing and login
- [ ] **Recommendation Engine** - AI-powered movie recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Update documentation for API changes
- Use conventional commit messages
- Ensure code passes ESLint checks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author & Support

**Hilal Ahmad**
- Email: hilalahmad0101@example.com
- GitHub: [@hilalahmad0101](https://github.com/hilalahmad0101)
- LinkedIn: [Hilal Ahmad](https://linkedin.com/in/hilalahmad0101)

### Support

- 📧 Email: support@moviereservation.com
- 💬 Discord: [Join our server](https://discord.gg/yourserver)
- 🐛 Issues: [GitHub Issues](https://github.com/hilalahmad0101/movie-reservation-system/issues)

---

<div align="center">

**Movie Reservation System** — Built with ❤️ using **NestJS** + **TypeORM**

⭐ Star this repo if you found it helpful!

</div>
