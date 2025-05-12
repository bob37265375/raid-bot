const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json'); // Make sure to have a config.json file with your bot token

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log('Bot is online!');
});

// Replace 'channelID' with the ID of the channel where you want to send the messages
const CHANNEL_ID = '1366868329448345651';

// Function to send a certain number of messages
async function sendMessages(channel, numberOfMessages) {
    for (let i = 1; i <= numberOfMessages; i++) {
        await channel.send(`Message #${i}`);
        // Add a small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

client.on('messageCreate', async (message) => {
    // Check if the message starts with "!send" and is sent by a user (not the bot)
    if (message.content.startsWith('!send') && !message.author.bot) {
        const args = message.content.split(' ');

        if (args.length === 2 && !isNaN(args[1])) {
            const numberOfMessages = parseInt(args[1], 10);

            if (numberOfMessages > 0) {
                const channel = message.guild.channels.cache.get(CHANNEL_ID);
                if (channel) {
                    await sendMessages(channel, numberOfMessages);
                } else {
                    message.reply('Could not find the specified channel.');
                }
            } else {
                message.reply('Please enter a valid number of messages to send.');
            }
        } else {
            message.reply('Usage: !send <number>');
        }
    }
});

client.login(token);
