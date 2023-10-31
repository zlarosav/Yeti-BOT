const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { color, categ } = require("../../handlers/funciones.js")
FS = require("fs")

module.exports = {

    CMD: new SlashCommandBuilder().setDescription("📔 | Comandos del bot y su respectiva información.")
    .addStringOption(option => option.setName("comando").setDescription("Escribe el nombre del comando")),
    
    run: async (CLIENT, interaction) => {
        SLASH_LISTA = await CLIENT.application.commands.fetch()
        COMANDO_OPTION = interaction.options.getString("comando")

        if (COMANDO_OPTION) {
            SLASH = CLIENT.slash.get(COMANDO_OPTION.toLowerCase())

            if (SLASH) {
                NAME = SLASH.CMD.name
                NAME_FIRST_MAYUS = NAME.charAt(0).toUpperCase() + NAME.slice(1).toLowerCase()
                DESCRIPTION = SLASH.CMD.description
                EMBED = new EmbedBuilder().setColor(process.env.COLOR).setDescription(`# <:star:1143684933399887942> ${NAME_FIRST_MAYUS}\nDescripción: ${DESCRIPTION}`)
                interaction.reply({ embeds: [EMBED] })

            } else {
                EMBED = new EmbedBuilder().setColor(process.env.COLOR).setDescription(`# <:skull:1143684711944814672> Error en el comando\nEl comando **${COMANDO_OPTION}** no existe. Prueba a usar el comando "/help" sin ningún parámetro para obtener todos los comandos existentes.`)
                interaction.reply({ embeds: [EMBED] })
            }
            
        } else if (!COMANDO_OPTION) {
            EMBED = new EmbedBuilder().setColor(process.env.COLOR).setDescription(`# Comandos por categoría:`)
            CATEGORIAS = FS.readdirSync(`./src/slashcommands`)

            for (let folder of CATEGORIAS) {
                ARCHIVOS = FS.readdirSync(`./src/slashcommands/${folder}`).filter(comando => comando.endsWith(".js"))
                ORDENADO = ARCHIVOS.map(archivo => {
                    SLASH = CLIENT.slash.get(archivo.split(".")[0])
                    NAME = SLASH.CMD.name
                    DESCRIPTION = SLASH.CMD.description.split(" | ")[1]
                    return `${color(process.env.PREFIJO+NAME, "verde")} - ${DESCRIPTION}`
                })
                EMBED.addFields([{ name:`**${categ(folder.toLowerCase())}**`, value: `\`\`\`ansi\n${ORDENADO.join("\n")}\`\`\``, inline: false }])
            }
            interaction.reply({ embeds:[EMBED] })
        }
    }
}