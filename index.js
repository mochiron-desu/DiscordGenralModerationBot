const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = process.env['DISCORD_TOKEN']

// sign: Mochi

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds]
});




client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}



client.once(Events.ClientReady, () => {
  logChannel = client.channels.cache.get("1097784094076706898")
logChannel.send("Bot Initiated")
  console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction,client,logChannel);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot != true) {
    var message_content = message.content;
    const bad_words = ["bad", "fool", "stupid", "idiot"];
    if (bad_words.some(substring => message_content.includes(substring))) {
      message.delete();
      message.channel.send("That was a bad word")
      console.log(`${message.author.username} said a bad word in ${message.channel.name}`)
      logChannel.send(`${message.author.username} said a bad word in ${message.channel.name}`)
    }
    else if (message_content.toLowerCase().includes("hello")) {
      message.reply(`Hello, ${message.author.username}!`)
    }
  }
})

client.login(token);