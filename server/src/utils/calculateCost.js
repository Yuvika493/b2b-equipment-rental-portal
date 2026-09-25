/**
 * Calculates total rental days and total cost.
 * Backend is the source of truth for this calculation — it is always
 * re-run server-side on booking creation, regardless of any value
 * the client may send.
 *
 * Rule: minimum billable duration is 1 day. A booking spanning less
 * than 24 hours still counts as 1 day. Partial days are rounded up.
 *
 * @param {Date|string} startDate
 * @param {Date|string} endDate
 * @param {number} dailyRate
 * @returns {{ totalDays: number, totalCost: number }}
 */
function calculateCost(startDate, endDate, dailyRate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid start or end date");
  }

  if (end < start) {
    throw new Error("End date must be on or after start date");
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.max(1, Math.ceil(diffMs / MS_PER_DAY));

  const totalCost = totalDays * dailyRate;

  return { totalDays, totalCost };
}

module.exports = calculateCost;
