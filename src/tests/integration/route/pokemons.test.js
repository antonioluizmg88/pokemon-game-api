jest.mock('node-fetch')

const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const request = require('supertest')
const app = require('../../../app')
const charmander = {
  id: 7,
  name: 'Charmander',
}

describe('get pokemon', () => {
  beforeEach(() => {
    fetch.mockReset()
  })

  it('should return one pokemon', () => {
    fetch.mockReturnValue(new Response(JSON.stringify(charmander)))

    return request(app)
      .get('/pokemon/7')
      .then(({ statusCode, body }) => {
        expect(statusCode).toBe(200)
      })
  })

  it('should return 500 if pokeapi is unavailable', () => {
    fetch.mockRejectedValue(new Error())

    return request(app)
      .get('/pokemon/7')
      .catch()
      .then(({ statusCode, body }) => {
        expect(statusCode).toBe(500)
      })
  })
})
