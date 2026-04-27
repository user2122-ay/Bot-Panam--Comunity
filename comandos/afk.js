const afkUsers = new Map();

module.exports = {
  name: 'afk',

  async execute(message, args) {
    const razon = args.join(' ') || 'Sin razón';

    // Guardar tiempo y razón
    afkUsers.set(message.author.id, {
      razon: razon,
      tiempo: Date.now()
    });

    // Cambiar nickname
    try {
      await message.member.setNickname(`[AFK] ${message.member.displayName}`);
    } catch (e) {
      console.log('No se pudo cambiar el nombre');
    }

    message.reply(`😴 Ahora estás AFK: ${razon}`);
  },

  afkUsers
};
