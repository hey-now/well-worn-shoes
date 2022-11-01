const Post = require('../models/post');

module.exports = {
    index,
    dashboard,
    favorites,
    new: newPost,
    create
};

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