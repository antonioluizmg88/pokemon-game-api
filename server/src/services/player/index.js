const { Player } = require('../../models')
const PlayerService = require('./player.service')

const playerService = new PlayerService(Player)

module.exports = {
  playerService,
}
