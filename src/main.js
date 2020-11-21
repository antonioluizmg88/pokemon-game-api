const express = require('express')
const config = require('./config')
const { pokemons } = require('./routes')

const server = express()
const { port } = config.app

server.use(pokemons)

server.listen(port, () => console.log(`Server listen on port ${port}`))