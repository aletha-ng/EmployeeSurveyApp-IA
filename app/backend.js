const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');  // Add bcrypt for password hashing and comparison

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AWQert#987',
  database: 'survey_database'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Add login route to handle user authentication
app.post('/login', (req, res) => {
  const { user_email, user_password, user_role } = req.body;
  
  // Query the database to find the user by email
  db.query('SELECT * FROM users WHERE email = ?', [user_email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    
    // Compare the hashed password with the input password
    bcrypt.compare(user_password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If password matches, send success response with user role
      res.json({ message: 'Login successful', user_role: user_role });
    });
  });
});

app.get('/data', (req, res) => {
  db.query('SELECT * FROM user_detail', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
