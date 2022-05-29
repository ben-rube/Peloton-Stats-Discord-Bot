const { Client, Intents } = require('discord.js');
const StartServer = require('./server/server');
const helpers = require('./helpers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

helpers.InitCommands(client);

helpers.InitEvents(client);

client.login(process.env.DISCORD_TOKENs);

StartServer.InitServer(80);