const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
CPUSTAT = require('cpu-stat')
const { color, formatBytes } = require("../../handlers/funciones.js")

module.exports = {

    CMD: new SlashCommandBuilder().setDescription("📊 | Mira las estadísticas del bot"),
    
    run: (CLIENT, interaction) => {
        if (!process.env.OWNERS.includes(interaction.member.id)) return interaction.reply({ content: `Solo los dueños del bot pueden ejecutar este comando.`, ephemeral:true })

        CPUSTAT.usagePercent(function (error, percent) {
            MEMORYUSAGE = formatBytes(process.memoryUsage().heapUsed)
            NODE = process.version
            CPU = percent.toFixed(2)
            CORES = CPUSTAT.totalCores()

            ROW = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setCustomId('servers')
                .setLabel('Servidores')
                .setStyle(ButtonStyle.Success),
            ])

            EMBED = new EmbedBuilder()
            .setDescription('## Informacion del bot')
            .setColor(process.env.COLOR)
            .addFields(
                { name: 'Desarrollador', value: `\`\`\`ansi\n${color("Nevtr4l", "verde")}\`\`\``, inline: true },
                { name: 'Usuario', value: `\`\`\`ansi\n${CLIENT.user.username}\`\`\``, inline: true },
                { name: 'ID', value: `\`\`\`ansi\n${CLIENT.user.id}\`\`\``, inline: true },

                { name: 'Fecha de creacion', value: `<t:1067662800:d>`, inline: true},
                { name: 'Comando de ayuda', value: '</help:1168387301764763719>', inline: true},
                { name: 'Tiempo encendido', value: `<t:${Math.floor((Date.now()-CLIENT.uptime)/1000)}:R>`, inline: true},

                { name: 'Uso de CPU', value: `\`\`\`${CPU} %\`\`\``, inline: true},
                { name: 'Uso de memoria', value: `\`\`\`${MEMORYUSAGE}\`\`\``, inline: true},
                { name: 'Ping del bot', value: `\`\`\`${CLIENT.ws.ping} ms\`\`\``, inline: true},

                { name: 'Version de node', value: `\`\`\`${NODE}\`\`\``, inline: true},
                { name: 'Estoy en', value: `\`\`\`${CLIENT.guilds.cache.size} servidores\`\`\``, inline: true},
                { name: 'Cores', value: `\`\`\`${CORES}\`\`\``, inline: true},
            )

            interaction.reply({ embeds: [EMBED], components:[ROW] })
        })
    }
}