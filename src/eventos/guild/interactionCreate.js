const { EmbedBuilder } = require("discord.js")

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
}