const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Lanza un dado 🎲'),

  async execute(interaction) {
    const numero = Math.floor(Math.random() * 6) + 1;

    const embed = new EmbedBuilder()
      .setColor('#0099FF') // 🔵 azul
      .setAuthor({
        name: `${interaction.user.username} lanzó un dado 🎲`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setDescription(`🎯 **Resultado:** \`${numero}\``)

      // 🖼️ IMAGEN GRANDE (la tuya)
      .setImage('https://cdn.discordapp.com/attachments/1498507131404550226/1498533369804361758/tirada-de-dados-blancos-numero-3-animation-gif-download-9058689.gif?ex=69f18174&is=69f02ff4&hm=0741e882fa25862784e921f6f01fe6fd9758704f350fa5cb777c389d3c8d1808&')

      // 👤 IMAGEN PEQUEÑA (foto del usuario)
      .setThumbnail(interaction.user.displayAvatarURL())

      .addFields(
        { name: '🎮 Jugador', value: `<@${interaction.user.id}>`, inline: true },
        { name: '🎲 Cara obtenida', value: `${numero}`, inline: true }
      )

      .setFooter({
        text: 'PANAMÁ COMMUNITY 507',
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
