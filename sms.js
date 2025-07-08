require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendSMS(to, body) {
  await client.messages.create({ from: process.env.TWILIO_NUMBER, to, body });
}

module.exports = { sendSMS };
