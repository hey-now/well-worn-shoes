const Post = require('../models/post');

module.exports = {
    index,
    dashboard,
    favorites,
    new: newPost,
    create,
    show,
    edit,
    update,
    delete: deletePost,
    addFav,
    search
};


function search(req, res) {
  Post.find({$or: [
    {title: {$regex: new RegExp(req.query.search, 'i')}},
    {destination: {$regex: new RegExp(req.query.search, 'i')}},
    {description: {$regex: new RegExp(req.query.search, 'i')}},
    {userName: {$regex: new RegExp(req.query.search, 'i')}}
  ]}).sort('-createdAt').exec(function(err, posts) {
      res.render('posts/search', { title: 'Shoe Search', posts });
  });
}

function addFav(req, res) {
    Post.findById(req.params.id, function(err, post) {
      if (post.usersFav.includes(req.user._id)) return res.redirect('/posts/favorites');
      post.usersFav.push(req.user._id);
      post.save(function(err) {
        res.redirect('/posts/favorites');
      });
    });
  }

function deletePost(req, res) {
    Post.findOneAndDelete(
      {_id: req.params.id, user: req.user._id}, function(err) {
        res.redirect('/posts');
      }
    );
  }

function update(req, res) {
    Post.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id},
      req.body,
      {new: true},
      function(err, post) {
        if (err || !post) return res.redirect('/posts');
        res.redirect(`/posts/${post._id}`);
      }
    );
  }

function edit(req, res) {
    Post.findOne({_id: req.params.id, user: req.user._id}, function(err, post) {
      if (err || !post) return res.redirect('/posts');
      res.render('posts/edit', { title: 'Edit Shoe', post });
    });
  }

function index(req, res) {
    Post.find({}).sort('-createdAt').exec(function(err, posts) {
        res.render('posts/index', { title: 'Newest Shoes', posts });
    });
}

function favorites(req, res) {
    Post.find({usersFav: req.user}, function(err, posts) {
    res.render('posts/favorites', { title: 'Favorite Shoes', posts });
    });
}

function dashboard(req, res) {
    Post.find({user: req.user}, function(err, posts) {
        res.render('posts/dashboard', {title: 'Shoe Rack', posts});
    });
}

function show(req, res) {
    Post.findById(req.params.id).populate('usersFav').exec(function(err, post) {
        console.log(post);
        res.render('posts/show', { title: 'Shoe Detail', post });
    });
}

function newPost(req, res) {
    res.render('posts/new', {title: 'Add A New Shoe!'});
}

function create(req, res) {
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