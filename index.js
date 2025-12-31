require('dotenv').config({ path: '.env.local' });

const { Client, Events, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, (client) => {
  console.log('logged on: ', client.user.tag);
});

const urlMap = {
  twitter: {
    link: 'https://x.com',
    fix: 'https://fxtwitter.com'
  },
  reddit: {
    link: 'https://www.reddit.com',
    fix: 'https://vxreddit.com'
  }
};
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const urlChange = (urlSets, msgContent) => {
    const splitContent = msgContent.split(' ');
    const urlIndex = splitContent.findIndex((url) => url.startsWith(urlSets.link));
    splitContent[urlIndex] = splitContent[urlIndex].replace(urlSets.link, urlSets.fix);
    return splitContent.join(' ');
  };

  const sendMessage = (fixedMessage) => {
    message.delete();
    message.channel.send(`${message.author} sent: ${fixedMessage}`);
  };
  const { content } = message;
  if (content.includes('https://x.com')) {
    const fixedMessage = urlChange(urlMap.twitter, content);
    sendMessage(fixedMessage);
  }
  if (content.includes('https://www.reddit.com')) {
    const fixedMessage = urlChange(urlMap.reddit, content);
    sendMessage(fixedMessage);
  }
});

client.login(token);
