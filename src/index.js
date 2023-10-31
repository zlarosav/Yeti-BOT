const { Client, Collection, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus } = require('discord.js');
require("dotenv").config()
require("colors")

CLIENT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ],
    partials: [ Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction ],
    allowedMentions: { parse: ["roles", "users"], repliedUser: false },
    presence: { activities: [{ name: process.env.STATUS, type: ActivityType[process.env.TYPE]}], status: PresenceUpdateStatus.Online }
})

CLIENT.slash = new Collection()
CLIENT.comandos = new Collection()
CLIENT.aliases = new Collection()

FOLDERS = [ "eventos", "commands", "slashcommands"]
FOLDERS.forEach(archivo => {
    try {
        require(`./handlers/${archivo}`)(CLIENT)
    } catch (e) {
        console.error(e)
}})

CLIENT.login(process.env.TOKEN)