const Polls = require("../shared/Polls");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!(interaction.channel.partial)) {
            console.log(`${interaction.user.tag} interacted.`);
        }

        if (interaction.isButton()) {
            let messageId = interaction.message.id;
            const poll = Polls.get({messageId: messageId})
            if (poll !== undefined) {
                if (poll.active) {
                    const voters = poll.voters;
                    let users = voters.map(v => v.id) ?? [];
                    let userId = interaction.user.id;
                    if (!users.includes(userId)) {
                        Polls.get({messageId: messageId}).voters.push(
                            {
                                id: userId,
                                vote: interaction.customId,
                            });
                        Polls.get({messageId: messageId}).categories.find(cat => cat.name === interaction.customId).value++;
                        interaction.reply({
                            content: `${interaction.user} you voted for "${interaction.customId}"`,
                            success: true,
                            ephemeral: true
                        });
                        setTimeout(Polls.dump, 5000);
                    } else {
                        interaction.reply({
                            content: `Invalid action: ${interaction.user} you have already voted for "${Polls.get({messageId: messageId}).voters.find(x => x.id === userId).vote}"`,
                            success: true,
                            ephemeral: true
                        });
                    }
                }
            }
        } else if (interaction.isSelectMenu()) {
            if (interaction.customId === 'endpoll') {

                let selectedPollId = interaction.values[0];

                Polls.get({messageId: interaction.message.id, pollId: selectedPollId}).active = false;

                await interaction.update({content: `Ended ${Polls.get({pollId: selectedPollId}).title}`, components: [], success: true});

                Polls.dump();
            }

        }
    },
};

