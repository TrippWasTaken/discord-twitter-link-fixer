require('dotenv').config({ path: '.env.local' });

const { Client, Events, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, (client) => {
  console.log('logged on: ', client.user.tag);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const { content } = message;
  if (content.includes('https://x.com')) {
    const splitContent = content.split(' ');
    const url = splitContent.findIndex((url) => url.startsWith('https://x.com'));
    splitContent[url] = splitContent[url].replace('https://x.com', 'https://fxtwitter.com');
    const fixedMessage = splitContent.join(' ');
    message.delete();
    message.channel.send(`${message.author} sent: ${fixedMessage}`);
  }
});

client.login(token);
