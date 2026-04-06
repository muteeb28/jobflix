
## How to run

### Backend
```bash
cd backend
cp .env.example .env   # fill in values
npm install
npx prisma generate    # generate Prisma client
npm run dev            # runs on localhost:5000
```

### Frontend
```bash
cd ..                  # project root
npm run dev            # runs on localhost:3001
# All API calls route to localhost:5000 via NEXT_PUBLIC_API_URL
```

## Folder Structure
```
backend/
  src/
    config/          ← Prisma DB connection
    controllers/     ← one file per domain — request/response logic
    middlewares/     ← asyncHandler, error handler
    routes/          ← one file per domain — Express Router
    services/        ← core business logic
      scrapers/      ← LinkedIn scraper (moved from Next.js)
    utils/           ← AppError, fallback data
    data/            ← static data (mock problems, Java lessons, company insights)
  index.js           ← entry point (Express app + DB connect)
  package.json
  .env.example
```

## Environment Variables
| Variable | Purpose |
|---|---|
| `PORT` | Express server port (default 5000) |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `API_KEY` | Google Gemini API key |
| `RAPIDAPI_KEY` / `LINKEDIN_API_KEY` | LinkedIn company lookup |
| `PROBLEM_SERVICE_URL` | Optional external problem microservice |
| `SUBMISSION_SERVICE_URL` | Optional external submission microservice |

## API Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/api/active-users` | Total user count from DB |
| POST | `/api/apply` | Submit quick apply form |
| POST | `/api/ask` | AI mentor (Gemini) |
| GET | `/api/company?domain=...` | LinkedIn company lookup |
| GET | `/api/courses` | All active courses |
| GET | `/api/courses/:slug` | Single course with modules |
| GET | `/api/courses/java/lessons/:slug` | Java lesson content |
| GET | `/api/hackathons` | Gemini-powered hackathon list |
| GET | `/api/jobs` | LinkedIn scraped jobs |
| POST | `/api/jobs` | Same as GET (refresh) |
| GET | `/api/lessons/:lessonId` | Single lesson from DB |
| GET | `/api/prepare` | Prepare page static data |
| GET | `/api/problems` | Problems list (mock or external) |
| GET | `/api/problems/:id` | Single problem |
| GET | `/api/progress` | User progress from DB |
| POST | `/api/progress` | Mark topic complete + award XP |
| GET | `/api/scholarships` | Gemini-powered scholarship list |
| POST | `/api/submissions` | Submit code (mock or external) |
| GET | `/api/submissions/:id` | Submission status |

## Deployment
- **Backend** → Railway or Render (`npm start`)
- **Frontend** → Vercel (`npm run build`)
- Set `NEXT_PUBLIC_API_URL` in Vercel to the deployed backend URL
- Set `FRONTEND_URL` in backend env to the Vercel frontend URL
