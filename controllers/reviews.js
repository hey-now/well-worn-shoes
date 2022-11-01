const Post = require('../models/post');

module.exports = {
    create,
    delete: deleteReview,
    edit,
    update
};

function update(req, res) {
    Post.findOne({'reviews._id': req.params.id}, function(err, post) {
      const reviewSubdoc = post.reviews.id(req.params.id);
      if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
      reviewSubdoc.content = req.body.content;
      reviewSubdoc.rating = req.body.rating;
      post.save(function(err) {
        res.redirect(`/posts/${post._id}`);
      });
    });
  }

function edit(req, res) {
    Post.findOne({'reviews._id': req.params.id}, function(err, post) {
      const review = post.reviews.id(req.params.id);
      res.render('reviews/edit', {review, title: 'Edit Review'});
    });
}

function deleteReview(req, res, next) {
    Post.findOne({
      'reviews._id': req.params.id,
      'reviews.user': req.user._id
    }).then(function(post) {
      if (!post) return res.redirect('/posts');
      post.reviews.remove(req.params.id);
      post.save().then(function() {
        res.redirect(`/posts/${post._id}`);
      }).catch(function(err) {
        return next(err);
      });
    });
  }

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        post.reviews.push(req.body);
        post.save(function(err) {
            res.redirect(`/posts/${post.id}`);
        });
    });
}