const { Command } = require("klasa");

module.exports = class extends Command {
	constructor (...args) {
		super(...args, {
			runIn: ["text"],
			cooldown: 5,
			description: "Clears your highlighted word/reged list",
		});
		this.needsMember = true;
	}

	async run (msg) {
		if (!msg.member.configs.words.length || !msg.member.configs.regex_queries.length) {
			return msg.send(null, {
				embed: {
					color: 0xCC0F16,
					description: `You don't have any words/regex to clear!`,
				},
			});
		}
		if (msg.member.configs.words.length) {
            for (const word of msg.member.configs.words) {
                msg.guild.removeCachedWord(word, msg.member);
            }
        }
        if (msg.member.configs.regex_queries.length) {
            for (const r of msg.member.configs.regex_queries) {
                msg.guild.removeCachedRegex(r, msg.member);
            }
        }
		await msg.member.configs.reset("words", msg.guild);
		return msg.send(null, {
			embed: {
				color: 0x43B581,
				description: `Done! Your highlight list has been cleared!`,
			},
		});
	}
};
