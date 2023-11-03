ECOSCHEMA = require("../../modelos/economia.js")
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

module.exports = {

    CMD: new SlashCommandBuilder()
    .setDescription("💸 Economía | Visualiza cuánto dinero tiene un usuario.")
    .addUserOption(option => 
        option.setName("user")
        .setDescription("Especifica el usuario o deja en blanco para verte a ti mismo.")
        .setRequired(false)
    ),
    
    run: async (CLIENT, interaction) => {
        USER = interaction.options.getUser("user") ?? interaction.member.user
        if (USER.bot) return interaction.reply({ content:`Los bots no participan en la economía de ${CLIENT.user.username}.`, ephemeral:true })
        if (!USER) return interaction.reply({ content:`El usuario que especificaste no existe.`, ephemeral:true })
        
        ECODATA = await ECOSCHEMA.findOne({ userID: USER.id, guildID: interaction.guild.id })
        ROW = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId("obj").setLabel("Objetivos").setStyle(ButtonStyle.Success), 
            new ButtonBuilder().setCustomId("dep").setLabel("Depositar").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("xp").setLabel("Nivel").setStyle(ButtonStyle.Success), 
            new ButtonBuilder().setCustomId("close").setLabel("✖").setStyle(ButtonStyle.Danger)
        ])
        if (!ECODATA) {
            if (USER.id == interaction.user.id) {
                console.log(`Cargado: Economia de ${USER.id} en ${interaction.guild.id}`.green)
                NEWECODATA = await new ECOSCHEMA({ userID: USER.id, guildID: interaction.guild.id })
                await NEWECODATA.save()
            }
            EMBED = new EmbedBuilder().setThumbnail(USER.displayAvatarURL({dynamic: true})).setColor(process.env.COLOR)
            .setDescription(`## Economía de ${USER.username}\n>>> **Cartera:** 0 ${process.env.MONEDA}\n**Banco:** 0/500 🏦`)
        } else {
            EMBED = new EmbedBuilder().setThumbnail(USER.displayAvatarURL({dynamic: true})).setColor(process.env.COLOR)
            .setDescription(`## Economía de ${USER.username}\n>>> **Cartera:** ${ECODATA.dinero} ${process.env.MONEDA}\n**Banco:** ${ECODATA.banco}/${ECODATA.capacidad_banco} 🏦`)
        }
        
        (USER.id == interaction.user.id) ? await interaction.reply({ embeds: [EMBED], components: [ROW] }) : await interaction.reply({ embeds: [EMBED] })
    }
}