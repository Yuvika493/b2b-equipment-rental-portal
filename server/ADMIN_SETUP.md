# Admin Dashboard Setup

1. Copy `.env.example` to `.env` in this server folder.
2. Keep your existing `MONGO_URI` and `PORT=5000` values.
3. Add:
   - `ADMIN_EMAIL=your-admin-email`
   - `ADMIN_PASSWORD=your-admin-password`
   - `JWT_SECRET=your-long-random-secret`
4. Run `npm install`.
5. Run `npm run dev`.

The admin API is protected with JWT authentication. The dashboard endpoint is `/api/admin/dashboard` and booking list/status endpoints require an admin token.
