const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: false,
    },
    photo: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
}, {
    timestamps: true  // Use 'timestamps' instead of 'timestamp'
});

module.exports = mongoose.model('Post', PostSchema);
