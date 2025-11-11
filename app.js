const express = require('express');
const app = express();
const path = require('path');

const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
   return cb(null, `${Date.now()} - ${file.originalname}`)
  },
});

const upload = multer({ storage })


const mysql = require('mysql2');
const mysql_db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Cluster",
  database:"blogpost_db"
})

console.log(" Connection established!!");


//Create DB

// mysql_db.execute('create database blogpost_db')
// console.log('DB is created');

//create table in db

// mysql_db.execute(`
//   CREATE TABLE USER(
//     ID INT AUTO_INCREMENT PRIMARY KEY,
//     TITLE VARCHAR(20),
//     CONTENT VARCHAR(250)
//     );
//     `);
    
//     console.log('Created Table !!');

//     Insert data of user


//     console.log('Content Inserted Into the Table !!');



app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded());

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

app.get('/newPost', (req, res) => {
  res.render('createPost');
  });

app.post('/posts/store',upload.single('avatar'), (req, res) => {
  data =req.body;
  console.log(req.file, req.body)
  
 mysql_db.execute(
  'INSERT INTO `USER` (TITLE, CONTENT) VALUES (?, ?)',
  [data.Title,data.body]
); 

  res.redirect('/');
  });


app.listen(4000, () => console.log('Server running on http://localhost:4000'));
