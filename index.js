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

// 📦 Colección de comandos
client.commands = new Collection();


// =======================
// 📂 CARGAR COMANDOS
// =======================
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);

  if (!command.data || !command.execute) {
    console.log(`⚠️ El comando ${file} está mal estructurado`);
    continue;
  }

  client.commands.set(command.data.name, command);
}


// =======================
// 📂 CARGAR EVENTOS
// =======================
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./eventos/${file}`);

  if (!event.name || !event.execute) {
    console.log(`⚠️ El evento ${file} está mal estructurado`);
    continue;
  }

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}


// =======================
// ⚡ SLASH COMMAND HANDLER
// =======================
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: '❌ Error ejecutando comando.', ephemeral: true });
    } else {
      await interaction.reply({ content: '❌ Error ejecutando comando.', ephemeral: true });
    }
  }
});


// =======================
// 🚀 BOT READY
// =======================
client.once(Events.ClientReady, () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});


// =======================
// 🔐 LOGIN
// =======================
client.login(process.env.TOKEN);
