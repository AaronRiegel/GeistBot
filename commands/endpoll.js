const {SlashCommandBuilder} = require("@discordjs/builders");
const Polls = require("../shared/Polls");
const {MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endpoll')
        .setDescription('Ends a poll')
        .addStringOption(option => option.setName('title').setDescription('Enter a title for the poll you wish to end')),
    execute: async function (interaction) {
        const input = interaction.options.getString('title');

        if (input === null) {

            let polls = Polls.get().filter(poll => poll.active === true)?.map(poll => ({
                label: `${poll.title}`,
                description: `Categories: ${poll.categories.map(x => x.name)}`,
                value: `${poll.customId}`,
            })) ?? [];

            if (polls.length === 0) {
                await interaction.reply({content: 'No active polls'});
            } else {


                const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('endpoll')
                            .setPlaceholder('Nothing selected')
                            .setMaxValues(1)
                            .addOptions(polls),
                    );

                await interaction.reply({content: 'Select a poll to end: ', components: [row]});
            }
        } else {
            let pollToBeEnded = Polls.get({title: input.trim()});

            if (Array.isArray(pollToBeEnded)) {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('endpoll')
                            .setPlaceholder('Nothing selected')
                            .setMaxValues(1)
                            .addOptions(pollToBeEnded),
                    );

                await interaction.reply({content: 'Select a poll to end: ', components: [row]});
            } else {
                Polls.get({title: input.trim()}).active = false;
                await interaction.reply({content: `${input} ended.`});
                Polls.dump();
            }
        }

    }
}
