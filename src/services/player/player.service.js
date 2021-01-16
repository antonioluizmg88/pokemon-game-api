const { PokemonNotFound } = require('../pokemon/errors')

class PlayerService {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.model = player
  }

  /**
   * Find a user by its id
   *
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return this.model.findById(id)
  }

  /**
   * Return a player by a given criteria
   *
   * @param {Object} where
   * @returns {Promise<Player|null>}
   */
  async find(where) {
    return this.model.find(where)
  }

  /**
   * Save a player
   *
   * @param {Player} player
   * @returns {Promise<Player>}
   */
  async save(player) {
    if (!player.id) {
      return this.model.create(player)
    }

    return this.model.update(player)
  }

  /**
   * Remove a player
   *
   * @param {String} id,
   * @returns {Promise<null>}
   */
  async removeById(id) {
    return this.model.findByIdAndDelete(id)
  }

  /**
   * Add a pokemon to a player's pokemon collection
   *
   * @param {Player} player
   * @param {Pokemon} pokemon,
   * @returns {Player}
   */
  async catch(player, pokemon) {
    if (player.carrying.length < 6) {
      player.carrying.push(pokemon)
    } else {
      player.deposit.push(pokemon)
    }

    await this.model.update(player)
    return player
  }

  /**
   * Transfer a pokemon from deposit to carying collection
   *
   * @param {Player} player
   * @param {String} pokemonId
   * @throws PokemonNotFound
   * @returns {Promise<Player>}
   */
  async withrawPokemon(player, pokemonId) {
    const pokemon = player.deposit.find(({ id }) => id === pokemonId)

    if (!pokemon) {
      throw new PokemonNotFound()
    }

    player.carrying.push(pokemon)
    await pokemon.remove()
    await this.model.update(player)
    return player
  }

  /**
   * Transfer a pokemon from player's carrying to deposit collection
   *
   * @param {Player} player
   * @param {String} pokemonId
   * @returns {Player}
   */
  async depositPokemon(player, pokemonId) {
    const pokemon = player.carrying.find(({ id }) => id === pokemonId)

    if (!pokemon) {
      throw new PokemonNotFound()
    }

    player.deposit.push(pokemon)
    await pokemon.remove()
    await this.model.update(player)
    return player
  }
}

module.exports = PlayerService
