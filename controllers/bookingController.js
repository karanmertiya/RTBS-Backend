const db = require('../db');

// CREATE Booking
exports.createBooking = (req, res) => {
    const { customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request } = req.body;
    const query = `INSERT INTO Table_Booking (customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Booking created successfully", booking_id: this.lastID });
    });
};

// READ All Bookings
exports.getAllBookings = (req, res) => {
    db.all("SELECT * FROM Table_Booking ORDER BY booking_date DESC, booking_time DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// READ Single Booking
exports.getBookingById = (req, res) => {
    db.get("SELECT * FROM Table_Booking WHERE booking_id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Booking not found" });
        res.json(row);
    });
};

// UPDATE Booking
exports.updateBooking = (req, res) => {
    const { customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request } = req.body;
    const query = `UPDATE Table_Booking SET customer_name=?, contact_number=?, email=?, table_number=?, number_of_guests=?, booking_date=?, booking_time=?, special_request=? 
                   WHERE booking_id=?`;

    db.run(query, [customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking updated successfully" });
    });
};

// DELETE Booking
exports.deleteBooking = (req, res) => {
    db.run("DELETE FROM Table_Booking WHERE booking_id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted successfully" });
    });
};
