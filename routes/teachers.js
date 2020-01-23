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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res) {
  res.render('teachers/create', { message: '' });
});

router.post('/create', function(req, res) {
  pool.query('INSERT INTO teachers SET ?', req.body, function(err, result) {
    if (err) {
      throw err;
    }
    res.redirect('/teacher/all');
  });
});

router.get('/all', function(req, res) {
  let query = `select * from teachers`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('teachers/all', { teachers: result });
  });
});

module.exports = router;
