CREATE TABLE Table_Booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NULL,
    table_number INT NOT NULL CHECK (table_number > 0),
    number_of_guests INT NOT NULL CHECK (number_of_guests > 0),
    booking_date DATE NOT NULL CHECK (booking_date >= CURRENT_DATE),
    booking_time TIME NOT NULL,
    special_request VARCHAR(500) NULL,
    status ENUM('Booked', 'Seated', 'Completed', 'Cancelled') DEFAULT 'Booked',
    advance_payment DECIMAL(10, 2) DEFAULT 0 CHECK (advance_payment >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
