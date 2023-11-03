// Este modelo depende del modelo "delay.js"
const mongoose = require('mongoose')

ECOSCHEMA = new mongoose.Schema({
    guildID          : {type: String,   require: true},
    userID           : {type: String,   require: true},
    dinero           : {type: Number,   default: 0},
    banco            : {type: Number,   default: 0},
    capacidad_banco  : {type: Number,   default: 500},
    vip              : {type: Boolean,  default: false}
})

MODEL = mongoose.model("Economia", ECOSCHEMA)

module.exports = MODEL