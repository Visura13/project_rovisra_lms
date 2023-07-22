const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    roles: {
        Editor: {
            type: Number,
            default: 3000
        },
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    refreshToken: String
});

module.exports = mongoose.model('Editor', editorSchema);