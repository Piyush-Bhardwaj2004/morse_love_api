# Morse Review API

A REST API service for managing reviews for the Morse code pendant product. Built with Express.js and MongoDB.

## Features

- GET all reviews sorted by date
- POST new reviews with validation
- MongoDB integration for data persistence
- CORS support for cross-origin requests
- Environment-based configuration

## Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/morse_review_api.git
cd morse_review_api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and database name

## Configuration

Update the `.env` file with:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `MONGODB_DB`: Database name (default: morsecode)

## API Endpoints

### Get All Reviews
```
GET /api/reviews
```
Returns all reviews sorted by date (newest first).

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "rating": 5,
    "review": "Great product!",
    "date": "2024-01-15T10:30:00.000Z",
    "status": "pending"
  }
]
```

### Create New Review
```
POST /api/reviews
Content-Type: application/json

{
  "name": "Jane Smith",
  "rating": 4,
  "review": "Very satisfied with my purchase"
}
```

**Response (201 Created):**
```json
{
  "_id": "...",
  "name": "Jane Smith",
  "rating": 4,
  "review": "Very satisfied with my purchase",
  "date": "2024-01-15T11:00:00.000Z",
  "status": "pending"
}
```

**Validation:**
- `name`, `rating`, and `review` are required
- `rating` must be a number between 1 and 5
- All fields will be trimmed of whitespace

## Running the Server

### Development
```bash
npm run dev
```
(Requires nodemon to be installed)

### Production
```bash
npm start
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Successful GET request
- `201` - Successfully created review
- `400` - Bad request (validation error)
- `500` - Server error

## License

MIT
