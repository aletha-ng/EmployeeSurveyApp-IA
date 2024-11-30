const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

//Middleware
app.use(bodyParser.json());

//Database Connection
const db = mysql.createConnection({
  host: 'localhost', //Database host
  user: 'root', //Database username
  password: 'AWQert#987', //Database password
  database: 'survey_maker', //Database named referenced 
});

//Connecting to mySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL Database!');
});
