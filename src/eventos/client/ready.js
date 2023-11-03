MONGOOSE = require("mongoose")

module.exports = (CLIENT) => {
    MONGOOSE.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log(`☁ Conectado a la Base de Datos de MongoDB`.blue);
      }).catch((err) => {
        console.log(`☁ ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB`.red);
        console.log(err)
    })

    console.log(`>> Bot iniciado como  :   ${CLIENT.user.username}`.brightGreen)
}