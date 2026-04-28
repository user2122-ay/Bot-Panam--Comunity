const { afkUsers } = require('../comandos/afk');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    // ❌ QUITAR AFK
    if (afkUsers.has(message.author.id)) {
      const data = afkUsers.get(message.author.id);
      afkUsers.delete(message.author.id);

      try {
        await message.member.setNickname(
          message.member.displayName.replace('[AFK] ', '')
        );
      } catch {}

      const tiempo = Math.floor((Date.now() - data.tiempo) / 1000);

      const embed = new EmbedBuilder()
        .setColor('#57F287') // verde
        .setAuthor({
          name: `${message.author.username} volvió`,
          iconURL: message.author.displayAvatarURL()
        })
        .setDescription('👋 **Ya no estás AFK**')
        .addFields(
          { name: '📝 Razón anterior', value: data.razon, inline: false },
          { name: '⏳ Tiempo AFK', value: `<t:${Math.floor((Date.now() - tiempo * 1000)/1000)}:R>`, inline: true }
        )
        .setFooter({ text: 'PANAMÁ COMMUNITY 507' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    }

    // 👀 MENCIONES AFK
    message.mentions.users.forEach(user => {
      if (afkUsers.has(user.id)) {
        const data = afkUsers.get(user.id);

        const embed = new EmbedBuilder()
          .setColor('#ED4245') // rojo
          .setAuthor({
            name: `${user.username} está AFK`,
            iconURL: user.displayAvatarURL()
          })
          .setDescription('🚫 **No está disponible**')
          .addFields(
            { name: '📝 Razón', value: data.razon, inline: false },
            { name: '⏰ Desde', value: `<t:${Math.floor(data.tiempo / 1000)}:R>`, inline: true }
          )
          .setFooter({ text: 'PANAMÁ COMMUNITY 507' })
          .setTimestamp();

        message.reply({ embeds: [embed] });
      }
    });
  }
};
