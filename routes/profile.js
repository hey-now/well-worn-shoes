var express = require('express');
var router = express.Router();
const Post = require('../models/post');

router.get('/profile', function(req, res, next) {
    Post.find({user: req.user._id}, function(err, posts) {
        let likes = 0;
        posts.forEach(p => likes += p.usersFav.length);
        res.render('profile', { title: 'Profile', likes});
    });
  });

module.exports = router;