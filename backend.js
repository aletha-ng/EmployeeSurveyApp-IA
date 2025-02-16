//Database Connection
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');  
const nodemailer = require('nodemailer');
const app = express();
const port = 5001;
const cron = require('node-cron');

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


//TESTING AREA
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: { user: 'your-email@gmail.com', pass: 'your-password' },
// });

// app.post('/api/schedule-email', async (req, res) => {
//   const { subject, content, scheduledTime } = req.body;
//   try {
//     await db.execute(
//       'INSERT INTO email_schedules (subject, content, scheduled_time, status) VALUES (?, ?, ?, ?)',
//       [subject, content, scheduledTime, 'pending']
//     );
//     res.status(201).send('Email scheduled');
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// cron.schedule('* * * * *', async () => {
//   try {
//     const [emails] = await db.execute(
//       'SELECT * FROM email_schedules WHERE status = ? AND scheduled_time <= NOW()',
//       ['pending']
//     );

//     for (const email of emails) {
//       const [employees] = await db.execute('SELECT email FROM employees');
//       const recipients = employees.map((e) => e.email);

//       await transporter.sendMail({
//         from: 'your-email@gmail.com',
//         to: recipients.join(','),
//         subject: email.subject,
//         text: email.content,
//       });

//       await db.execute('UPDATE email_schedules SET status = ? WHERE id = ?', ['sent', email.id]);
//     }
//   } catch (error) {
//     console.error('Cron job error:', error);
//   }
// });

/////////////////////////////////////////////////

//Get Count values of Satisfaction rating
app.get('/satisfaction-distribution', (req, res) => {
  const query = `
    SELECT satisfaction_rating, COUNT(*) as count
    FROM survey_responses
    GROUP BY satisfaction_rating
    ORDER BY satisfaction_rating`
  ;

  db.query(query, (error, results) => {
    if(error){
      console.error('Error fetching satisfaction distribution:', error);
      return res.status(500).json({error: 'Database error'});
    }

    const rating_count = [0,0,0,0,0];
    results.forEach((row) => {
      const set_indexas_rating = row.satisfaction_rating-1; 
      if(set_indexas_rating >= 0 && set_indexas_rating < 5){
        rating_count[set_indexas_rating] += row.count;
      }
    });

    const rating_categories = rating_count.map((count, index) => ({
      rating: index +1,
      count: count,
    }));

    console.log(rating_categories);  
    res.json(rating_categories); 
  });
});



//Login User - Checking details inputted by users 
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
        return res.status(200).send({
          message: 'Login successful',
          user_role: user.user_role,
          user_id: user.user_id 
        });

      }
      else{
        return res.status(400).send('Wrong password');
      }
    })
  })
});

//Employee Records - Take user data from database for display 
app.get('/getEmpList', (req, res) => {
  //Fetches all user data from database 
  const query = 'SELECT * FROM user_detail';

  //Returns the data if succesfully fetched user data 
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({error: 'Database error'});
    } else {
      res.status(200).json({employees: results});
      console.log('success');
    }
  });
});

//Submitting Survey
app.post('/submitSurvey', (req, res) => {
  //take user id, ratings, feedback and put into the table. 
  const {userID, satisfactionRating, feedbackType, feedbackResponse, submittedDate} = req.body;

  //test delete ltr
  console.log('Request received with data:', req.body);

  // Check if all required fields are present
  if (!userID || !satisfactionRating || !feedbackType || !feedbackResponse || !submittedDate) {
    console.error('Missing required fields:', { userID, satisfactionRating, feedbackType, feedbackResponse, submittedDate });
    return res.status(400).send('Missing required fields');
  }
  //////////

  //SQL query to insert data into the database
  const query = 'INSERT INTO survey_responses(user_id, satisfaction_rating, written_type, written_response, submitted_at) VALUES (?, ?, ?, ?, ?)';
  const values = [userID, satisfactionRating, feedbackType, feedbackResponse, submittedDate];


  ///////////del ltr
  console.log('Executing query:', query);
  console.log('With values:', values);
  /////

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send('Error saving survey data');
    }
    res.status(200).send('Survey data saved successfully');
  });
});

//Fetching Data For Retention Rate
app.get('/api/retention-rate', (req, res) => {
  const query = 'SELECT employee_at_start, employee_at_end FROM kpi';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
  
      res.json(results);
    });
});
    
//Fetching Data For Turnover Rate
app.get('/api/turnover-rate', (req, res) => {
  const query = 'SELECT employee_left_company, employee_stayed_company FROM kpi';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
    
      res.json(results);
  });
});

//Fetching Data For Satisfaction Rating
app.get('/api/satisfaction-ratings', (req, res) => {
  const query = 'SELECT rating_1, rating_2, rating_3, rating_4, rating_5 FROM kpi_sat_rate';

  db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error fetching data');
      }
      
      res.json(results);
  });
});

//Fetching Data for Feedbacks from Survey
app.get('/api/feedbacks', (req, res) => {
  const query = 'SELECT user_id, written_type, written_response FROM survey_responses';

  db.query(query, (err, results)=>{
    if(err){
      console.error('Error fetching data', err);
      return res.status(500).send('Error fetching data');
    }

    res.json(results);
  });
});

//Fetching User Data for Profile 
app.get('/api/user', (req, res) => {
  const userId = req.query.id;

  //del ltr
  console.log('Received userId:', userId);
  //////

  if (!userId) {
    console.error('Missing userId:', req.query);
    return res.status(400).json({ error: 'User ID is required' });
  }

  const query = 'SELECT user_name, user_email, user_department FROM user_detail WHERE user_id=?';

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      
      //dell ltr
      console.log('Failed to fetch:', userId);
      ///

      return res.status(500).json({error: 'Failed to fetch user data'});
    }

    if (results.length > 0) {
      //del ltr
      console.log('success');
      //////
      res.json(results[0]);
    } else {
      res.status(404).json({error: 'User not found'});
    }
  });
});

//Send Email
app.post('/sendEmail', (req, res) => {
  const {date, content, recipientId} = req.body;
  
  //Get recipient's email from database
  db.query('SELECT email FROM user_detail WHERE user_id = ?', [recipientId], (err, result) => {
    if (err) {
      console.error('Error fetching recipient email:', err);
      return res.status(500).json({ message: 'Error fetching recipient email' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const recipientEmail = result[0].email;

    //Send email immediately or schedule it 
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: 'Scheduled Email',
      text: content,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({message: 'Error sending email'});
      }
      res.status(200).json({message: 'Email sent successfully', info});
    });
  });
});
