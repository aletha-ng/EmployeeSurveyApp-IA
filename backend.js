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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Function That Work - DONT CHANGE 
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

//Function That Work but May still need to be edited 
app.get('/api/retention-rate', (req, res) => {
  const query = 'SELECT employee_at_start, employee_at_end FROM kpi';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
      
      // Send the results back as JSON
      res.json(results);
    });
});
    
app.get('/api/turnover-rate', (req, res) => {
  const query = 'SELECT employee_left_company, employee_stayed_company FROM kpi';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
      
      // Send the results back as JSON
      res.json(results);
  });

});

app.get('/api/satisfaction-ratings', (req, res) => {
  const query = 'SELECT rating_1, rating_2, rating_3, rating_4, rating_5 FROM kpi_sat_rate';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
      
      // Send the results back as JSON
      res.json(results);
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

//CURRENT WORKING 
app.post('/login', (req, res) => {
  const {email, password} = req.body; 

  const query = 'SELECT * FROM user_detail WHERE user_email = ?';
  db.query(query, [email], (err, results) => {
    if(err){
      console.log('err:', err);  
      return res.status(500).send('Internal server error');  //
    }

    if(results.length === 0){
      console.log('No user found for the provided email');
      return res.status(404).send('No user found with that email');
    }

    const user = results[0]; 

    bcrypt.compare(password, user.user_password, (err, isMatch) => {
      if(err){
        return res.status(500).send('Error comparing passwords');
      }
      
      if(isMatch){
        return res.status(200).send({message: 'Login successful', user_role: user.user_role});
      }
      else{
        return res.status(400).send('Wrong password');
      }
    })
  })
});
