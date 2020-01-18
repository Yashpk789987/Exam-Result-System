var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'exam_result_system'
});

router.get('/login', function(req, res) {
  res.render('admin/login');
});

router.post('/checkLogin', function(req, res) {
  let data = req.body;
  let email_mobile = data.email_mobile;
  let password = data.password;
  let query =
    "select * from admin where email = '" +
    email_mobile +
    "' and password = '" +
    password +
    "'";
  console.log(query);
  pool.query(query, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  console.log(data);
  res.end();
});

module.exports = router;

// $email = $_POST['email_mobile']   // PHP
// String email = request.getParameter('email_mobile')  /// JAVA
