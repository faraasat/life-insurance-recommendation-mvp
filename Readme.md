# Life Insurance Recommendation MVP

A full-stack monorepo MVP that collects basic profile information from users and recommends a suitable life insurance plan using simple business rules

---

## Project Structure

```bash
life-insurance-recommendation-mvp/
├── apps/
│   ├── backend/       # NestJS backend (API + PostgreSQL + Prisma)
|       |-- .env       # contains DATABASE_URL for migrations
│   ├── frontend/      # Next.js frontend (web app using shadcn/ui)
│   └── app/           # React Native app (Expo)
├── packages/          # Shared packages (e.g. config, types, UI components)
├── .env               # Root-level env for shared settings
├── turbo.json         # Turborepo config
├── package.json       # Yarn workspaces root config
└── README.md
```

---

## Web and Mobile UI

![Web](/assets/web.gif)

<br />

![Mobile](/assets/mobile.gif)

---

## Tech Stack

- **Monorepo Tooling:** Yarn Workspaces + Turborepo
- **Backend:** NestJS + Prisma + PostgreSQL
- **Frontend (Web):** Next.js 15 App Router + TypeScript + Tailwind + Shadcn/ui
- **Mobile App:** Expo + React Native + React Hook Form + React Native Paper + NativeWind
- **DevOps Ready:** Docker & AWS-ready structure
- **Infra:** Environment variables shared via `.env`

---

## Environment Setup

### 1. Prerequisites

Ensure you have the following installed:

- Node.js `>=20.x`
- Yarn `>=4.x`
- Docker (only if you wand to run in docker)

---

### 2. Clone & Install

```bash
git clone https://github.com/faraasat/life-insurance-recommendation-mvp.git
cd life-insurance-recommendation-mvp
yarn install
```

---

### 3. Environment Variables

#### Root `.env`

```env
DATABASE_URL=postgresql://user:password@localhost:5432/life_insurance
EXPO_PUBLIC_BACKEND_URL=http://localhost:5858/
NEXT_PUBLIC_BACKEND_URL=<tunnel or deployed url>
```

Replace `<your-local-ip>` with your actual IP address (e.g., `192.168.1.12`).
PORT is `5858`.

---

### 4. Migrate DB

Navigate to `apps/backend`:

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init
```

---

## Running the Project

In the root of the monorepo:

```bash
yarn start:dev
```

This command runs both the backend and frontend.

To run only the mobile app (React Native with Expo):

```bash
yarn start:app
```

After the metro runs, if you want to open in android emulator, press a else scan the qr code with expo go app.

---

## API Endpoint

**POST** `/recommendation`

Request body:

```json
{
  "age": 30,
  "income": 60000,
  "dependents": 2,
  "riskTolerance": "HIGH"
}
```

Response:

```json
{
  "recommendation": "Term Life – $500,000 for 20 years",
  "explanation": "Provides high coverage for younger, higher-risk individuals."
}
```
