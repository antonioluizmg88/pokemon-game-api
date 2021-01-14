jest.mock('node-fetch')
jest.mock('../db', () => ({
  connectToMongoDb: jest.fn(),
}))

const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')
const request = require('supertest')
const app = require('../app')
const charmander = {
  id: 7,
  name: 'Charmander',
}

describe('get pokemon', () => {
  it('should return one pokemon', () => {
    fetch.mockReturnValueOnce(new Response(JSON.stringify(charmander)))

    return request(app)
      .get('/pokemon/7')
      .then(({ statusCode, body }) => {
        expect(statusCode).toBe(200)
      })
  })
})
