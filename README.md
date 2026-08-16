# PathMate

A modern full-stack application built with Spring Boot 3 and React.

## Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3**
- **Spring Data JPA**
- **PostgreSQL** (via Supabase)
- **Maven**

### Frontend
- **React 18** (Vite)
- **Tailwind CSS**
- **React Router**
- **Axios**

## Project Structure

```
pathmate/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/pathmate/backend/
│   │   │   │   ├── config/      # Configuration classes
│   │   │   │   ├── controller/  # REST controllers
│   │   │   │   ├── service/     # Business logic
│   │   │   │   ├── repository/  # Data access layer
│   │   │   │   ├── entity/      # JPA entities
│   │   │   │   ├── dto/         # Data transfer objects
│   │   │   │   └── exception/   # Exception handling
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and helpers
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles (Tailwind)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## Getting Started

### Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL database (or Supabase account)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure your database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://your-db-url:5432/pathmate
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

3. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000`.

## Environment Variables

### Backend
- `DATABASE_URL` - PostgreSQL connection URL
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password

### Frontend
- API proxy is configured in `vite.config.js` to forward `/api` requests to the backend.

## Development

- Backend runs on port **8080**
- Frontend runs on port **3000**
- Frontend API requests are proxied to the backend automatically

## License

MIT