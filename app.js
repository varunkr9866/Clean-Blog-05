const express = require('express');
const app = express();

const mysql = require('mysql2');
const mysql_db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Cluster",
  database:"blogpost_db"
})

//Create DB

mysql_db.execute('create database blogpost_db')

//create table in db

mysql_db.execute(`
  CREATE TABLE USER(
  ID INT AUTO_INCREMENT ,
  TITLE VARCHAR(20) NOT NULL,
  CONTENT VARCHAR(250) NOT NULL UNIQUE
  );
    `);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/post', (req, res) => {
  res.render('post');
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
