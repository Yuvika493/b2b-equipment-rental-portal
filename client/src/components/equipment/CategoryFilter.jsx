import { UI_CATEGORIES } from "../../utils/categoryMap.js";

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {UI_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={
            "category-filter__button" +
            (category === activeCategory ? " category-filter__button--active" : "")
          }
          onClick={() => onChange(category)}
          aria-pressed={category === activeCategory}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
