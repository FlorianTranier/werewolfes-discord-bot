const gameState = class {

    constructor() {
        this.currentState = 'GAME_STARTED'
    }

    states() {
        let statesMap = new Map()
        // 1st night
        statesMap.set('GAME_STARTED', 'MAYOR_VOTE')
        statesMap.set('MAYOR_VOTE', 'FIRST_NIGHT')
        statesMap.set('FIRST_NIGHT', 'CUPID_TURN')
        statesMap.set('CUPID_TURN', 'LOVERS_TURN')
        statesMap.set('LOVERS_TURN', 'FORTUNE_TELLER_TURN')

        // all other nights
        statesMap.set('FORTUNE_TELLER_TURN', 'WEREWOLVES_TURN')
        statesMap.set('WEREWOLVES_TURN', 'WITCH_TURN')
        statesMap.set('WITCH_TURN', 'DAY')
        statesMap.set('DAY', 'NIGHT_RESULTS')
        statesMap.set('NIGHT_RESULTS', 'VILLAGERS_DEBATE')
        statesMap.set('VILLAGERS_DEBATE', 'VILLAGERS_VOTE')
        statesMap.set('VILLAGERS_VOTE', 'NIGHT')
        statesMap.set('NIGHT', 'FORTUNE_TELLER_TURN')

        return statesMap
    }

    next() {
        this.currentState = this.states().get(this.currentState)
    }
}

module.exports = gameState