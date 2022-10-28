var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('profile', { title: `${user.name}'s Profile`});
  });

module.exports = router;