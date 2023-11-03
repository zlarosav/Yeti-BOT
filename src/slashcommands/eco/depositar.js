ECOSCHEMA = require("../../modelos/economia.js")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    
    CMD: new SlashCommandBuilder()
    .setDescription("💸 Economía | Deposita en el banco para asegurar tus fichas y evitar que te roben.")
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
            return interaction.reply({ embeds: [new EmbedBuilder().setDescription("No tienes fichas para depositar en el banco").setColor(process.env.COLOR)], ephemeral: true })
        } else {
            if (ECODATA.dinero == 0) return interaction.reply({ embeds:[new EmbedBuilder().setColor(process.env.COLOR).setDescription("No tienes fichas para depositar en el banco.")], ephemeral:true })
            if (ECODATA.banco == ECODATA.capacidad_banco) return interaction.reply({ embeds:[new EmbedBuilder().setColor(process.env.COLOR).setDescription("No tienes espacio en tu banco para depositar.")], ephemeral:true })
            if (cantidad > ECODATA.dinero) cantidad = ECODATA.dinero
            cantidad = (cantidad + ECODATA.banco <= ECODATA.capacidad_banco) ? cantidad : ECODATA.capacidad_banco - ECODATA.banco
            await ECOSCHEMA.findOneAndUpdate({ userID: interaction.user.id, guildID: interaction.guild.id }, { $inc: { dinero: -cantidad, banco: cantidad }})
            interaction.reply({ embeds: [
                new EmbedBuilder().setColor(process.env.COLOR)
                .setDescription(`Has depositado **${cantidad}** ${process.env.MONEDA}`)
                .addFields({ name: "Cartera", value: `${ECODATA.dinero - cantidad}`, inline: true }, { name: "Banco", value: `${ECODATA.banco + cantidad}/${ECODATA.capacidad_banco}`, inline: true })
            ] })
        }
    }
}