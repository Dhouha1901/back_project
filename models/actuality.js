const mongoose = require('mongoose');

let Actuality = mongoose.model('actuality', {

    title:  String,
    description: String,
    date: Date,    
    image: String,
    direction: String,


})

module.exports = Actuality