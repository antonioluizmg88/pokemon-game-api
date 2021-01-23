require('dotenv').config()

const config = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    pokeapi: {
        url: process.env.POKEAPI_URL,
    },
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
}

module.exports = config