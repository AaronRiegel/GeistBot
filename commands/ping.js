const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('[PLACEHOLDER_COMMAND]')
        .addStringOption(option => option.setName('input').setDescription('Enter a string'))
        .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
        .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
        .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        .addUserOption(option => option.setName('target').setDescription('Select a user'))
        .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
        .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
        .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
    async execute(interaction) {
        const string = interaction.options.getString('input');
        const integer = interaction.options.getInteger('int');
        const number = interaction.options.getNumber('num');
        const boolean = interaction.options.getBoolean('choice');
        const user = interaction.options.getUser('target');
        const member = interaction.options.getMember('target');
        const channel = interaction.options.getChannel('destination');
        const role = interaction.options.getRole('muted');
        const mentionable = interaction.options.getMentionable('mentionable');
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Test Button')
                    .setStyle('DANGER'),
            );

        await interaction.channel.reply({ content: 'Pong!', components: [row], ephemeral: true });
    }
}