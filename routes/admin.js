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
  res.render('admin/login', { message: '' });
});

router.post('/checkLogin', function(req, res) {
  let data = req.body;
  let email_mobile = data.email_mobile;
  let password = data.password;
  let query =
    "select * from admin where (email = '" +
    email_mobile +
    "' or mobile = '" +
    email_mobile +
    "') and password = '" +
    password +
    "'";
  pool.query(query, function(err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.render('admin/login', { message: 'Wrong Credientials' });
    } else if (result.length == 1) {
      req.session.admin = result[0];
      res.redirect('/admin/home');
    }
  });
});

router.all('/*', function(req, res, next) {
  console.log('Home....');
  if (req.session.admin != undefined) {
    next();
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/home', function(req, res) {
  console.log(req.session.admin);
  res.render('admin/home');
});

router.get('/logout', function(req, res) {
  req.session.admin = undefined;
  res.redirect('/admin/login');
});

module.exports = router;

// $email = $_POST['email_mobile']   // PHP
// String email = request.getParameter('email_mobile')  /// JAVA
