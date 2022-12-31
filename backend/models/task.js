const mongoose = require('mongoose');

const task = new mongoose.Schema({
    text: {
        required: true,
        type: String
    },
    day: {
        required: true,
        type: String
    },
    reminder: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Task', task);