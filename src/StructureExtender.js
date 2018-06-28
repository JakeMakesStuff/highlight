const { Structures, Collection } = require("discord.js");

Structures.extend("GuildMember", GuildMember => class HighlightMember extends GuildMember {
	constructor (...args) {
		super(...args);
		this.configs = this.client.gateways.members.get(`${this.guild.id}-${this.id}`, true);
	}
});

Structures.extend("Guild", Guild => class HighlightGuild extends Guild {
	constructor (...args) {
		super(...args);

		/**
		 * A map containing members mapped to certain trigger words
		 * @type {Collection<string, Set<GuildMember>>}
		 */
		this.words = new Collection();

        /**
         * A map containing members mapped to certain regex queries
         * @type {Collection<string, Set<GuildMember>>}
         */
        this.regex_queries = new Collection();
	}

	/**
     * Adds a member to the guild word list
     * @param {string} word
     * @param {GuildMember} member
     * @returns {this}
     * @chainable
     */
    addCachedWord (word, member) {
        const cached = this.words.get(word);
        if (cached) cached.add(member);
        else this.words.set(word, new Set([member]));
        return this;
    }

    /**
     * Removes a member from the guild word list
     * @param {string} word
     * @param {GuildMember} member
     * @returns {this}
     */
    removeCachedWord (word, member) {
        const cached = this.words.get(word);
        if (cached) cached.delete(member);
        if (!cached.size) this.words.delete(word);
        return this;
    }

    /**
     * Adds a member to the guild regex list
     * @param {string} regex
     * @param {GuildMember} member
     * @returns {this}
     * @chainable
     */
    addCachedRegex (regex, member) {
        const cached = this.regex_queries.get(word);
        if (cached) cached.add(member);
        else this.words.set(word, new Set([member]));
        return this;
    }

    /**
     * Removes a member from the guild regex list
     * @param {string} regex
     * @param {GuildMember} member
     * @returns {this}
     */
    removeCachedRegex (regex, member) {
        const cached = this.regex_queries.get(regex);
        if (cached) cached.delete(member);
        if (!cached.size) this.regex_queries.delete(regex);
        return this;
    }
});
