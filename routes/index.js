var express = require('express');
var router = express.Router();
var account = require("./account");

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/',account);

module.exports = router;
