const { Schema, model } = require('mongoose')

const PokemonSchema = new Schema({
  name: String,
  index: Number,
  metadata: Object,
})

const PlayerSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: {
      type: String,
      enum: ['M', 'F', 'O', 'X'],
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
