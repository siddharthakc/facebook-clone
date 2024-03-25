const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost", // Corrected typo here
    user: "root",
    password: "",
    database: "meow"
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO students(`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "Something went wrong" });
        return res.json({ success: "success" });
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "Something went wrong" });
        return res.json(result);
    });
});

app.listen(port, () => {
    console.log("Server Running");
});
