/**
 * Formats an ISO date string / Date into a short, readable form,
 * e.g. "1 Oct 2026". Used across equipment cards, booking forms,
 * and the admin table so date display stays consistent.
 */
export function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Today's date as a yyyy-mm-dd string, for setting <input type="date"> min bounds. */
export function todayISODate() {
  return new Date().toISOString().split("T")[0];
}
