// Este modelo depende del modelo "economia.js"
const mongoose = require('mongoose')

DELAYSCHEMA = new mongoose.Schema({
    guildID     : {type: String, require: true},
    userID      : {type: String, require: true},
    daily       : String,
    apostar     : String,
    work        : String, 
    reclamar    : String,
    rob         : String,
    rps         : String,
    roulette    : String,
    slut        : String,
    dice        : String,
    blackjack   : String,
    crime       : String,
    cofres      : String
})

MODEL = mongoose.model("Delays", DELAYSCHEMA)

module.exports = MODEL