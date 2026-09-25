const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Mirrors the backend's calculateCost.js formula exactly:
 * minimum 1 billable day, partial days round up. This is used ONLY for
 * the live on-screen estimate — the backend independently recalculates
 * and saves its own totals on POST /api/bookings, and is the authority
 * on the final booking amount.
 *
 * @returns {{ totalDays: number, totalCost: number } | null} null when
 * inputs are incomplete or invalid (so the UI can hide the estimate).
 */
export function calculateEstimatedCost(startDate, endDate, dailyRate) {
  if (!startDate || !endDate || !dailyRate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
  if (end < start) return null;

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.max(1, Math.ceil(diffMs / MS_PER_DAY));
  const totalCost = totalDays * dailyRate;

  return { totalDays, totalCost };
}
