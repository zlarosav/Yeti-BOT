const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const { color, categ, entablar } = require("../../handlers/funciones.js")
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
            CATEGORIAS = FS.readdirSync(`./src/slashcommands`)
            EMBED = new EmbedBuilder().setColor(process.env.COLOR).setFooter({ text: `© ${CLIENT.user.username} | 2023 - Presente`, iconURL: CLIENT.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`## ¡Hola, ${interaction.user.username}! 👋\n¿Todavía no nos han presentado? Mi nombre es **${CLIENT.user.username}**. Soy un bot dedicado a llevar **diversión** a tus días. Para lograr esto, te ofrezco un agradable sistema multiserver de **economía** y **niveles.**`)
            .addFields(
                {name: "▾ 📚 **Mis categorías de comandos**", value: `\`\`\`ansi\n${color(entablar(CATEGORIAS), "verde")}\`\`\``, inline: false},
                {name: `▾ 📊 **Comandos prefijo \`[ ${process.env.PREFIJO} ]\`**`, value: `\`\`\`ansi\n${color(`- ${CLIENT.comandos.size} comandos`, "verde")}\`\`\``, inline: true},
                {name: "▾ 🧨 **Comandos slash \`[ / ]\`**", value: `\`\`\`ansi\n${color(`- ${SLASH_LISTA.size} slashcommands`, "verde")}\`\`\``, inline: true},
                {name: "▾ 🎫 **Ayuda de comandos**", value: `También puedes aprender más acerca de un comando escribiendo:\`\`\`ansi\n${color(`/help [comando] | >>> Ejemplo: /help ${SLASH_LISTA.toJSON()[Math.floor(Math.random() * (SLASH_LISTA.size-1))].name} <<<`, "verde")}\`\`\``, inline: false},
                {name: "▾ 📦 **Más información**", value: `[Servidor de Soporte](${process.env.SOPORTE}) | [GitHub (Open Source)](${process.env.REPOSITORIO}) | [Invítame a tu servidor](${process.env.INVITE})`, inline: false},
            )
            SELECCION = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
            .setCustomId(`SelecciónMenuAyuda`).setPlaceholder("Elige una categoría para ver sus comandos")
            //.setMaxValues(5).setMinValues(1)
            .addOptions(CATEGORIAS.map(categoria => {
                OBJETO = {
                    label: categ(categoria).split(" ")[1],
                    value: categoria,
                    description: `Mira los comandos de ${categ(categoria).split(" ")[1]}`,
                    emoji: categ(categoria).split(" ")[0],
                }
                return OBJETO
            }))
        )
            interaction.reply({ embeds: [EMBED], components: [SELECCION] })
        }
    }
}