const { REST, Routes} = require("discord.js");

const commands = [
    {
        name: "create",
        description: "Creates a new short url",
    }
];

const rest = new REST({ version: "10" }).setToken(
    "MTE4Mjk1NTI2NTE4MDU4NjAzNA.GkDL5Z.4jMW20FISCjrRQ4p70aUFTMSfFvMv9ndBrO-T0"
);

(async () => {
    try {
      console.log("Started refreshing application (/) commands.");
  
      await rest.put(Routes.applicationCommands("1182955265180586034"), {
        body: commands,
      });
  
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();