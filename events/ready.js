const command = require("../deploy-commands");


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        command.deployCommands();
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};