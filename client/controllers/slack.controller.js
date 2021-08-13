const axios = require('axios');

exports.sendMessage = async (message) => {
    await axios.post(process.env.SLACK_CHAT_WEBHOOKS, {
        text: message
    });
}
