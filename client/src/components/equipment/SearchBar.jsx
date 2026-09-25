export default function SearchBar({ value, onChange }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search equipment by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search equipment by name"
      />
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
}
