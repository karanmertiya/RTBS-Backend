const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database Connection Failed:', err.message);
    } else {
        console.log('Connected to SQLite Database');
        
        db.run('DROP TABLE IF EXISTS Table_Booking', (err) => {
            if (err) console.error("Error dropping table", err);
            
            db.run(`
                CREATE TABLE Table_Booking (
                    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    customer_name VARCHAR(255) NOT NULL,
                    contact_number VARCHAR(20) NOT NULL,
                    email VARCHAR(255),
                    table_number INT NOT NULL CHECK (table_number > 0),
                    number_of_guests INT NOT NULL CHECK (number_of_guests > 0),
                    booking_date DATE NOT NULL,
                    booking_time TIME NOT NULL,
                    special_request VARCHAR(500),
                    status VARCHAR(20) DEFAULT 'Booked' CHECK (status IN ('Booked', 'Seated', 'Completed', 'Cancelled')),
                    advance_payment DECIMAL(10, 2) DEFAULT 0 CHECK (advance_payment >= 0),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `, (err) => {
                if (err) {
                    console.error("Error creating table", err);
                } else {
                    console.log("Table_Booking schema is ready");
                }
            });
        });
    }
});

module.exports = db;