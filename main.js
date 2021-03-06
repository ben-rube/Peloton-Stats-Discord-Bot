const { Client, Intents } = require('discord.js');
const helpers = require('./helpers');
require('dotenv').config();


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

helpers.InitCommands(client);

helpers.InitEvents(client);

client.login(process.env.DISCORD_TOKEN);
