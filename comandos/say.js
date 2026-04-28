const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// 👮 IDs permitidos
const allowedUsers = [
  "1237774088039170170",
  "1352770661805719552"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Enviar un mensaje como el bot')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Canal donde enviar el mensaje')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('Contenido del mensaje')
        .setRequired(true)
    ),

  async execute(interaction) {

    // 🚫 Permisos
    if (!allowedUsers.includes(interaction.user.id)) {
      return interaction.reply({
        content: '❌ No tienes permiso para usar este comando.',
        ephemeral: true
      });
    }

    const canal = interaction.options.getChannel('canal');
    const mensaje = interaction.options.getString('mensaje');

    // 🎨 Embed bonito
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setDescription(mensaje)
      .setFooter({
        text: `Enviado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp();

    try {
      await canal.send({ embeds: [embed] });

      await interaction.reply({
        content: '✅ Mensaje enviado correctamente.',
        ephemeral: true
      });

    } catch (error) {
      console.error(error);

      await interaction.reply({
        content: '❌ No se pudo enviar el mensaje.',
        ephemeral: true
      });
    }
  }
};
