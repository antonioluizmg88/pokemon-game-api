const fetch = require('node-fetch')
const { Router } = require('express')
const { Player } = require('../models')
const { pokeapi } = require('../config')
const { route } = require('./pokemons')
const { count } = require('../models/player.model')

const router = Router()

router.get('/players', async (req, res) => {
  const players = await Player.find()
  res.json(players)
})

router.get('/player/:id', async (req, res) => {
  const { id } = req.params
  let player

  try {
    player = await Player.findById(id)
  } catch (e) {
    res.status(500)
    res.end(e.message)
  }

  if (!player) {
    res.status(404)
    res.end()
    return
  }

  res.json(player)
})

router.post('/player', (req, res) => {
  const { body } = req
  let player

  try {
    player = new Player(body)
    player.save()
  } catch (e) {
    res.status(status)
    res.end(e.message)
  }

  res.json(player)
})

router.put('/player/:id', async (req, res) => {
  const { body } = req
  const { id } = req.params
  let player

  try {
    player = await Player.findByIdAndUpdate(id, body, { new: true })
  } catch (e) {
    res.status(500)
    res.end(e.message)
  }

  if (!player) {
    res.status(404)
    res.end()
    return
  }

  res.json(player)
})

router.delete('/player/:id', async (req, res) => {
  const { id } = req.params
  const player = await Player.findById(id)

  if (!player) {
    res.status(404)
    res.end()
    return
  }

  try {
    player.remove()
    res.status(204)
    res.end()
  } catch (e) {
    res.status(500)
    res.end(e.message)
  }
})

router.post('/player/:id/pokemons/:identifier', async (req, res) => {
  const { id, identifier } = req.params
  let response

  // Get player
  const player = await Player.findById(id)

  if (!player) {
    res.status(404)
    res.end()
    return
  }

  // Get Pokemon
  try {
    response = await fetch(`${pokeapi.url}/pokemon/${identifier}`)
  } catch (e) {
    res.status(500)
    res.end(`Unable to fetch from pokeapi: ${e.message}`)
    return
  }

  if (response.status !== 200) {
    switch (response.status) {
      case 404:
        res.status(404)
        break

      default:
        res.status(500)
    }

    res.end()
    return
  }

  // Add pokemon to player
  const pokemon = await response.json()
  const { id: index, name } = pokemon
  player.pokemons.deposit.push({
    index,
    name,
    metadata: pokemon,
  })
  await player.save()

  res.json(player)
})

router.put('/player/:id/pokemons/:pokemonId/withdraw', async (req, res) => {
  const { id, pokemonId } = req.params

  // Get player
  const player = await Player.findById(id)

  if (!player) {
    res.status(404)
    res.end('Player not found with given id')
    return
  }

  // Check how many pokemon player is carrying
  if (player.pokemons.carrying.length >= 6) {
    res.status(400)
    res.end('Player cannot carry more than 6 Pokemons')
    return
  }

  // Get pokemon
  const pokemon = player.pokemons.deposit.find(
    ({ _id }) => _id.toString() === pokemonId
  )

  if (!pokemon) {
    res.status(404)
    res.end('Pokemon not found with given id')
    return
  }

  try {
    player.pokemons.carrying.push(pokemon)
    await pokemon.remove()
    await player.save()
  } catch (e) {
    res.status(500)
    res.end()
    return
  }

  res.json(player)
})

router.put('/player/:id/pokemons/:pokemonId/deposit', async (req, res) => {
  const { id, pokemonId } = req.params

  // Get player
  const player = await Player.findById(id)

  if (!player) {
    res.status(404)
    res.end('Player not found with given id')
    return
  }

  // Get pokemon
  const pokemon = player.pokemons.carrying.find(
    ({ _id }) => _id.toString() === pokemonId
  )

  if (!pokemon) {
    res.status(404)
    res.end('Pokemon not found with given id')
    return
  }

  try {
    player.pokemons.deposit.push(pokemon)
    await pokemon.remove()
    await player.save()
  } catch (e) {
    res.status(500)
    res.end(e.message)
    return
  }

  res.json(player)
})
module.exports = router
