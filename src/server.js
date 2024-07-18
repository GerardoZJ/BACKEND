const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.put('/updateProfile', (req, res) => {
    const { id, nombre, correo, contrasena } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';
    db.query(query, [nombre, correo, contrasena, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ success: true, message: 'Profile updated successfully!' });
        }
    });
});

app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
    db.query(query, [correo, contrasena], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length > 0) {
            res.json({ success: true, user: results[0], message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid credentials!' });
        }
    });
});

app.post('/register', (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    const query = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    db.query(query, [nombre, correo, contrasena], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const newUserQuery = 'SELECT * FROM usuarios WHERE id = ?';
            db.query(newUserQuery, [result.insertId], (err, results) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({ success: true, user: results[0], message: 'User registered successfully!' });
                }
            });
        }
    });
});

app.get('/ph-levels', (req, res) => {
    const query = 'SELECT * FROM ph_levels';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/temperature-levels', (req, res) => {
    const query = 'SELECT * FROM temperature_levels';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/orp-levels', (req, res) => {
    const query = 'SELECT * FROM orp_levels';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.get('/latest-temperature', (req, res) => {
    const query = 'SELECT temperature, date FROM temperature_levels ORDER BY date DESC LIMIT 1';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result[0]);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});