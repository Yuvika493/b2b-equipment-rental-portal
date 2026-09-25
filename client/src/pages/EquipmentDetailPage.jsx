import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEquipmentById } from "../services/equipmentService.js";
import BookingForm from "../components/booking/BookingForm.jsx";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eceef0"/><text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="%238a94a3" text-anchor="middle">Image unavailable</text></svg>'
  );

export default function EquipmentDetailPage() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'not-found' | 'error'

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    getEquipmentById(id)
      .then((data) => {
        if (cancelled) return;
        setEquipment(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 404 || err.response?.status === 400) {
          setStatus("not-found");
        } else {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container detail-page">
        <div className="state-panel">
          <p className="state-panel__title">Loading equipment…</p>
        </div>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="container detail-page">
        <div className="state-panel state-panel--error">
          <p className="state-panel__title">Equipment not found</p>
          <p className="state-panel__body">
            This equipment may have been removed. <Link to="/">Return to the catalog</Link>.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container detail-page">
        <div className="state-panel state-panel--error">
          <p className="state-panel__title">Couldn't load this equipment</p>
          <p className="state-panel__body">
            There was a problem reaching the server. <Link to="/">Return to the catalog</Link>.
          </p>
        </div>
      </div>
    );
  }

  const {
    name,
    category,
    image,
    dailyRate,
    availability,
    description,
    safetyInstructions,
    operationalInstructions,
    specifications,
  } = equipment;

  return (
    <div className="container detail-page">
      <Link to="/" className="detail-back">
        ← Back to catalog
      </Link>

      <div className="detail-grid">
        <div>
          <div className="detail-image-wrap">
            <img
              src={image}
              alt={name}
              className="detail-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>

          <div className="detail-heading-row">
            <h1 className="detail-name">{name}</h1>
            <span className={"badge " + (availability ? "badge--available" : "badge--unavailable")}>
              {availability ? "Available" : "Unavailable"}
            </span>
          </div>
          <p className="detail-category">{category}</p>
          <p className="detail-rate">
            ₹{dailyRate.toLocaleString("en-IN")} <span style={{ fontWeight: 400 }}>/ day</span>
          </p>

          <div className="detail-block">
            <h2 className="detail-block__title">Description</h2>
            <p className="detail-block__text">{description}</p>
          </div>

          <div className="detail-block">
            <h2 className="detail-block__title">Safety Instructions</h2>
            <p className="detail-block__text">{safetyInstructions}</p>
          </div>

          <div className="detail-block">
            <h2 className="detail-block__title">Operational Instructions</h2>
            <p className="detail-block__text">{operationalInstructions}</p>
          </div>

          {specifications && specifications.length > 0 && (
            <div className="detail-block">
              <h2 className="detail-block__title">Technical Specifications</h2>
              <div className="spec-list">
                {specifications.map((spec, index) => (
                  <div className="spec-list__row" key={index}>
                    <span className="spec-list__label">{spec.label}</span>
                    <span className="spec-list__value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <BookingForm equipment={equipment} />
      </div>
    </div>
  );
}
