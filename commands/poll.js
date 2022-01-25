const {MessageActionRow, MessageButton} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");
const Polls = require("../shared/Polls");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll.')
        .addStringOption(option => option.setName('title').setDescription('Enter a title for the poll'))
        .addStringOption(option => option.setName('categories').setDescription('Enter a categories separated by commas <,>'))
        .addStringOption(option => option.setName('duration').setDescription('Enter the duration of the poll in milliseconds lol')),
    async execute(interaction) {
        const input = interaction.options.getString('categories')?.split(",") ?? [];
        const title = interaction.options.getString('title') ?? "Poll";
        const duration = parseInt(interaction.options.getString('duration') ?? "900000");

        let categories = new Set(input);

        if (categories?.size > 5) {
            await interaction.reply({content: `${interaction.user}, polls cannot exceed five categories`});
        } else if (categories?.size < 2) {
            if (categories.size === 0) {
                await helpMakeNewPoll(interaction);
            } else {
                await interaction.reply({content: `${interaction.user}, polls cannot have less than two categories`});
            }
        } else {
            let buttonRow = new MessageActionRow();
            let savedCategories = [];

            categories.forEach(category => {
                category.trim();
                buttonRow.addComponents(
                    new MessageButton()
                        .setCustomId(`${category}`)
                        .setLabel(`${category}`)
                        .setStyle(`PRIMARY`),
                );

                savedCategories.push({name: category, value: 0});
            });

            interaction.reply({content: `**${title}**`, components: [buttonRow], fetchReply: true, success: true})
                .then(e => Polls.add({
                    messageId: e.id,
                    title: title,
                    categories: savedCategories,
                    duration: duration,
                    active: true,
                    voters: [

                    ]
                }));


        }
    }
}

async function helpMakeNewPoll(interaction) {
    let buttonRow = new MessageActionRow();

    buttonRow.addComponents(
        new MessageButton()
            .setCustomId('Yes')
            .setLabel('Yes')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('No')
            .setLabel('No')
            .setStyle('DANGER'),
    );

    await interaction.reply({content: "Do you want to make a poll?", components: [buttonRow], ephemeral: true});

    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000, max: 1 });

    collector.on('collect', async i => {
        buttonRow.components.forEach(button => button.setDisabled(true));
        await i.update({ content: `Do you want to make a poll? (Answered: ${i.customId})`, components: [buttonRow]});
        if (i.customId === 'Yes') {
            await i.followUp({content: `${i.user} clicked on the yes button.`, ephemeral: true});
        } else {
            await i.followUp({content: `${i.user} clicked on the no button.`, ephemeral: true});
        }

    });

    collector.on('end', async collected => {
        console.log(`Collected ${collected.size} interactions.`);
    });
}