const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
});

module.exports = mongoose.model('Post', postSchema);