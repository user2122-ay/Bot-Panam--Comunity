const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Lanza un dado 🎲'),

  async execute(interaction) {
    const numero = Math.floor(Math.random() * 6) + 1;

    const embed = new EmbedBuilder()
      .setColor('#00AEEF') // azul bonito
      .setAuthor({
        name: `${interaction.user.username} lanzó un dado 🎲`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setDescription(`🎯 **Resultado:** \`${numero}\``)

      // 🎲 GIF animado de dado
      .setImage('https://media.tenor.com/8rQ7K9gXx1kAAAAC/dice-roll.gif')

      // 🖼️ LOGO DEL SERVER (cámbialo por el tuyo)
      .setThumbnail('https://i.imgur.com/yourlogo.png')

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
