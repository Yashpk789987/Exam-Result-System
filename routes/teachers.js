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

router.get('/allemailRest', function(req, res) {
  let query = `select email from teachers`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
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

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  let query = `delete from teachers where _id = ${id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/teacher/all');
  });
});

router.get('/update/:id', function(req, res) {
  let id = req.params.id;
  let query = `select * from teachers where _id = ${id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('teachers/edit', { teacher: result[0] });
  });
});

router.post('/update', function(req, res) {
  let { _id, name, email, mobile, password } = req.body;
  let query = `update teachers set name = '${name}' , email = '${email}' , mobile = '${mobile}' , password = '${password}' where _id = ${_id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/teacher/all');
  });
});

module.exports = router;
