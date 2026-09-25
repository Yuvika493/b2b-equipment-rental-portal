import { useEffect, useMemo, useState } from "react";
import Hero from "../components/equipment/Hero.jsx";
import TrustStats from "../components/equipment/TrustStats.jsx";
import CategorySection from "../components/equipment/CategorySection.jsx";
import HowItWorks from "../components/equipment/HowItWorks.jsx";
import CtaBanner from "../components/equipment/CtaBanner.jsx";
import SearchBar from "../components/equipment/SearchBar.jsx";
import CategoryFilter from "../components/equipment/CategoryFilter.jsx";
import EquipmentCard from "../components/equipment/EquipmentCard.jsx";
import { getAllEquipment } from "../services/equipmentService.js";
import { matchesUICategory } from "../utils/categoryMap.js";

export default function LandingPage() {
  // Unchanged from the previous implementation: still fetches from the
  // real GET /api/equipment endpoint, still filters client-side by
  // search term and mapped category. Nothing here was touched beyond
  // what the redesign needed.
  const [equipment, setEquipment] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'error'
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;

    getAllEquipment()
      .then((data) => {
        if (cancelled) return;
        setEquipment(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEquipment = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return equipment.filter((item) => {
      const matchesSearch = !term || item.name.toLowerCase().includes(term);
      const matchesCategory = matchesUICategory(item.category, activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [equipment, searchTerm, activeCategory]);

  // Category cards in the new "Equipment for Every Job" section hook into
  // the exact same filtering state the search/filter controls use, then
  // scroll down to the results — no separate filtering logic introduced.
  const handleExploreCategory = (category) => {
    setActiveCategory(category);
    document.getElementById("equipment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero />
      <TrustStats />
      <CategorySection onExplore={handleExploreCategory} />

      <section id="equipment" className="equipment-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Featured Equipment</h2>
          </div>

          <div className="equipment-controls">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          {status === "loading" && (
            <div className="state-panel">
              <p className="state-panel__title">Loading equipment…</p>
              <p className="state-panel__body">Fetching the latest catalog from the server.</p>
            </div>
          )}

          {status === "error" && (
            <div className="state-panel state-panel--error">
              <p className="state-panel__title">Couldn't load equipment</p>
              <p className="state-panel__body">
                There was a problem reaching the server. Confirm the backend is running at the
                configured API URL, then refresh the page.
              </p>
            </div>
          )}

          {status === "ready" && filteredEquipment.length === 0 && (
            <div className="state-panel">
              <p className="state-panel__title">No equipment found</p>
              <p className="state-panel__body">
                Try a different search term or select a different category.
              </p>
            </div>
          )}

          {status === "ready" && filteredEquipment.length > 0 && (
            <div className="equipment-grid">
              {filteredEquipment.map((item) => (
                <EquipmentCard key={item._id} equipment={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
      <CtaBanner />
    </>
  );
}
