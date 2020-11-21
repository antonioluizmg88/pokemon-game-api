const fetch = require('node-fetch')
const { Router } = require('express')
const { pokeapi } = require('../config')
const router = Router()

router.get('/pokemon/:identifier', async (req, res) => {
    const { identifier } = req.params
    const response = await fetch(`${pokeapi.url}/pokemon/${identifier}`)
    const pokemons = await response.json()

    res.json(pokemons)
})

module.exports = router