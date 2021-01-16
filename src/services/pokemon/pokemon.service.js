const fetch = require('node-fetch')
const { DataSourceUnavailable, PokemonNotFound } = require('./errors')

class PokemonService {
  costructor(pokeapiUrl) {
    this.apiUrl = pokeapiUrl
  }

  /**
   * Return a Pokemon by its name or index
   *
   * @param {String} query
   * @throws DataSourceUnavailable
   * @returns {Promise<Object|null>}
   */
  async find(query) {
    let response

    try {
      response = await fetch(`${this.apiUrl}/pokemon/${query}`)
    } catch (e) {
      throw new DataSourceUnavailable(e.message)
    }

    if (response.status === 404) {
      throw new PokemonNotFound(`No Pokemon found with id or name "${query}"`)
    }

    return response.json()
  }
}

module.exports = PokemonService
