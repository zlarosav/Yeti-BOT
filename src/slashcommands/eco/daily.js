ECOSCHEMA = require("../../modelos/economia.js")
DELAYSCHEMA = require("../../modelos/delay.js")
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

module.exports = {

    CMD: new SlashCommandBuilder()
    .setDescription("💸 Economía | Reclama tu recompensa diaria."),
    
    run: async (CLIENT, interaction) => {
        ECODATA = await ECOSCHEMA.findOne({ userID: interaction.user.id, guildID: interaction.guild.id })
        DELAYDATA = await DELAYSCHEMA.findOne({ userID: interaction.user.id, guildID: interaction.guild.id })
        CANTIDAD = Math.floor(Math.random() * 8) + 12 //Máximo: 20 Mínimo: 12
        
        if (!ECODATA || !DELAYDATA) {
            console.log(`Cargado: Economia/Delays de ${interaction.user.id} en ${interaction.guild.id}`.green);
            NEWECODATA = await new ECOSCHEMA({ userID: interaction.user.id, guildID: interaction.guild.id, dinero: CANTIDAD, xp: 10 })
            await NEWECODATA.save()
            NEWDELAYDATA = await new DELAYSCHEMA({ userID: interaction.user.id, guildID: interaction.guild.id, daily: Date.now() })
            await NEWDELAYDATA.save()
        } else {
            if (Date.now() < Number(DELAYDATA.daily) + 24*60*60*1000) return interaction.reply({ content: `Vuelve <t:${Math.round((Number(DELAYDATA.daily)+24*60*60*1000)/1000)}:R> para volver a reclamar la recompensa.`, ephemeral: true })
            await ECOSCHEMA.findOneAndUpdate({ userID: interaction.user.id, guildID: interaction.guild.id }, { $inc: { dinero: CANTIDAD, xp: 10 } })
            await DELAYSCHEMA.findOneAndUpdate({ userID: interaction.user.id, guildID: interaction.guild.id }, { daily: Date.now() })
        }

        ROW = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId("obj").setLabel("Objetivos diarios").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("close").setLabel("✖").setStyle(ButtonStyle.Danger),
        ])
        EMBED = new EmbedBuilder().setThumbnail(interaction.user.displayAvatarURL({dynamic: true})).setColor(process.env.COLOR)
        .setDescription(`### 💰 Recompensa diaria\n**Recibiste:**\n> +${CANTIDAD} ${process.env.MONEDA}\n> +10 puntos de experiencia.\n\nVuelve <t:${Math.round((Date.now()+24*60*60*1000)/1000)}:R>.`)
        interaction.reply({ embeds: [EMBED], components:[ROW] })
    }
}