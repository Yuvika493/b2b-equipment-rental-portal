import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eceef0"/><text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="%238a94a3" text-anchor="middle">Image unavailable</text></svg>'
  );

export default function EquipmentCard({ equipment }) {
  const { _id, name, category, image, dailyRate, availability } = equipment;

  return (
    <article className="equipment-card">
      <div className="equipment-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="equipment-card__image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>
      <div className="equipment-card__body">
        <span className="equipment-card__category">{category}</span>
        <h3 className="equipment-card__name">{name}</h3>

        <span className={"badge " + (availability ? "badge--available" : "badge--unavailable")}>
          {availability ? "Available" : "Unavailable"}
        </span>

        <div className="equipment-card__meta">
          <span className="equipment-card__rate">
            ₹{dailyRate.toLocaleString("en-IN")}
            <span className="equipment-card__rate-unit"> / day</span>
          </span>
        </div>

        <Link to={`/equipment/${_id}`} className="equipment-card__button">
          View Details &amp; Rent
        </Link>
      </div>
    </article>
  );
}
