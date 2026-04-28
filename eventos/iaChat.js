const axios = require('axios');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    if (message.channel.id !== "1490084237737459915") return;

    if (!message.content) return;

    try {
      const res = await axios.get(
        `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(message.content)}&owner=Anthony&botname=PanamaBot`
      );

      message.reply(res.data.response);

    } catch (error) {
      console.log(error.response?.data || error.message);
      message.reply('⚠️ La IA no está disponible ahora.');
    }
  }
};
