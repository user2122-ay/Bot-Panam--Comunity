const axios = require('axios');

module.exports = {
  name: 'messageCreate', // ⚠️ ESTO NO SE CAMBIA
  async execute(message) {
    if (message.author.bot) return;

    // 🎯 SOLO TU CANAL
    if (message.channel.id !== "1490084237737459915") return;

    if (!message.content) return;

    try {
      const res = await axios.get(
        `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&owner=Anthony&botname=PanamaBot`
      );

      message.reply(res.data.message);

    } catch (error) {
      console.log(error);
      message.reply('❌ Error con la IA gratuita.');
    }
  }
};
