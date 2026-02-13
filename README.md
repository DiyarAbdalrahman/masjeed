# Masjeed Salahuddin Leicester

Monorepo for the mosque app:
- `backend/` Express API + Postgres + Prisma
- `admin/` React (Vite) admin panel

## Quick start (local)

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

## Deployment (VPS)
- Use Nginx as reverse proxy to the Express app
- Run the backend with PM2 or systemd
- Use managed Postgres or install Postgres on the VPS

## Notes
- Donations are designed for Stripe Checkout with payouts to the mosque bank account
- Prayer times support manual overrides and CSV upload
