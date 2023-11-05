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
            SLASH = SLASH_LISTA.find(c => c.name == COMANDO_OPTION)
            COMANDO_PREFIJO = CLIENT.comandos.get(COMANDO_OPTION.toLowerCase()) || CLIENT.comandos.find(c => c.aliases && c.aliases.includes(COMANDO_OPTION.toLowerCase()))
            ALIASES = (COMANDO_PREFIJO && COMANDO_PREFIJO.aliases && COMANDO_PREFIJO.aliases.length >= 1) ? COMANDO_PREFIJO.aliases.slice(0, 5).join(", ") : "No hay otros nombres para este comando."
            if (SLASH) {
                EMBED = new EmbedBuilder().setColor(process.env.COLOR).setFooter({ text: `© ${CLIENT.user.username} | 2023 - Presente`, iconURL: CLIENT.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`# ${SLASH.description.split(" | ")[0].split(" ")[0]} Comando </${SLASH.name}:${SLASH.id}>`)
                .addFields(
                    { name: "📚 Categoría", value: `\`\`\`ansi\n${color(SLASH.description.split(" | ")[0].split(" ")[1], "verde")}\`\`\``, inline: true},
                    { name: "🎫 Otros nombres", value: `\`\`\`ansi\n${color(ALIASES, "verde")}\`\`\``, inline: true},
                    { name: "📦 Descripción de uso del comando", value: `\`\`\`ansi\n${color(SLASH.description.split(" | ")[1], "verde")}\`\`\``, inline: false}
                )
                interaction.reply({ embeds: [EMBED] })
            } else {
                interaction.reply({ content: "El comando especificado no existe.", ephemeral: true })
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
                {name: "▾ 📦 **Más información**", value: `[Servidor de Soporte](${process.env.SOPORTE}) | [GitHub (Open Source)](${process.env.REPOSITORIO}) | [Invítame a tu servidor](${process.env.INVITE})`, inline: false}
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
            })))
            interaction.reply({ embeds: [EMBED], components: [SELECCION] })
        }
    }
}