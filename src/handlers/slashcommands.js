FS = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9')

module.exports = async (CLIENT) => {
    try {
        let slashCantidad = 0
        LISTA = []
        CARPETA = FS.readdirSync(`./src/slashcommands/`)
        
        for (let folder of CARPETA) {
            ARCHIVOS = FS.readdirSync(`./src/slashcommands/${folder}`).filter(comando => comando.endsWith(".js"))
            
            for (let archivo of ARCHIVOS) {
                let comando = require(`../slashcommands/${folder}/${archivo}`)
                NOMBRE_COMANDO = archivo.split(".")[0]
                comando.CMD.name = NOMBRE_COMANDO

                if (comando.CMD.name) {
                    CLIENT.slash.set(comando.CMD.name, comando)
                    LISTA.push(comando.CMD.toJSON())
                    slashCantidad++
                } else {
                    console.log(`Error SLASH: [/${folder}/${archivo}]`.brightRed)
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