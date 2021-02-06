const fetch = require('node-fetch')
const { Router } = require('express')
const { pokeapi } = require('../config')
const router = Router()

router.get('/pokemons', async (req, res) => {
  const { identifier } = req.params
  let data

  try {
    const response = await fetch(`${pokeapi.url}/pokemon?limit=151`)
    data = await response.json()
  } catch (e) {
    res.status(500)
    res.end(e.message)
    return
  }

  res.json(data.results)
})

router.get('/pokemon/:identifier', async (req, res) => {
  const { identifier } = req.params
  let pokemons

  try {
    const response = await fetch(`${pokeapi.url}/pokemon/${identifier}`)
    pokemons = await response.json()
  } catch (e) {
    res.status(500)
    res.end(e.message)
    return
  }

  res.json(pokemons)
})

module.exports = router
