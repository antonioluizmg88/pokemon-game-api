jest.mock('node-fetch')
jest.mock('../../../db', () => ({
  connectToMongoDb: jest.fn(),
}))

const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const { Player } = require('../../../models')
const request = require('supertest')
const app = require('../../../app')
const charmander = {
  id: 7,
  name: 'Charmander',
}
let player
let butterfree

jest.mock('../../../models')

describe('player', () => {
  beforeEach(() => {
    player = {
      name: 'Ash',
      gender: 'M',
      pokemons: {
        carrying: [],
        deposit: [],
      },
    }
    butterfree = {
      _id: '12',
      remove: jest.fn(),
    }
  })

  describe('get players', () => {
    it('should return all players', () => {
      Player.find.mockImplementationOnce(() => Promise.resolve([player]))

      return request(app)
        .get('/players')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(body).toEqual(expect.arrayContaining([player]))
        })
    })
  })

  describe('get player', () => {
    it('should return 404 if user does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(null))

      return request(app)
        .get('/player/1')
        .then((response) => {
          expect(response.statusCode).toBe(404)
        })
    })

    it('should return 500 if an error occur', () => {
      Player.findById.mockImplementationOnce(() => {
        throw new Error()
      })

      return request(app)
        .get('/player/1')
        .then((response) => {
          expect(response.statusCode).toBe(500)
        })
    })

    it('should return a player', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(player))

      return request(app)
        .get('/player/1')
        .then((response) => {
          expect(response.statusCode).toBe(200)
          expect(response.body).toMatchObject({
            name: expect.any(String),
            gender: expect.any(String),
            pokemons: {
              carrying: expect.any(Array),
              deposit: expect.any(Array),
            },
          })
        })
    })
  })

  describe('create player', () => {
    it.skip('should create a player', () => {
      const { name, gender } = player

      return request(app)
        .post('/player')
        .send(player)
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(body).toMatchObject({
            name,
            gender,
          })
        })
    })
    it.todo('should return 500 if an error occur')
  })

  describe('update player', () => {
    it('should update a player', () => {
      const updatedPlayer = {
        name: 'Gary',
      }

      Player.findByIdAndUpdate.mockImplementationOnce(() =>
        Promise.resolve({
          ...player,
          ...updatedPlayer,
        })
      )

      return request(app)
        .put('/player/1')
        .send(updatedPlayer)
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(body).toMatchObject({
            name: updatedPlayer.name,
          })
        })
    })

    it('should return 404 if player does not exist', () => {
      Player.findByIdAndUpdate.mockImplementationOnce(() =>
        Promise.resolve(null)
      )

      return request(app)
        .put('/player/1')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 500 if an error occur', () => {
      Player.findByIdAndUpdate.mockImplementationOnce(() => {
        throw new Error()
      })

      return request(app)
        .put('/player/1')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500)
        })
    })
  })

  describe('remove player', () => {
    it('should remove a player', () => {
      const playerToBeRemoved = {
        remove: jest.fn(),
      }
      Player.findById.mockImplementationOnce(() => playerToBeRemoved)

      return request(app)
        .delete('/player/1')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(204)
          expect(playerToBeRemoved.remove).toHaveBeenCalled()
        })
    })

    it('should return 404 if player does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(null))

      return request(app)
        .delete('/player/1')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 500 if an error occur', () => {
      Player.findById.mockImplementationOnce(() => ({
        remove: () => {
          throw new Error()
        },
      }))

      return request(app)
        .delete('/player/1')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500)
        })
    })
  })

  describe('catch a pokemon', () => {
    it('should add a pokemon to the given player', () => {
      player.save = jest.fn()
      Player.findById.mockReturnValueOnce(player)
      fetch.mockReturnValueOnce(new Response(JSON.stringify(charmander)))

      return request(app)
        .post('/player/1/pokemons/12')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(player.save).toHaveBeenCalled()
          expect(body.pokemons.deposit).toEqual(
            expect.arrayContaining([
              {
                index: charmander.id,
                name: charmander.name,
                metadata: charmander,
              },
            ])
          )
        })
    })

    it('should return 404 if player does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(null))

      return request(app)
        .post('/player/1/pokemons/12')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 404 if the pokemon does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(player))
      fetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Response(),
          status: 404,
        })
      )

      return request(app)
        .post('/player/1/pokemons/12')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 500 if pokeapi returns a error code', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(player))
      fetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Response(),
          status: 503,
        })
      )

      return request(app)
        .post('/player/1/pokemons/12')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(500)
        })
    })

    it('should return 500 if pokeapi is unreachable', () => {
      Player.findById.mockReturnValueOnce(player)
      fetch.mockRejectedValueOnce(new Error())

      return request(app)
        .post('/player/1/pokemons/12')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500)
        })
    })
  })

  describe('withdraw', () => {
    it('should successfuly withdraw a pokemon', () => {
      const localPlayer = {
        ...player,
        pokemons: {
          deposit: [butterfree],
          carrying: [],
        },
        save: jest.fn(),
      }

      Player.findById.mockImplementationOnce(() => Promise.resolve(localPlayer))

      return request(app)
        .put('/player/1/pokemons/12/withdraw')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(butterfree.remove).toHaveBeenCalled()
          expect(localPlayer.save).toHaveBeenCalled()
          expect(body).toMatchObject({
            name: expect.any(String),
            gender: expect.any(String),
            pokemons: {
              carrying: expect.any(Array),
              deposit: expect.any(Array),
            },
          })
        })
    })

    it('should return 400 if player is already carrying 6 pokemons', () => {
      Player.findById.mockImplementationOnce(() =>
        Promise.resolve({
          pokemons: {
            carrying: [
              butterfree,
              butterfree,
              butterfree,
              butterfree,
              butterfree,
              butterfree,
            ],
          },
        })
      )

      return request(app)
        .put('/player/1/pokemons/12/withdraw')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(400)
        })
    })

    it('should return 404 if player does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(null))

      return request(app)
        .put('/player/1/pokemons/12/withdraw')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 404 if the pokemon does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(player))

      return request(app)
        .put('/player/1/pokemons/12/withdraw')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 500 if an error occur', () => {
      Player.findById.mockImplementationOnce(() =>
        Promise.resolve({
          ...player,
          pokemons: {
            carrying: [],
            deposit: [butterfree],
          },
          save: () => {
            throw new Error()
          },
        })
      )

      return request(app)
        .put('/player/1/pokemons/12/withdraw')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500)
        })
    })
  })

  describe('deposit', () => {
    it('should successfuly deposit a Pokemon', () => {
      const localPlayer = {
        ...player,
        pokemons: {
          deposit: [],
          carrying: [butterfree],
        },
        save: jest.fn(),
      }

      Player.findById.mockImplementationOnce(() => Promise.resolve(localPlayer))

      return request(app)
        .put('/player/1/pokemons/12/deposit')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(200)
          expect(butterfree.remove).toHaveBeenCalled()
          expect(localPlayer.save).toHaveBeenCalled()
          expect(body).toMatchObject({
            name: expect.any(String),
            gender: expect.any(String),
            pokemons: {
              carrying: expect.any(Array),
              deposit: expect.any(Array),
            },
          })
        })
    })

    it('should return 404 if player does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(null))

      return request(app)
        .put('/player/1/pokemons/12/deposit')
        .then(({ statusCode, body }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 404 if the pokemon does not exist', () => {
      Player.findById.mockImplementationOnce(() => Promise.resolve(player))

      return request(app)
        .put('/player/1/pokemons/12/deposit')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(404)
        })
    })

    it('should return 500 if an error occur', () => {
      Player.findById.mockImplementationOnce(() =>
        Promise.resolve({
          ...player,
          pokemons: {
            carrying: [butterfree],
            deposit: [],
          },
          save: () => {
            throw new Error()
          },
        })
      )

      return request(app)
        .put('/player/1/pokemons/12/deposit')
        .then(({ statusCode }) => {
          expect(statusCode).toBe(500)
        })
    })
  })
})
