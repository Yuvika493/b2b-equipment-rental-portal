/**
 * ASSUMPTION / DESIGN DECISION:
 * The project spec requires these UI category filters:
 *   All, Heavy Machinery, Power Tools, Compaction, Power & Electrical
 *
 * The backend has already been seeded with these actual category values:
 *   Excavators, Loaders, Aerial Lifts, Compaction Equipment
 *
 * These don't match 1:1, and the backend's category filter does an exact
 * string match (it can't group several categories under one label), so
 * this mapping is applied client-side after fetching the full equipment
 * list. No backend data or backend code was changed.
 *
 * Mapping logic (reviewable — adjust here if it should be different):
 *   - Heavy Machinery    -> Excavators, Loaders        (large earthmoving equipment)
 *   - Compaction          -> Compaction Equipment        (direct match)
 *   - Power & Electrical  -> Aerial Lifts                (electric-powered platform lift)
 *   - Power Tools          -> (no seeded equipment currently falls in this
 *                              group; selecting it correctly shows the
 *                              empty-state rather than fabricating data)
 */
export const UI_CATEGORIES = [
  "All",
  "Heavy Machinery",
  "Power Tools",
  "Compaction",
  "Power & Electrical",
];

const CATEGORY_GROUP_MAP = {
  "Heavy Machinery": ["Excavators", "Loaders"],
  "Power Tools": [],
  "Compaction": ["Compaction Equipment"],
  "Power & Electrical": ["Aerial Lifts"],
};

/** Returns true if an equipment item's backend category belongs to the given UI group. */
export function matchesUICategory(equipmentCategory, uiCategory) {
  if (uiCategory === "All") return true;
  const backendCategories = CATEGORY_GROUP_MAP[uiCategory] || [];
  return backendCategories.includes(equipmentCategory);
}
