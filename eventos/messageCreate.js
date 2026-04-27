const config = require('../config.json');
const axios = require('axios');
const { afkUsers } = require('../comandos/afk');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    // 🔄 QUITAR AFK SI HABLA
    if (afkUsers.has(message.author.id)) {
      afkUsers.delete(message.author.id);

      try {
        await message.member.setNickname(
          message.member.displayName.replace('[AFK] ', '')
        );
      } catch {}

      message.reply('👋 Ya no estás AFK');
    }

    // 👀 DETECTAR SI MENCIONAN A ALGUIEN AFK
    message.mentions.users.forEach(user => {
      if (afkUsers.has(user.id)) {
        const data = afkUsers.get(user.id);
        const tiempo = Math.floor((Date.now() - data.tiempo) / 1000);

        message.reply(
          `⏰ ${user.username} está AFK\n📝 Razón: ${data.razon}\n⌛ Hace: ${tiempo}s`
        );
      }
    });

    // 📌 COMANDOS
    if (message.content.startsWith(config.prefix)) {
      const args = message.content.slice(config.prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = client.commands.get(commandName);
      if (!command) return;

      try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('Error ejecutando comando.');
      }
    }

    // 🧠 IA (opcional)
    if (message.channel.name === config.canalIA) {
      try {
        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: message.content }]
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
          }
        );

        message.reply(res.data.choices[0].message.content);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
