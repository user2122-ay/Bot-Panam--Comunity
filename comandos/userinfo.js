const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Ver información de un usuario')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Usuario a consultar')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const roles = member.roles.cache
      .filter(role => role.id !== interaction.guild.id)
      .map(role => role.toString())
      .join(', ') || 'Ninguno';

    const embed = new EmbedBuilder()
      .setColor('#00AEEF') // 🔵 azul bonito
      .setAuthor({
        name: `${user.username}`,
        iconURL: user.displayAvatarURL()
      })
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '🤖 Bot', value: user.bot ? 'Sí' : 'No', inline: true },
        { name: '📅 Cuenta creada', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false },
        { name: '📥 Se unió al servidor', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false },
        { name: '🎭 Roles', value: roles, inline: false }
      )
      .setFooter({
        text: 'PANAMÁ COMMUNITY 507'
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
