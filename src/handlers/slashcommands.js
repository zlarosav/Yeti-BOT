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
                const NOMBRE_COMANDO = archivo.split(".")[0]
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

        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)

        try { 
            await rest.put(Routes.applicationCommands("941529412799709195"), { body: LISTA })
            console.log(`${slashCantidad} slashcommands cargados.`.brightGreen)
            
        } catch (e) {
            console.error(e)
        }
        
    } catch (e) {
        console.error(e)
    }
}