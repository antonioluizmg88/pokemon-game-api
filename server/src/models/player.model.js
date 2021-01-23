const { Schema, model } = require('mongoose')

const PokemonSchema = new Schema({
  name: String,
  index: Number,
  metadata: Object,
})

const PlayerSchema = new Schema(
  {
    name: String,
    gender: {
      type: String,
      enum: ['F', 'M'],
    },
    pokemons: {
      deposit: [PokemonSchema],
      carrying: [PokemonSchema],
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Player', PlayerSchema)
