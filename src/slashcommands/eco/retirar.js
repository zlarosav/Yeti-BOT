ECOSCHEMA = require(`../../modelos/economia.js`)
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {

    CMD: new SlashCommandBuilder()
    .setDescription("💸 Economía | Retira fichas del banco para realizar compras en la tienda.")
    .addIntegerOption(option => 
        option.setName("cantidad")
        .setDescription("Especifica la cantidad que deseas depositar en el banco.")
        .setRequired(true)
        .setMinValue(1)
    ),

    run: async (CLIENT, interaction) => {
        ECODATA = await ECOSCHEMA.findOne({ userID: interaction.user.id, guildID: interaction.guild.id })
        let cantidad = interaction.options.getInteger("cantidad")
        if (!ECODATA) {
            return interaction.reply({ embeds: [new EmbedBuilder().setDescription("No tienes fichas para retirar del banco").setColor(process.env.COLOR)], ephemeral: true })
        } else {
            if (ECODATA.banco == 0) return interaction.reply({ embeds:[new EmbedBuilder().setColor(process.env.COLOR).setDescription("No tienes fichas para retirar del banco.")], ephemeral:true })
            if (cantidad > ECODATA.banco) cantidad = ECODATA.banco
            await ECOSCHEMA.findOneAndUpdate({ userID: interaction.user.id, guildID: interaction.guild.id }, { $inc: { dinero: cantidad, banco: -cantidad }})
            interaction.reply({ embeds: [
                new EmbedBuilder().setColor(process.env.COLOR)
                .setDescription(`Has retirado **${cantidad}** ${process.env.MONEDA}`)
                .addFields({ name: "Cartera", value: `${ECODATA.dinero + cantidad}`, inline: true }, { name: "Banco", value: `${ECODATA.banco - cantidad}/${ECODATA.capacidad_banco}`, inline: true })
            ] })
        }
    }
}