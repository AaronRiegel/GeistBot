const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with ...    ...something'),
    async execute(interaction) {
        await interaction.reply('hi');
    }
}