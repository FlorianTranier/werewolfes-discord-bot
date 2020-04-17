require('dotenv').config()
const Discord = require('discord.js')

const {Roles, getRoles} = require('./roles')
const {GameActions} = require('./gameActions')
const Player = require('./player')
const GameState = require('./gameState')

const client = new Discord.Client()

client.on('ready', () => {
    console.log('I am ready !')
})

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

client.on('message', async (message) => {    
    if (message.content === '-playwf') {
        message.channel.send(`Who wants to play werewolves ? Type -join if you want`)

        message.channel.players = []
        message.channel.players.push(new Player(message.author.id, message.author.username))

        message.channel.state = new GameState()
    }

    if (message.content === '-join') {
        if (message.channel.players.map(player => player.discordId).includes(message.author.id)) return
        message.channel.players.push(new Player(message.author.id, message.author.username))
        message.react('✅')
    }

    if (message.content === '-launch') {
        /*if (message.channel.players.length < 5) {
            message.channel.send(`You have to be at least 5 to play !`)
            return
        }*/

        shuffleArray(message.channel.players)
        const roles = await getRoles(message.channel.players.length)
        message.channel.players.forEach(player => {
            player.roles.push(roles.shift())
        })

        // GAME START
        const gameState = new GameState()
        const gameActions = new GameActions()
        gameState.next()
        // while (!winCondition) {
            switch (gameState.currentState) {
                case 'MAYOR_VOTE':
                    gameActions.mayorVote(message.channel)
                    gameState.next()
                    break;
            
                default:
                    break;
            }
        // }
    }
    

})

client.login(process.env.BOT_TOKEN)