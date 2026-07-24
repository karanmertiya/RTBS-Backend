CREATE DATABASE IF NOT EXISTS restaurant_booking;

USE restaurant_booking;

CREATE TABLE IF NOT EXISTS Table_Booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    table_number INT NOT NULL,
    number_of_guests INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    special_request VARCHAR(500),
    status ENUM('Booked', 'Seated', 'Completed', 'Cancelled') DEFAULT 'Booked',
    advance_payment DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
