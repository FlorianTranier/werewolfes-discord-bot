const Discord = require('discord.js')

const emojiLetters = ['🇦','🇧','🇨','🇩','🇪','🇫',
            '🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼',
            '🇽','🇾','🇿']

const GameActions = class {

    constructor() {
        this.lifePotion = true
        this.deathPotion = true
    }

    buildVoteMessageContent(players) {
        const emojis = [].concat(emojiLetters)
        let messageContent = ''
        players.forEach(player => {
            messageContent += `${emojis.shift()} - ${player.username}\n`
        })
        return messageContent
    }

    addVoteReactions(voteMessage, numberOfCandidates) {

        for(i = 0; i < numberOfCandidates; i++) {
            voteMessage.react(emojiLetters[i])
        }
    }

    async mayorVote(channel) {
        const voteMessage = await channel.send(`${this.buildVoteMessageContent(channel.players)}`)

        this.addVoteReactions(voteMessage, channel.players.length)
    }

}

module.exports = {
    GameActions
}