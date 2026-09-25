import { useMemo, useState } from "react";
import { calculateEstimatedCost } from "../../utils/costCalculator.js";
import { todayISODate } from "../../utils/dateUtils.js";
import { createBooking } from "../../services/bookingService.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  startDate: "",
  endDate: "",
};

/**
 * The backend Booking model only stores a single `customerName` and a
 * single `contact` string (no separate email/phone/companyName fields),
 * and the backend was not modified to add them. This combines the three
 * contact-related fields into one readable string that is sent as
 * `contact`, so nothing the customer enters is silently dropped.
 */
function buildContactString({ email, phone, companyName }) {
  let contact = `Email: ${email} | Phone: ${phone}`;
  if (companyName.trim()) {
    contact += ` | Company: ${companyName.trim()}`;
  }
  return contact;
}

export default function BookingForm({ equipment }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }

  const estimate = useMemo(
    () => calculateEstimatedCost(form.startDate, form.endDate, equipment.dailyRate),
    [form.startDate, form.endDate, equipment.dailyRate]
  );

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.startDate) next.startDate = "Start date is required.";
    if (!form.endDate) next.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      next.endDate = "End date cannot be before start date.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBanner(null);

    if (!equipment.availability) {
      setBanner({ type: "error", message: "This equipment is currently unavailable and cannot be booked." });
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    try {
      await createBooking({
        customerName: form.fullName.trim(),
        contact: buildContactString(form),
        equipmentId: equipment._id,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      setBanner({
        type: "success",
        message: "Booking request submitted. Your reservation has been recorded.",
      });
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong while submitting your booking. Please try again.";
      setBanner({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-panel">
      <h2 className="booking-panel__title">Book this equipment</h2>
      <p className="booking-panel__subtitle">Fill in your details to reserve it for your dates.</p>

      {!equipment.availability && (
        <div className="form-banner form-banner--unavailable">
          This equipment is currently unavailable for booking.
        </div>
      )}

      {banner && (
        <div className={`form-banner form-banner--${banner.type}`}>{banner.message}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="form-field__label" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={"form-field__input" + (errors.fullName ? " form-field__input--error" : "")}
            value={form.fullName}
            onChange={handleChange("fullName")}
          />
          {errors.fullName && <p className="form-field__error">{errors.fullName}</p>}
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={"form-field__input" + (errors.email ? " form-field__input--error" : "")}
            value={form.email}
            onChange={handleChange("email")}
          />
          {errors.email && <p className="form-field__error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={"form-field__input" + (errors.phone ? " form-field__input--error" : "")}
            value={form.phone}
            onChange={handleChange("phone")}
          />
          {errors.phone && <p className="form-field__error">{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="companyName">
            Company Name <span className="form-field__optional">(optional)</span>
          </label>
          <input
            id="companyName"
            type="text"
            className="form-field__input"
            value={form.companyName}
            onChange={handleChange("companyName")}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-field__label" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              min={todayISODate()}
              className={"form-field__input" + (errors.startDate ? " form-field__input--error" : "")}
              value={form.startDate}
              onChange={handleChange("startDate")}
            />
            {errors.startDate && <p className="form-field__error">{errors.startDate}</p>}
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="endDate">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              min={form.startDate || todayISODate()}
              className={"form-field__input" + (errors.endDate ? " form-field__input--error" : "")}
              value={form.endDate}
              onChange={handleChange("endDate")}
            />
            {errors.endDate && <p className="form-field__error">{errors.endDate}</p>}
          </div>
        </div>

        <div className="cost-summary">
          {estimate ? (
            <>
              <div className="cost-summary__row">
                <span>Rental days</span>
                <span>{estimate.totalDays}</span>
              </div>
              <div className="cost-summary__row">
                <span>Daily rate</span>
                <span>₹{equipment.dailyRate.toLocaleString("en-IN")}</span>
              </div>
              <div className="cost-summary__row cost-summary__total">
                <span>Estimated total</span>
                <span>₹{estimate.totalCost.toLocaleString("en-IN")}</span>
              </div>
            </>
          ) : (
            <p className="cost-summary__placeholder">
              Select a start and end date to see the estimated cost.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={submitting || !equipment.availability}
        >
          {submitting ? "Submitting…" : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
}
