import { formatDate } from "../../utils/dateUtils.js";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed"];

function statusBadgeClass(status) {
  if (status === "Confirmed") return "badge badge--confirmed";
  if (status === "Completed") return "badge badge--completed";
  return "badge badge--pending";
}

export default function BookingTable({ bookings, onStatusChange, updatingId }) {
  return (
    <div className="table-wrap">
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Contact</th>
            <th>Equipment</th>
            <th>Date Range</th>
            <th>Total Days</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="booking-table__id">{booking._id.slice(-8)}</td>
              <td>{booking.customerName}</td>
              <td>{booking.contact}</td>
              <td>{booking.equipment?.name || "Equipment unavailable"}</td>
              <td>
                {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
              </td>
              <td>{booking.totalDays}</td>
              <td className="booking-table__cost">₹{booking.totalCost.toLocaleString("en-IN")}</td>
              <td>
                <select
                  className="status-select"
                  value={booking.status}
                  disabled={updatingId === booking._id}
                  onChange={(e) => onStatusChange(booking._id, e.target.value)}
                  aria-label={`Update status for booking ${booking._id.slice(-8)}`}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
