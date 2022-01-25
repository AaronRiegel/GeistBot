const Polls = require("../shared/Polls");

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!(interaction.channel.partial)) {
                console.log(`${interaction.user.tag} interacted.`);
        }

        if (interaction.isButton()) {
            const poll = Polls.get(interaction.message.id)
            if ( poll !== undefined) {
                const voters = poll.voters;
                let users = voters.map(v => v.id) ?? [];
                if (poll.active) {
                    if (!users.includes(interaction.user.id)) {
                        //add the user to the list of users who already voted. Too tired right now.
                        interaction.reply({
                            content: `${interaction.user} interacted with ${interaction.customId} on poll: ${poll.title}`,
                            success: true
                        });


                    }
                }
            }
        }
    },
};

