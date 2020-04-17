const Roles = {
    VILLAGER: {
        name: 'Villager',
        minPlayers: 1
    },
    WEREWOLF: {
        name: 'Werewolf',
        minPlayers: 1
    },
    WITCH: {
        name: 'Witch',
        minPlayers: 1
    },
    FORTUNE_TELLER: {
        name: 'Fortune Teller',
        minPlayers: 1
    },
    HUNTER: {
        name: 'Hunter',
        minPlayers: 8
    },
    CUPID: {
        name: 'Cupid',
        minPlayers: 7
    },
    MAYOR: {
        name: 'Mayor',
        minPlayers: 1
    }
}

const getRoles = async (numJoueurs) => {
    const rolesToGive = []
    for (i = 1; i <= 0.25 * numJoueurs; i++) {
        rolesToGive.push(Roles.WEREWOLF)
    }
    rolesToGive.push(Roles.WITCH)
    rolesToGive.push(Roles.FORTUNE_TELLER)
    if (numJoueurs >= Roles.CUPID.minPlayers) {
        rolesToGive.push(Roles.CUPID)
    }
    if (numJoueurs >= Roles.HUNTER.minPlayers) {
        rolesToGive.push(Roles.HUNTER)
    }

    while (rolesToGive.length < numJoueurs) {
        rolesToGive.push(Roles.VILLAGER)
    }

    return rolesToGive
}

module.exports = {
    Roles,
    getRoles
}