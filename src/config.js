require('dotenv').config()

const config = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    pokeapi: {
        url: process.env.POKEAPI_URL,
    },
    db: {
        name: process.env.DB_NAME,
    },
}

module.exports = config