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

  try {
    const player = await Player.findById(id)
    res.json(player)
  } catch (e) {
    res.status(500)
    res.end()
  }
})

router.post('/player', (req, res) => {
  const { body } = req
  let player

  try {
    player = new Player(body)
    player.save()
  } catch (e) {
    console.error(e)
    res.status(status)
    res.end()
  }

  res.json(player)
})

router.put('/player/:id', async (req, res) => {
  const { body } = req
  const { id } = req.params

  try {
    const player = await Player.findByIdAndUpdate(id, body, { new: true })
    res.json(player)
  } catch (e) {
    console.error(e)
    res.status(500)
    res.end()
  }
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
    console.error(e)
    res.status(500)
    res.end()
  }
})

router.post('/player/:id/pokemons/:identifier', async (req, res) => {
  const { id, identifier } = req.params
  let pokemon

  // Get player
  const player = await Player.findById(id)

  if (!player) {
    res.status(404)
    res.end()
    return
  }

  // Get Pokemon
  try {
    const response = await fetch(`${pokeapi.url}/pokemon/${identifier}`)
    pokemon = await response.json()
  } catch (e) {
    console.error(e)
    res.status(500)
    res.end('Unable to fetch from pokeapi')
  }

  // Add pokemon to player
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
    res.end('Player cannot carry more than 6 pokemons')
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

  player.pokemons.carrying.push(pokemon)
  await pokemon.remove()
  await player.save()

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

  player.pokemons.deposit.push(pokemon)
  await pokemon.remove()
  await player.save()

  res.json(player)
})
module.exports = router
