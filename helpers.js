const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

function InitCommands(client) {
	client.commands = new Collection();
	// const commandsPath = path.join(__dirname, 'commands');
	// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	const result = getFilePaths('commands');
	for (const file of result.files) {
		const filePath = path.join(result.filePaths, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}

function InitEvents(client) {
	const result = getFilePaths('events');
	for (const file of result.files) {
		const filePath = path.join(result.filePaths, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}

}


function getFilePaths(dir) {
	const filePaths = path.join(__dirname, dir);
	const files = fs.readdirSync(filePaths).filter(file => file.endsWith('.js'));
	return { files, filePaths };
}

module.exports = {
	InitCommands,
	InitEvents,
};