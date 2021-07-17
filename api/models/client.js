const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    logo : String,
    societe :String,
    client : String,
    email : String,
    telephone : String
})

module.exports = mongoose.model('Client',clientSchema);