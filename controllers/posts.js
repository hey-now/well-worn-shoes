const Post = require('../models/post');

module.exports = {
    index,
    dashboard,
    favorites,
    new: newPost,
    create,
    show,
    edit,
    update
};

function update(req, res) {
    Post.findOneAndUpdate(
      {_id: req.params.id},
      // update object with updated properties
      req.body,
      // options object with new: true to make sure updated doc is returned
      {new: true},
      function(err, post) {
        if (err || !post) return res.redirect('/posts');
        res.redirect(`/posts/${post._id}`);
      }
    );
  }

function edit(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
      if (err || !post) return res.redirect('/posts');
      res.render('posts/edit', { title: 'Edit Post', post });
    });
  }

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', { title: 'All Posts', posts });
    });
}

function favorites(req, res) {
    res.render('posts/favorites', {title: 'Favorite Shoes'});
}

function dashboard(req, res) {
    Post.find({user: req.user}, function(err, posts) {
        res.render('posts/dashboard', {title: 'Shoe Rack', posts});
    });
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/show', { title: 'Post Detail', post });
    });
}

function newPost(req, res) {
    res.render('posts/new', {title: 'Add A New Shoe!'});
}

function create(req, res) {
    console.log('req.user: ', req.user);
    const post = new Post(req.body);
    post.user = req.user._id;
    post.userName = req.user.name;
    post.userAvatar = req.user.avatar;
    post.save(function(err) {
        console.log('err: ', err);
        if(err) return res.redirect('/posts/new');
        console.log(post);
        res.redirect('/posts');
    });
}