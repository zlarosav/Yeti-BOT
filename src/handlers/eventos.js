FS = require("fs")

module.exports = (CLIENT) => {
    try {
        let eventosCantidad = 0
        CARPETA = FS.readdirSync("./src/eventos/")
        for (FOLDER of CARPETA) {
            ARCHIVOS = FS.readdirSync(`./src/eventos/${FOLDER}/`).filter(((file) => file.endsWith(".js")))

            for (FILE of ARCHIVOS) {
                EVENTO = require(`../eventos/${FOLDER}/${FILE}`)
                NOMBRE_EVENTO = FILE.split(".")[0]
                CLIENT.on(NOMBRE_EVENTO, EVENTO.bind(null, CLIENT))
                eventosCantidad++
            }
        }
        console.log(`>> Eventos cargados   :   ${eventosCantidad}`.brightGreen)
    
    } catch (e) {
        console.error(`${e}`.brightRed)
    }
}