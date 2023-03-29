const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    artist: String,
    slength: String,
    album: String,
    simage: String
});

module.exports = mongoose.model('Songs', schema);
