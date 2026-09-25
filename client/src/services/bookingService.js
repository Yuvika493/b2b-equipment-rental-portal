import api from "./api";

// POST /api/bookings
// The backend Booking model only stores `customerName` and a single
// `contact` string field (confirmed by inspecting the deployed
// controller) — it has no separate email/phone/companyName fields.
// The booking form collects those separately for a better UX and for
// validation, but they are combined into `contact` before sending,
// since the backend schema was not modified. See buildContactString
// in components/booking/BookingForm.jsx.
export const createBooking = async ({ customerName, contact, equipmentId, startDate, endDate }) => {
  const response = await api.post("/api/bookings", {
    customerName,
    contact,
    equipmentId,
    startDate,
    endDate,
  });
  return response.data;
};

// GET /api/bookings
export const getAllBookings = async () => {
  const response = await api.get("/api/bookings");
  return response.data;
};

// PATCH /api/bookings/:id/status
export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/api/bookings/${id}/status`, { status });
  return response.data;
};
