const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const { pokemons, players } = require('./routes')
const { connectToMongoDb } = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(pokemons)
app.use(players)

connectToMongoDb(config.db)

module.exports = app
