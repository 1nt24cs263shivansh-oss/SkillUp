# SkillUp

SkillUp is a focused SIH prototype for connecting students with industry opportunities. The MVP includes JWT authentication for students, institute mentors, and industry recruiters, with the student role receiving the full opportunity discovery experience.

## Tech stack

- React.js, React Router, JavaScript
- Tailwind CSS v4 with Vite
- Node.js, Express.js
- MongoDB, Mongoose
- JWT and bcryptjs

## Requirements

- Node.js 18+
- npm 9+
- A MongoDB Atlas cluster (the free tier is enough for this prototype)

The app is configured for MongoDB Atlas, so no local database installation is required.

## Installation

```bash
npm install
copy .env.example .env
```

On PowerShell, `Copy-Item .env.example .env` is equivalent.

## MongoDB Atlas setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a database user and allow your development IP under Network Access.
3. Choose **Connect → Drivers**, copy the connection string, and replace the placeholders in `.env`.
4. URL-encode special characters in the database password if needed.

The database name used by the prototype is `skillup`, included in the connection string from `.env`.

## Environment variables

`PORT` controls the API port, `MONGODB_URI` controls the database connection, `JWT_SECRET` signs auth tokens, `CLIENT_URL` is the browser origin, and `VITE_API_URL` is the client API base path.

## Seed and run

```bash
npm run seed
npm run dev
```

The client runs at `http://localhost:5173` and the API at `http://localhost:5000`. To run them separately, use `npm run server:dev` and `npm run client:dev` in two terminals.

The seed command adds ten realistic opportunities and these demo accounts:

- Student: `student@skillup.dev` / `Demo@123`
- Mentor: `mentor@skillup.dev` / `Demo@123`
- Recruiter: `recruiter@skillup.dev` / `Demo@123`

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token required)
- `PUT /api/auth/me` (Bearer token required; update student skills)
- `GET /api/jobs`
- `GET /api/jobs/:id`

`GET /api/jobs` accepts `search`, `type`, `location`, `skills`, `experienceLevel`, and `studentSkills` query parameters. When `studentSkills` is provided, each opportunity includes `matchScore` and `matchedSkills`. Matching checks the student's skills against both the company's listed skills and its description text.

## MVP status

The student job discovery flow, skill profile, matching, filters, opportunity details, auth, role redirects, logout, and module placeholders are functional. Assessment, learning materials, roadmap personalization, applications, and mentor/recruiter dashboards are intentionally left as the next implementation layer.
