const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'P@SSW0RD',
    database: 'employees_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error conneccting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
