

module.exports = {
    index,
    dashboard,
    favorites,
    new: newPost,
    create
};

function index() {

}

function favorites(req, res) {
    res.render('posts/favorites', {title: 'Favorite Shoes'});
}

function dashboard(req, res) {
    res.render('posts/dashboard', {title: 'Dashboard'});
}

function newPost(req, res) {
    res.render('posts/new', {title: 'Add New Shoe!'});
}

function create() {

}