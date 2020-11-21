const { Router } = require('express')
const { DataError } = require('node-json-db/dist/lib/Errors')
const db = require('../db')

const router = Router()

// GET     /players
// GET     /player/:id
// POST    /player
// PUT     /player/:id
// DELETE  /player/:id

router.get('/players', (req, res) => {
    const playersFromDb = db.getData('/players')
    const players = Object.values(playersFromDb)
    res.json(players)
})

router.get('/player/:id', (req, res) => {
    const { id } = req.params

    try {
        const player = db.getData(`/players/${id}`)
        res.json(player)
    } catch(e) {
        const status = (e instanceof DataError) ? 404 : 500
        res.status(status)
        res.end()
    }
})

router.post('/player', (req, res) => {
    const { body } = req
    const id = Date.now()
    const player = {
        id,
        ...body,
    }

    try {
        db.push(`/players/${id}`, player)    
    } catch(e) {
        const status = (e instanceof DataError) ? 404 : 500
        res.status(status)
        res.end()
    }
    
    res.json(player)
})

router.put('/player/:id', (req, res) => {
    const { body } = req
    const { id } = req.params
    const player = db.getData(`/players/${id}`)
    const updatedPlayer = {
        ...player,
        ...body,
    }

    db.push(`/players/${id}`, updatedPlayer)
    res.json(updatedPlayer)
})

router.delete('/player/:id', (req, res) => {
    const { id } = req.params
    const player = db.delete(`/players/${id}`)
    res.status(204)
    res.end()
})

module.exports = router