// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('database.db');

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  date TEXT,
  time TEXT,
  notes TEXT
)`);

app.post('/submit-booking', (req, res) => {
  const { name, email, date, time, notes } = req.body;
  db.run('INSERT INTO bookings (name, email, date, time, notes) VALUES (?, ?, ?, ?, ?)', [name, email, date, time, notes], function (err) {
    if (err) return res.status(500).send("Database error.");
    res.status(200).send("Booking saved.");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
