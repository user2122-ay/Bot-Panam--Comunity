const { SlashCommandBuilder } = require('discord.js');

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

    await interaction.reply(`😴 Estás AFK: ${razon}`);
  },

  afkUsers
};
