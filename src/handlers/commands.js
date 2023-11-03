FS = require('fs')

module.exports = (CLIENT) => {
    try {
        let cantidad = 0
        FS.readdirSync("./src/comandos/").forEach((carpeta) => {
            COMANDOS = FS.readdirSync(`./src/comandos/${carpeta}`).filter((archivo) => archivo.endsWith(".js"))
            for (let archivo of COMANDOS){
                COMANDO = require(`../comandos/${carpeta}/${archivo}`)
                if(COMANDO.name) {
                    CLIENT.comandos.set(COMANDO.name, COMANDO)
                    cantidad++
                } else {
                    console.log(`COMANDO [/${carpeta}/${archivo}]`, 'error => el comando no está configurado.'.brightRed)
                    continue
                }
                if (COMANDO.aliases && Array.isArray(COMANDO.aliases)) COMANDO.aliases.forEach((alias) => CLIENT.aliases.set(alias, COMANDO.name));
            }
        });
        console.log(`>> Comandos cargados  :   ${cantidad} `.brightGreen)
    } catch(e){
        console.error(e)
    }
}