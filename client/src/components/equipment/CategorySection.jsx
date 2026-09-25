const CATEGORIES = [
  {
    name: "Heavy Machinery",
    description: "Excavators and loaders for earthmoving and site work.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h4l2-5h5l3 5h4" />
        <path d="M9 12V7a1 1 0 0 1 1-1h3l3 3v3" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </svg>
    ),
  },
  {
    name: "Power Tools",
    description: "Handheld and cordless tools for on-site tasks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 6l4 4-8.5 8.5a2.1 2.1 0 0 1-3-3L15 2" />
        <path d="M13 5l2-2 4 4-2 2" />
      </svg>
    ),
  },
  {
    name: "Compaction",
    description: "Plate compactors and rollers for soil and asphalt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="15" r="4" />
        <path d="M11 15h6a4 4 0 0 0 4-4V9" />
        <path d="M3 20h9" />
      </svg>
    ),
  },
  {
    name: "Power & Electrical",
    description: "Aerial lifts and electric-powered equipment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    ),
  },
];

export default function CategorySection({ onExplore }) {
  return (
    <section id="categories" className="category-section">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Equipment for Every Job</h2>
          <p className="section-heading__subtitle">
            From heavy machinery to power tools, find the equipment your project needs.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              type="button"
              className="category-card"
              onClick={() => onExplore(category.name)}
            >
              <span className="category-card__icon">{category.icon}</span>
              <h3 className="category-card__title">{category.name}</h3>
              <p className="category-card__description">{category.description}</p>
              <span className="category-card__action">Explore {category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
