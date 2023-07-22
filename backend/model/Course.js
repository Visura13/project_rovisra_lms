const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    title: {
        type: String,
        //required: true
    },
    faculty: {
        type: String,
       // required: false
    },
    price: {
        type: Number,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    duration: {
        type: String,
       // required: false
    },
    startday: {
        type: Date,
       // required: false
    },
    content: {
        type: String,
       // required: true
    },
    image: {
        type: Object,
       // required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Course', courseSchema);
