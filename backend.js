//Database Connection
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');  
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

app.post('/login', async (req, res) => {
    const { user_email, user_password, user_role } = req.body;
  
    try {
      // Query to find user by email and role
      const query = 'SELECT * FROM users WHERE email = ? AND role = ?';
      
      db.query(query, [user_email, user_role], async (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred while querying the database.' });
        }
  
        if (results.length === 0) {
          return res.status(402).json({ message: 'User not found or role mismatch' });
        }
  
        const user = results[0]; // Assuming only one result is returned
  
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(user_password, user.password);
  
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
  
        // Return user role on success
        res.json({ message: 'Login successful', user_role: user.role });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
});
    
app.get('/getEmpList', (req, res) => {
    const query = 'SELECT * FROM user_detail';
  
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(200).json({ employees: results });
        console.log('success');
      }
    });
});



app.get('/data', (req, res) => {
  const queryResults = {};

  db.query('SELECT * FROM user_detail', (err, result) => {
    if (err) return res.status(502).json({error: err.message });
    queryResults.user_detail = result;

    db.query('SELECT * FROM survey', (err, result) => {
      if (err) return res.status(503).json({error: err.message });
      queryResults.survey = result;

      db.query('SELECT * FROM question', (err, result) => {
        if (err) return res.status(504).json({error: err.message });
        queryResults.question = result;

        db.query('SELECT * FROM option_multiple_choice', (err, result) => {
          if (err) return res.status(505).json({error: err.message });
          queryResults.option_multiple_choice = result;

          db.query('SELECT * FROM option_ratings', (err, result) => {
            if (err) return res.status(506).json({ error: err.message });
            queryResults.option_ratings = result;

            db.query('SELECT * FROM option_written', (err, result) => {
              if (err) return res.status(507).json({ error: err.message });
              queryResults.written = result;

              db.query('SELECT * FROM response', (err, result) => {
                if (err) return res.status(508).json({ error: err.message });
                queryResults.response = result;

                db.query('SELECT * FROM response_detail', (err, result) => {
                  if (err) return res.status(509).json({ error: err.message });
                  queryResults.response_detail = result;

                  db.query('SELECT * FROM password_change', (err, result) => {
                    if (err) return res.status(510).json({ error: err.message });
                    queryResults.password_change = result;

                    db.query('SELECT * FROM kpi', (err, result) => {
                      if (err) return res.status(511).json({ error: err.message });
                      queryResults.kpi = result;

                      // Send the combined results
                      res.json(queryResults);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
