FS = require("fs")

module.exports = (CLIENT) => {
    try {
        console.log("Cargando los eventos...".yellow)
        let eventosCantidad = 0
        CARPETA = FS.readdirSync("./src/eventos/")
        for (let folder of CARPETA) {
            ARCHIVOS = FS.readdirSync(`./src/eventos/${folder}/`).filter(((file) => file.endsWith(".js")))

            for (let archivo of ARCHIVOS) {
                EVENTO = require(`../eventos/${folder}/${archivo}`)
                NOMBRE_EVENTO = archivo.split(".")[0]
                CLIENT.on(NOMBRE_EVENTO, EVENTO.bind(null, CLIENT))
                eventosCantidad++
            }
        }
        console.log(`${eventosCantidad} eventos cargados`.brightGreen)
    
    } catch (e) {
        console.error(`${e}`.brightRed)
    }
}