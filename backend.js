//Database Connection
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const app = express();
const port = 5001;
const cron = require("node-cron");
const { all } = require("axios");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AWQert#987",
  database: "survey_database",
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Login User - Checking details inputted by users
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user_detail WHERE user_email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.log("err:", err);
      return res.status(500).send("Internal server error"); //
    }

    if (results.length === 0) {
      console.log("No user found for the provided email");
      return res.status(404).send("No user found with that email");
    }

    const user = results[0];

    bcrypt.compare(password, user.user_password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error comparing passwords");
      }

      if (isMatch) {
        return res.status(200).send({
          message: "Login successful",
          user_role: user.user_role,
          user_id: user.user_id,
        });
      } else {
        return res.status(400).send("Wrong password");
      }
    });
  });
});

//Email related functions
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "consultingfirmfeedbacknotify@gmail.com",
    pass: "yysd xbsq pdum pixv",
  },
});

//Send email now
app.post("/send-email-now", (req, res) => {
  const { subject, body } = req.body;

  const query = "SELECT user_email FROM user_detail where user_role = ?";
  const role = "employee";

  db.query(query, [role], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("error fetching email");
    }

    const employeeEmail = result.map((data) => data.user_email);
    console.log(employeeEmail);

    const emailData = {
      from: "consultingfirmfeedbacknotify@gmail.com",
      to: employeeEmail.join(","),
      subject: subject,
      text: body,
    };

    transporter.sendMail(emailData, (error, info) => {
      if (error) {
        console.error(error);
        return res.send("Error sending email");
      } else {
        console.log(info.response);
        return res.send("Email sent successfully");
      }
    });
  });
});

//Scheduling Email (For later date)
app.post("/api/schedule-email", (req, res) => {
  const { subject, body, sendDate } = req.body;

  console.log("Received data:", req.body);
  console.log(subject);
  console.log(body);
  console.log(sendDate);

  // Check if all necessary data is present
  if (!subject || !body || !sendDate) {
    console.error("Missing required data: ", { subject, body, sendDate });
    return res.status(400).send("Missing required data");
  }

  const query =
    "INSERT INTO email_schedules(subject, content, scheduled_time, status) VALUES(?, ?, ?, ?)";
  const values = [subject, body, sendDate, "pending"];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting email:", err);
      return res.status(500).send("Error scheduling email");
    }
    console.log("Insert successful:", results);
    res.status(200).send("Email Scheduled");
  });
});

cron.schedule("* * * * *", () => {
  db.query(
    "SELECT * FROM email_schedules WHERE status = ? AND scheduled_time <= NOW()",
    ["pending"],
    (err, scheduled_emails) => {
      if (err) {
        console.log(err);
        return;
      }

      scheduled_emails.forEach((individual_email) => {
        db.query(
          "SELECT user_email FROM user_detail WHERE user_role = ?",
          ["employee"],
          (err, employees) => {
            if (err) {
              console.error(err);
              return;
            }

            const email_recipients = employees.map(
              (employee_email_row) => employee_email_row.user_email
            );

            const emailData = {
              from: "consultingfirmfeedbacknotify@gmail.com",
              to: email_recipients.join(","),
              subject: individual_email.subject,
              text: individual_email.content,
            };

            transporter.sendMail(emailData, (error, info) => {
              if (error) {
                console.error(error);
                return res.send("Error scheduling email");
              } else {
                console.log(info.response);
                return res.send("Email scheduled successfully");
              }
            });

            db.query(
              "UPDATE email_schedules SET status = ?, sent_time = NOW() WHERE id = ?",
              ["sent", individual_email.id],
              (err) => {
                if (err) {
                  console.error("Error updating email status:", err);
                }
              }
            );
          }
        );
      });
    }
  );
});

//Get Count values of each satisfaction rating
app.get("/satisfaction-distribution", (req, res) => {
  const query = `
    SELECT satisfaction_rating, COUNT(*) as count
    FROM survey_responses
    GROUP BY satisfaction_rating
    ORDER BY satisfaction_rating`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching satisfaction distribution:", error);
      return res.status(500).json({ error: "Database error" });
    }

    const rating_count = [0, 0, 0, 0, 0];
    results.forEach((row) => {
      const set_indexas_rating = row.satisfaction_rating - 1;
      if (set_indexas_rating >= 0 && set_indexas_rating < 5) {
        rating_count[set_indexas_rating] += row.count;
      }
    });

    const rating_categories = rating_count.map((count, index) => ({
      rating: index + 1,
      count: count,
    }));

    console.log(rating_categories);
    res.json(rating_categories);
  });
});

//Employee Records - Take user data from database for display
app.get("/getEmpList", (req, res) => {
  //Fetches all user data from database
  const query = "SELECT * FROM user_detail";

  //Returns the data if succesfully fetched user data
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json({ employees: results });
      console.log("success");
    }
  });
});

//Submitting Survey
app.post("/submitSurvey", (req, res) => {
  const {
    userID,
    satisfactionRating,
    feedbackType,
    feedbackResponse,
    submittedDate,
  } = req.body;

  // Check if all required fields are present
  if (
    !userID ||
    !satisfactionRating ||
    !feedbackType ||
    !feedbackResponse ||
    !submittedDate
  ) {
    console.error("Missing required fields:", {
      userID,
      satisfactionRating,
      feedbackType,
      feedbackResponse,
      submittedDate,
    });
    return res.status(400).send("Missing required fields");
  }

  //SQL query to insert data into the database
  const query =
    "INSERT INTO survey_responses(user_id, satisfaction_rating, written_type, written_response, submitted_at) VALUES (?, ?, ?, ?, ?)";
  const values = [
    userID,
    satisfactionRating,
    feedbackType,
    feedbackResponse,
    submittedDate,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error saving survey data");
    }
    res.status(200).send("Survey data saved successfully");
  });
});

//Add new kpi data
app.post("/insert-new-kpi", (req, res) => {
  const { quarter_month, num_employees_start, num_employees_end } = req.body;

  //Changing to integer form since received is string
  const start = Number(num_employees_start);
  const end = Number(num_employees_end);

  let average_num_employees = ((end + start) / 2).toFixed(2);
  let retention_rate = ((end / start) * 100).toFixed(2);

  let turnover_rate = 0;

  //If end value > start, turnover should be 0 to avoid negative val
  if (end > start) {
    turnover_rate = 0;
  } else {
    turnover_rate = (((start - end) / start) * 100).toFixed(2);
  }

  const query =
    "INSERT INTO kpi(quarter_month, num_employees_start, num_employees_end, average_num_employees, retention_rate, turnover_rate) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    quarter_month,
    num_employees_start,
    num_employees_end,
    average_num_employees,
    retention_rate,
    turnover_rate,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching data");
    } else {
      res.json(result);
    }
  });
});

//Get latest 5 newest data for kpi
app.get("/get-kpi-data", (req, res) => {
  const query = `SELECT * FROM kpi
    ORDER BY when_added DESC
    LIMIT 5`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return;
    } else {
      results.reverse();
      res.json({ results });
    }
  });
});

//Fetching Data For Satisfaction Rating
app.get("/api/satisfaction-ratings", (req, res) => {
  const query =
    "SELECT rating_1, rating_2, rating_3, rating_4, rating_5 FROM kpi_sat_rate";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Error fetching data");
    }

    res.json(results);
  });
});

//Fetching Data for Feedbacks from Survey
app.get("/api/feedbacks", (req, res) => {
  const query =
    "SELECT user_id, written_type, written_response FROM survey_responses";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data", err);
      return res.status(500).send("Error fetching data");
    }

    res.json(results);
  });
});

//Fetching User Data for Profile
app.get("/api/user", (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    console.error("Missing userId:", req.query);
    return res.status(400).json({ error: "User ID is required" });
  }

  const query =
    "SELECT user_name, user_email, user_department FROM user_detail WHERE user_id=?";

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Failed to fetch user data" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});
