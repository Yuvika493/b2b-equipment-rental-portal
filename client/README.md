# Equipment Rental Portal — Frontend

React + Vite frontend for the B2B Equipment Rental Portal. Consumes the
existing backend at `VITE_API_URL` (default `http://localhost:5000`).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. Make sure the backend is running (and
connected to MongoDB Atlas) before loading the pages, since equipment
and bookings are fetched live — nothing is hardcoded.

## Configuration

`.env` already contains:

```
VITE_API_URL=http://localhost:5000
```

Change this if the backend runs on a different host/port.

## Important assumptions (read before demoing)

1. **Contact fields.** The backend's `Booking` model only has
   `customerName` and a single `contact` string — no separate
   email/phone/companyName. The booking form still collects Full Name,
   Email, Phone, and optional Company Name separately (for validation
   and UX), then combines Email + Phone + Company into one `contact`
   string before sending, e.g.:
   `"Email: jane@acme.com | Phone: 9876543210 | Company: Acme Co"`.
   The admin table displays this combined string as-is in the Contact
   column. The backend was not modified.

2. **Category filters.** The spec's required UI filters (`Heavy
   Machinery`, `Power Tools`, `Compaction`, `Power & Electrical`) don't
   match the actual seeded category values (`Excavators`, `Loaders`,
   `Aerial Lifts`, `Compaction Equipment`), and the backend's category
   filter does an exact string match rather than grouping. So: the
   frontend fetches the full equipment list once and filters by group
   client-side. The mapping lives in `src/utils/categoryMap.js` and is
   fully documented there — adjust it if the grouping should be
   different. Selecting "Power Tools" currently shows the empty state,
   since no seeded equipment falls into that group.

3. **Rental cost formula.** `src/utils/costCalculator.js` mirrors the
   backend's calculation exactly (minimum 1 billable day, partial days
   round up) so the live estimate matches what gets saved. The backend
   still recalculates and saves its own totals independently — the
   frontend number is display-only.

No authentication, payments, or extra pages were added, per spec.
