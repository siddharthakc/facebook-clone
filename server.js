const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Database connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meow"
});

// Check for database connection errors
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create a new student
app.post('/students', (req, res) => {
    const { name, email, age, gender } = req.body;
    const sql = "INSERT INTO students(`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
    const values = [name, email, age, gender];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating student:', err);
            return res.status(500).json({ message: "Failed to create student" });
        }
        return res.json({ success: "Student created successfully" });
    });
});

// Get all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ message: "Failed to retrieve students" });
        }
        return res.json(result);
    });
});

// Get a student by ID
app.get("/students/:name", (req, res) => {
    const name = req.params.name;
    const sql = "SELECT * FROM students WHERE name = ?";
    
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error retrieving student by ID:', err);
            return res.status(500).json({ message: "Failed to retrieve student by ID" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json(result[0]);
    });
});

// Update a student
app.put('/students/:name', (req, res) => {
    const { email, age, gender } = req.body;
    const name = req.params.name;
    const sql = "UPDATE students SET `name` = ?, `email` = ?, `age` = ?, `gender` = ? WHERE `id` = ?";
    const values = [name, email, age, gender, id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({ message: "Failed to update student" });
        }
        return res.json({ success: "Student updated successfully" });
    });
});

// Delete a student
app.delete('/students/:name', (req, res) => {
    const name = req.params.name;
    const sql = "DELETE FROM students WHERE `name` = ?";
    
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ message: "Failed to delete student" });
        }
        return res.json({ success: "Student deleted successfully" });
    });
});

// Default routes
app.get('/', (req, res) => {
    res.json('Hello world');
});

app.get('/meow', (req, res) => {
    res.json('meow world');
});

// Start server
app.listen(port, () => {
    console.log(`\nServer is running on http://127.0.0.1:${port}`);
});
