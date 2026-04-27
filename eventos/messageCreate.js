const { afkUsers } = require('../comandos/afk');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    // ❌ QUITAR AFK
    if (afkUsers.has(message.author.id)) {
      afkUsers.delete(message.author.id);

      try {
        await message.member.setNickname(
          message.member.displayName.replace('[AFK] ', '')
        );
      } catch {}

      message.reply('👋 Ya no estás AFK');
    }

    // 👀 MENCIONES AFK
    message.mentions.users.forEach(user => {
      if (afkUsers.has(user.id)) {
        const data = afkUsers.get(user.id);
        const tiempo = Math.floor((Date.now() - data.tiempo) / 1000);

        message.reply(
          `⏰ ${user.username} está AFK\n📝 ${data.razon}\n⌛ ${tiempo}s`
        );
      }
    });
  }
};
