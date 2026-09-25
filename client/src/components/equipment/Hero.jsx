// Background photo is a verified, real Unsplash asset (confirmed by fetching
// the source page before use): "An excavator scoops dirt at a construction
// site" by John Kakuk. https://unsplash.com/photos/Ky_VrUeMApE
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1751054770504-c69daeec4721?fm=jpg&q=80&w=2400&auto=format&fit=crop";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1 className="hero__heading">The Right Equipment. Ready When You Need It.</h1>
        <p className="hero__description">
          Reliable equipment rentals for construction, infrastructure, maintenance and
          industrial projects.
        </p>
        <div className="hero__actions">
          <a href="#equipment" className="button button--primary">
            Browse Equipment
          </a>
          <a href="#categories" className="button button--outline">
            Explore Categories
          </a>
        </div>
      </div>
    </section>
  );
}
