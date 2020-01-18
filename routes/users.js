var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/demo', function(req, res) {
  res.send('helo demo url');
});

module.exports = router;
