const db = require("../db");

// 1. Create a new booking (POST)
exports.createBooking = (req, res) => {
    const {
        customer_name, contact_number, email, table_number,
        number_of_guests, booking_date, booking_time, special_request,
        status, advance_payment
    } = req.body;

    // Basic validation
    if (!customer_name || !contact_number || !table_number || !number_of_guests || !booking_date || !booking_time) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    const query = `
        INSERT INTO Table_Booking 
        (customer_name, contact_number, email, table_number, number_of_guests, booking_date, booking_time, special_request, status, advance_payment) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        customer_name, contact_number, email || null, table_number, 
        number_of_guests, booking_date, booking_time, special_request || null, 
        status || 'Booked', advance_payment || 0
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to create booking" });
        }
        res.status(201).json({ message: "Booking created successfully", booking_id: result.insertId });
    });
};

// 2. Get all bookings (GET)
exports.getAllBookings = (req, res) => {
    const query = "SELECT * FROM Table_Booking ORDER BY booking_date DESC, booking_time DESC";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch bookings" });
        }
        res.json(results);
    });
};

// 3. Get booking by ID (GET)
exports.getBookingById = (req, res) => {
    const bookingId = req.params.id;
    const query = "SELECT * FROM Table_Booking WHERE booking_id = ?";
    
    db.query(query, [bookingId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch booking" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(results[0]);
    });
};

// 4. Update booking (PUT)
exports.updateBooking = (req, res) => {
    const bookingId = req.params.id;
    const {
        customer_name, contact_number, email, table_number,
        number_of_guests, booking_date, booking_time, special_request,
        status, advance_payment
    } = req.body;

    const query = `
        UPDATE Table_Booking SET 
        customer_name = ?, contact_number = ?, email = ?, table_number = ?, 
        number_of_guests = ?, booking_date = ?, booking_time = ?, 
        special_request = ?, status = ?, advance_payment = ? 
        WHERE booking_id = ?
    `;

    const values = [
        customer_name, contact_number, email, table_number, 
        number_of_guests, booking_date, booking_time, special_request, 
        status, advance_payment, bookingId
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update booking" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json({ message: "Booking updated successfully" });
    });
};

// 5. Delete booking (DELETE)
exports.deleteBooking = (req, res) => {
    const bookingId = req.params.id;
    const query = "DELETE FROM Table_Booking WHERE booking_id = ?";
    
    db.query(query, [bookingId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to delete booking" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json({ message: "Booking deleted successfully" });
    });
};
