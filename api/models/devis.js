const mongoose = require('mongoose');

const devisSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    societe : String,
    service : String,
    prixht : Number,
    remise : String,
    tva : String,
    prixttc :String,

});

module.exports = mongoose.model('Devis',devisSchema);