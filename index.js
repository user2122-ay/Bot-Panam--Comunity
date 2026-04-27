require('dotenv').config();

const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// 📂 Cargar comandos slash
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.data.name, command);
}

// ⚡ Evento interactionCreate (slash)
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Error ejecutando comando.', ephemeral: true });
  }
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
