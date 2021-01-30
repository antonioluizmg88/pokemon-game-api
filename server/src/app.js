const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const { pokemons, players } = require('./routes')
const { connectToMongoDb } = require('./db')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(pokemons)
app.use(players)

connectToMongoDb(config.db)

module.exports = app
