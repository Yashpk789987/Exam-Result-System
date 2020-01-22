var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res) {
  res.render('teachers/create', { message: '' });
});

module.exports = router;
