jest.mock('node-fetch')

const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const PokemonService = require('../../../../services/pokemon/pokemon.service')
const {
  DataSourceUnavailable,
  PokemonNotFound,
} = require('../../../../services/pokemon/errors')

describe('PokemonService', () => {
  const pokemonService = new PokemonService('http://localhost')

  beforeAll(() => {
    fetch.mockReset()
  })

  describe('find', () => {
    it('should return a Pokemon by its index', async () => {
      const index = 777
      fetch.mockReturnValue(new Response(JSON.stringify({ index })))
      const pokemon = await pokemonService.find(index)
      expect(pokemon).toMatchObject({ index })
    })

    it('should return a Pokemon by its name', async () => {
      const name = 'Butterfree'
      fetch.mockReturnValue(new Response(JSON.stringify({ name })))
      const pokemon = await pokemonService.find(name)
      expect(pokemon).toMatchObject({ name })
    })

    it('should return DataSourceUnavailable if Pokeapi is not reachable', async () => {
      fetch.mockRejectedValue(new Error())
      expect(pokemonService.find('charmander')).rejects.toThrow(
        DataSourceUnavailable
      )
    })

    // TODO Is this .rejects working?
    it('should return PokemonNotFound', async () => {
      fetch.mockReturnValue({
        ...new Response(),
        status: 404,
      })
      expect(pokemonService.find('Agumon')).rejects.toThrow(PokemonNotFound)
    })
  })
})
