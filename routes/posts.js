var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/posts'


router.get('/', postsCtrl.index);
router.get('/new', ensureLoggedIn, postsCtrl.new);
router.get('/dashboard', ensureLoggedIn, postsCtrl.dashboard);
router.get('/favorites', ensureLoggedIn, postsCtrl.favorites);
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
router.put('/:id', ensureLoggedIn, postsCtrl.update);
router.get('/:id', postsCtrl.show);
router.post('/', ensureLoggedIn, postsCtrl.create);


module.exports = router;
