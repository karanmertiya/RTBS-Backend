const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database Connection Failed:', err.message);
    } else {
        console.log('Connected to SQLite Database');
        
        // Auto-create the table if it doesn't exist yet
        db.run(`
            CREATE TABLE IF NOT EXISTS Table_Booking (
                booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name VARCHAR(100) NOT NULL,
                contact_number VARCHAR(15) NOT NULL,
                email VARCHAR(100),
                table_number INT NOT NULL,
                number_of_guests INT NOT NULL,
                booking_date DATE NOT NULL,
                booking_time TIME NOT NULL,
                special_request TEXT
            );
        `, (err) => {
            if (err) {
                console.error("Error creating table", err);
            } else {
                console.log("Table_Booking is ready");
            }
        });
    }
});

module.exports = db;