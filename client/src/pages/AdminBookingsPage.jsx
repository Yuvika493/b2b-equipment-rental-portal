import { useEffect, useState } from "react";
import BookingTable from "../components/booking/BookingTable.jsx";
import { getAllBookings, updateBookingStatus } from "../services/bookingService.js";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading' | 'ready' | 'error'
  const [updatingId, setUpdatingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const loadBookings = () => {
    setStatus("loading");
    getAllBookings()
      .then((data) => {
        setBookings(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    setActionError(null);
    setUpdatingId(bookingId);
    try {
      const updated = await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((booking) => (booking._id === bookingId ? updated : booking))
      );
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Failed to update booking status. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container admin-page">
      <div className="admin-header">
        <h1 className="admin-header__title">Admin Bookings</h1>
        {status === "ready" && (
          <span className="admin-header__count">
            {bookings.length} booking{bookings.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {actionError && <div className="form-banner form-banner--error">{actionError}</div>}

      {status === "loading" && (
        <div className="state-panel">
          <p className="state-panel__title">Loading bookings…</p>
        </div>
      )}

      {status === "error" && (
        <div className="state-panel state-panel--error">
          <p className="state-panel__title">Couldn't load bookings</p>
          <p className="state-panel__body">
            There was a problem reaching the server. Confirm the backend is running, then
            refresh the page.
          </p>
        </div>
      )}

      {status === "ready" && bookings.length === 0 && (
        <div className="state-panel">
          <p className="state-panel__title">No bookings yet</p>
          <p className="state-panel__body">
            Bookings submitted from the equipment detail page will appear here.
          </p>
        </div>
      )}

      {status === "ready" && bookings.length > 0 && (
        <BookingTable bookings={bookings} onStatusChange={handleStatusChange} updatingId={updatingId} />
      )}
    </div>
  );
}
