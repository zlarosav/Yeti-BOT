const { EmbedBuilder } = require("discord.js")
const { color, categ, entablar } = require("../../handlers/funciones.js")
FS = require("fs")

module.exports = async (CLIENT, interaction) => {
    if (interaction.isCommand()) {
        SLASH = CLIENT.slash.get(interaction.commandName)
        if (!SLASH) return
        try {
            await SLASH.run(CLIENT, interaction)
        } catch (e) {
            console.error(e)
        }
    }
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case "servers" : {
                EMBED = new EmbedBuilder().setDescription(`## Lista de Servidores\n\`\`\`- ${CLIENT.guilds.cache.map(m => m.name).join('\n- ')}\`\`\``).setColor(process.env.COLOR)
                interaction.reply({ embeds:[EMBED], ephemeral: true})
            } break
        }
    }
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId == "SelecciónMenuAyuda") {
            let embeds = []
            for (FOLDER of interaction.values) {
                ARCHIVOS = FS.readdirSync(`./src/slashcommands/${FOLDER}`).filter(comando => comando.endsWith('.js'))
                EMBED = new EmbedBuilder().setColor(process.env.COLOR).setFooter({ text: `© ${CLIENT.user.username} | 2023 - Presente`, iconURL: CLIENT.user.displayAvatarURL({dynamic: true}) })
                .setDescription(`## ${categ(FOLDER).split(" ")[0]} Comandos de ${categ(FOLDER).split(" ")[1]}\n\`\`\`ansi\n${ARCHIVOS.length >= 1 ? `${color(entablar(ARCHIVOS), "verde")}` : "Todavía no hay comandos en esta categoría."}\`\`\``)
                embeds.push(EMBED)
            }
            interaction.reply({ embeds, ephemeral: true })
        }
    }
}