const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const afkUsers = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Ponerte AFK')
    .addStringOption(option =>
      option.setName('razon')
        .setDescription('Razón del AFK')
        .setRequired(false)
    ),

  async execute(interaction) {
    const razon = interaction.options.getString('razon') || 'Sin razón';

    afkUsers.set(interaction.user.id, {
      razon,
      tiempo: Date.now()
    });

    try {
      await interaction.member.setNickname(`[AFK] ${interaction.member.displayName}`);
    } catch {}

    const embed = new EmbedBuilder()
      .setColor('#2b2d31') // color oscuro pro
      .setAuthor({
        name: `${interaction.user.username} está AFK`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setDescription(`💤 **Modo AFK activado**`)
      .addFields(
        { name: '📝 Razón', value: razon, inline: false },
        { name: '⏰ Desde', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
      )
      .setFooter({
        text: 'PANAMÁ COMMUNITY 507',
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  afkUsers
};
