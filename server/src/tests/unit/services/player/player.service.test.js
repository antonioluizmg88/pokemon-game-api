jest.mock('../../../../models/player.model')

const { Player } = require('../../../../models')
const { PokemonNotFound } = require('../../../../services/pokemon/errors')
const PlayerService = require('../../../../services/player/player.service')

describe('PlayerService', () => {
  const playerService = new PlayerService(Player)

  beforeAll(() => {
    Player.mockReset()
  })

  describe('findById', () => {
    it('should return a player by its id', async () => {
      const id = 777
      Player.findById.mockReturnValue({ id })
      const result = await playerService.findById(id)
      expect(result).toMatchObject({ id })
    })

    it('should return null if player does not exist', async () => {
      Player.findById.mockReturnValue(null)
      const result = await playerService.findById(777)
      expect(result).toBeNull()
    })
  })

  describe('find', () => {
    it('should return a player by a criteria', async () => {
      const name = 'Ash'
      Player.find.mockReturnValue([{ name }])
      const result = await playerService.find(name)
      expect(result).toEqual(expect.arrayContaining([{ name }]))
    })

    it('should return an empty array', async () => {
      Player.find.mockReturnValue([])
      const result = await playerService.find({ name: 'Ash' })
      expect(result).toStrictEqual([])
    })
  })

  describe('save', () => {
    it('should create a new player', async () => {
      const player = {
        name: 'Ash',
      }
      Player.create.mockReturnValue(player)
      const result = await playerService.save(player)
      expect(result).toMatchObject(player)
      expect(Player.create).toHaveBeenCalledWith(player)
    })

    it('should save a player', async () => {
      const player = {
        id: 777,
        name: 'Ash',
      }
      Player.update.mockReturnValue(player)
      const result = await playerService.save(player)
      expect(result).toMatchObject(player)
      expect(Player.update).toHaveBeenCalledWith(player)
    })
  })

  describe('removeById', () => {
    it('should delete a player', async () => {
      const id = 777
      Player.findByIdAndDelete.mockReturnValue(null)
      const result = await playerService.removeById(id)
      expect(Player.findByIdAndDelete).toHaveBeenCalledWith(id)
      expect(result).toBeNull()
    })
  })

  describe('catch', () => {
    it('should add a new Pokemon to the carrying collection', async () => {
      const pokemon = {
        name: 'chamander',
      }
      const player = {
        carrying: [],
      }
      const result = await playerService.catch(player, pokemon)
      expect(player.carrying.length).toBe(1)
      expect(player.carrying[0]).toMatchObject(pokemon)
      expect(Player.update).toHaveBeenCalled()
      expect(result).toMatchObject({
        carrying: expect.any(Array),
      })
    })

    it('should add a new Pokemon to the deposit collection if player is carrying more up to 6 Pokemons', async () => {
      const charmander = {
        name: 'chamander',
      }
      const butterfree = {
        name: 'butterfree',
      }
      const player = {
        carrying: [
          charmander,
          charmander,
          charmander,
          charmander,
          charmander,
          charmander,
        ],
        deposit: [],
      }
      const result = await playerService.catch(player, butterfree)
      expect(player.deposit.length).toBe(1)
      expect(player.deposit[0]).toMatchObject(butterfree)
      expect(Player.update).toHaveBeenCalled()
      expect(result).toMatchObject({
        carrying: expect.any(Array),
        deposit: expect.any(Array),
      })
    })
  })

  describe('withdraw', () => {
    it('should transfer a Pokemon from deposit to carrying', async () => {
      const pokemon = {
        id: 12,
        remove: jest.fn(),
      }
      const player = {
        carrying: [],
        deposit: [pokemon],
      }
      const result = await playerService.withrawPokemon(player, pokemon.id)
      expect(player.carrying.length).toBe(1)
      expect(player.carrying[0]).toMatchObject(pokemon)
      expect(pokemon.remove).toHaveBeenCalled()
      expect(Player.update).toHaveBeenCalled()
      expect(result).toMatchObject({
        carrying: expect.any(Array),
        deposit: expect.any(Array),
      })
    })

    it('should return PokemonNotFound if Pokemon does not exist', async () => {
      const player = {
        deposit: [],
      }
      expect(playerService.withrawPokemon(player, 666)).rejects.toThrow(
        PokemonNotFound
      )
    })
  })

  describe('deposit', () => {
    it('should transfer a pokemon from carrying to deposit', async () => {
      const pokemon = {
        id: 12,
        remove: jest.fn(),
      }
      const player = {
        carrying: [pokemon],
        deposit: [],
      }
      const result = await playerService.depositPokemon(player, pokemon.id)
      expect(player.deposit.length).toBe(1)
      expect(player.deposit[0]).toMatchObject(pokemon)
      expect(pokemon.remove).toHaveBeenCalled()
      expect(Player.update).toHaveBeenCalled()
      expect(result).toMatchObject({
        carrying: expect.any(Array),
        deposit: expect.any(Array),
      })
    })

    it.skip('should return PokemonNotFound', async () => {
      const player = {
        carrying: [],
      }
      expect(playerService.depositPokemon(player, 666)).rejects.toThrow(
        PokemonNotFound
      )
    })
  })
})
