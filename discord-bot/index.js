const { Client, GatewayIntentBits} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split("create")[1]
        return message.reply({
            content: "Generating Short ID for" + url,
        })
    }
  message.reply({
    content: "Hi From Bot",
  })
});

client.on('interactionCreate', (interaction)=> {
    console.log(interaction);
    interaction.reply("pong!!");
})

client.login(
  "MTE4Mjk1NTI2NTE4MDU4NjAzNA.GkDL5Z.4jMW20FISCjrRQ4p70aUFTMSfFvMv9ndBrO-T0"
);
