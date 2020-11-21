const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const { pokemons, players } = require('./routes')

const server = express()
const { port } = config.app

server.use(bodyParser.json())
server.use(pokemons)
server.use(players)

server.listen(port, () => console.log(`Server listen on port ${port}`))