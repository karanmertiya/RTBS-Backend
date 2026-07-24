const db = require('../db');

exports.createBooking = (req, res) => {
    const { customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, status, advance_payment } = req.body;
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(booking_date);
    selectedDate.setHours(0,0,0,0);
    if (selectedDate < today) {
        return res.status(400).json({ error: "booking_date must be greater than or equal to CURRENT_DATE" });
    }

    const query = `INSERT INTO Table_Booking (customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, status, advance_payment) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const finalStatus = status || 'Booked';
    const finalAdvancePayment = advance_payment || 0;

    db.run(query, [customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, finalStatus, finalAdvancePayment], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Booking created successfully", booking_id: this.lastID });
    });
};

exports.getAllBookings = (req, res) => {
    db.all("SELECT * FROM Table_Booking ORDER BY booking_date DESC, booking_time DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getBookingById = (req, res) => {
    db.get("SELECT * FROM Table_Booking WHERE booking_id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Booking not found" });
        res.json(row);
    });
};

exports.updateBooking = (req, res) => {
    const { customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, status, advance_payment } = req.body;
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(booking_date);
    selectedDate.setHours(0,0,0,0);
    if (selectedDate < today) {
        return res.status(400).json({ error: "booking_date must be greater than or equal to CURRENT_DATE" });
    }
    
    const query = `UPDATE Table_Booking SET customer_name=?, contact_number=?, email=?, table_number=?, number_of_guests=?, booking_date=?, booking_time=?, special_request=?, status=?, advance_payment=?, updated_at=CURRENT_TIMESTAMP 
                   WHERE booking_id=?`;

    db.run(query, [customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, status, advance_payment, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking updated successfully" });
    });
};

exports.deleteBooking = (req, res) => {
    db.run("DELETE FROM Table_Booking WHERE booking_id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted successfully" });
    });
};
