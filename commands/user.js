const { SlashCommandBuilder } = require('@discordjs/builders');
const PtonHandlers = require('../pton_handlers/get_summary');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('gets basic user info')
		.addStringOption(option =>
			option.setName('user-name')
				.setDescription('user name of the pton account')
				.setRequired(true)),
	async execute(interaction) {
		const userID = interaction.options.getString('user-name');
		(async () => {
			try {
				const response = await PtonHandlers.GetUser(userID);
				const date = new Date(0);
				const workouts = [];
				date.setUTCSeconds(response.data['created_at']);

				// Generate workout catagories and counts
				for (const workout_type of response.data['workout_counts']) {
					workouts.push({ name: workout_type['name'], value: workout_type['count'].toString(), inline:true });
				}

				const responseEmbed = await new MessageEmbed()
					.setColor('#43D1E1')
					.setTitle(response.data['username'])
					.addFields(
						{ name: 'Total Workouts', value: response.data['total_workouts'].toString() },
						workouts,
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Weekly Streak', value: response.data['streaks']['current_weekly'].toString() },
						{ name: 'Accounted Created', value: date.toString() },
					);
				return interaction.reply({ embeds: [responseEmbed] });
			}
			catch (error) {
				console.log(error);
				return interaction.reply('error getting user');
			}

		})();

	},
};
