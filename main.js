const { Client, Intents } = require('discord.js');
const HTTPServer = require('./server/server');
const helpers = require('./helpers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

helpers.InitCommands(client);

helpers.InitEvents(client);

client.login(process.env.DISCORD_TOKEN);

HTTPServer.InitServer(80);