FS = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9')

module.exports = async (CLIENT) => {
    try {
        let slashCantidad = 0
        LISTA = []
        CARPETA = FS.readdirSync(`./src/slashcommands/`)
        
        for (FOLDER of CARPETA) {
            ARCHIVOS = FS.readdirSync(`./src/slashcommands/${FOLDER}`).filter(comando => comando.endsWith(".js"))
            
            for (FILE of ARCHIVOS) {
                COMANDO = require(`../slashcommands/${FOLDER}/${FILE}`)
                NOMBRE_COMANDO = FILE.split(".")[0]
                COMANDO.CMD.name = NOMBRE_COMANDO

                if (COMANDO.CMD.name) {
                    CLIENT.slash.set(COMANDO.CMD.name, COMANDO)
                    LISTA.push(COMANDO.CMD.toJSON())
                    slashCantidad++
                } else {
                    console.log(`Error SLASH: [/${FOLDER}/${FILE}]`.brightRed)
                    continue
                }
            }
        }

        CREST = new REST({ version: "9" }).setToken(process.env.TOKEN)
        try { 
            await CREST.put(Routes.applicationCommands(process.env.CLIENTID), { body: LISTA })
            console.log(`>> Slashcmd cargados  :   ${slashCantidad}`.brightGreen)
        } catch (e) {
            console.error(e)
        }
    } catch (e) {
        console.error(e)
    }
}