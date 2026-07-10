# PlotTrade

PlotTrade is a full-stack real estate marketplace for browsing, filtering, and managing property listings. It supports buyer and seller accounts, protected listing workflows, Google sign-in, and image uploads for property media.

## Live Demo Link

[CLICK TO SEE THE CRAFT.](https://plottrade.vercel.app/)

## Features

- User registration, sign-in, and Google authentication
- Buyer and seller role selection with route protection
- Create, update, delete, and browse property listings
- Advanced listing search with filters for price, type, offer, parking, and furnishing
- User profile management, including avatar updates
- Responsive UI built with React, Tailwind CSS, and Swiper
- MongoDB-backed persistence with JWT cookie-based authentication

## Tech Stack

- Frontend: React 19, Vite, React Router, Redux Toolkit, Tailwind CSS, Swiper, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser, Morgan
- Authentication and media: Firebase, Cloudinary
- Package manager: pnpm

## Architecture Overview

PlotTrade uses a simple client-server architecture:

1. The React client runs in Vite and proxies API requests to the backend during development.
2. The Express server exposes REST endpoints under `/api/*` and handles authentication, users, and listings.
3. MongoDB stores user and listing documents through Mongoose models.
4. Authenticated requests rely on an HTTP-only `access_token` cookie containing a JWT.
5. Firebase handles Google authentication, while Cloudinary is used for image uploads.

## Installation Instructions

### Prerequisites

- Node.js 18 or later
- pnpm
- MongoDB connection string
- Firebase project credentials
- Cloudinary upload URL

### 1. Clone the repository

```bash
git clone https://github.com/zaidy-mughal/Plottrade.git
cd Plottrade
```

### 2. Install dependencies

Install the client and server dependencies separately:

```bash
cd client
pnpm install

cd ../server
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the `client/` directory and a `.env` file in the `server/` directory using the variable lists below.

### 4. Start the backend

```bash
cd server
pnpm dev
```

The API runs on `http://localhost:3000`.

### 5. Start the frontend

```bash
cd client
pnpm dev
```

The client runs on Vite, and API calls are proxied to the backend during development.

## Environment Variables

### Client

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_CLOUDINARY_URL=
```

### Server

```bash
DB_CONNECTION_STRING=
JWT_SECRET=
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Sign in with email, password, and role
- `POST /api/auth/google` - Sign in or register with Google
- `GET /api/auth/signout` - Clear the auth cookie and sign out

### Listings

- `POST /api/listings/create` - Create a listing for a seller account
- `DELETE /api/listings/delete/:id` - Delete a listing owned by the current seller
- `PATCH /api/listings/update/:id` - Update a listing owned by the current seller
- `GET /api/listings/me` - Fetch listings created by the current seller
- `GET /api/listings/:id` - Fetch a single listing by ID
- `GET /api/listings` - Fetch listings with search, filter, pagination, and sorting support

### Users

- `POST /api/user/update/:id` - Update the current user profile
- `DELETE /api/user/delete/:id` - Delete the current user account
- `GET /api/user/:id` - Fetch user profile details
- `PUT /api/user/update/avatar/:id` - Update the current user avatar

## Folder Structure

```text
Plottrade/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── firebaseConfig.js
│   ├── vite.config.js
│   └── package.json
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── utils/
    ├── index.js
    └── package.json
```

## Database Schema

### User

| Field | Type | Notes |
| --- | --- | --- |
| `username` | String | Required, unique |
| `email` | String | Required, unique |
| `password` | String | Required, hashed before storage |
| `avatar` | String | Optional, defaults to a placeholder image |
| `role` | String | Required, enum: `buyer` or `seller` |
| `createdAt` | Date | Added automatically by Mongoose timestamps |
| `updatedAt` | Date | Added automatically by Mongoose timestamps |

### Listing

| Field | Type | Notes |
| --- | --- | --- |
| `name` | String | Required |
| `description` | String | Required |
| `address` | String | Required |
| `regularPrice` | Number | Required |
| `discountPrice` | Number | Required |
| `bathrooms` | Number | Required |
| `bedrooms` | Number | Required |
| `furnished` | Boolean | Required |
| `parking` | Boolean | Required |
| `type` | String | Required, typically `sale` or `rent` |
| `offer` | Boolean | Required |
| `imageUrls` | Array | Required list of listing images |
| `userRef` | String | Required owner reference |
| `createdAt` | Date | Added automatically by Mongoose timestamps |
| `updatedAt` | Date | Added automatically by Mongoose timestamps |

## Future Improvements

- Add booking functionality so users can schedule property visits or reservation requests
- Add a notification system for booking updates, listing changes, and account activity

## License

No license has been specified yet. Add one if you plan to share or publish the project publicly.

## Author Information

- Author: Zaidy Mughal
- GitHub: [zaidy-mughal](https://github.com/zaidy-mughal)
