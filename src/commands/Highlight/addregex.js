const { Command } = require("klasa");

module.exports = class extends Command {
    constructor (...args) {
        super(...args, {
            runIn: ["text"],
            description: "Adds a regex string to your highlight list",
            usage: "<Regex:str>",
        });
        this.needsMember = true;
    }

    async run (msg, [regex]) {
        if (msg.member.configs.regex_queries.includes(regex)) {
            return msg.send(null, {
                embed: {
                    color: 0xCC0F16,
                    description: `You already have that regex in your regex list!`,
                },
            });
        }
        await msg.member.configs.update("regex_queries", regex);
        msg.guild.addCachedRegex(regex, msg.member);
        return msg.send(null, {
            embed: {
                color: 0x43B581,
                description: `Done! \`${regex}\` has been added to your highlight list.`,
            },
        });
    }
};
