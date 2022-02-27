const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    userID: {
        type: String
    }
});

module.exports = mongoose.model('movie', MovieSchema);