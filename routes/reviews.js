const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes "starts with" / (root)

// POST /movies/:id/reviews
router.post('/posts/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE /reviews/:id
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);
// GET /reviews/:id/edit
router.get('/reviews/:id/edit', ensureLoggedIn, reviewsCtrl.edit);
// PUT /reviews/:id
router.put('/reviews/:id', ensureLoggedIn, reviewsCtrl.update);

module.exports = router;