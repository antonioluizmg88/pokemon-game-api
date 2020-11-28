const mongoose = require('mongoose')
const config = require('./config')

const { host, port, name } = config.db

mongoose.connect(
    `mongodb://${host}:${port}/${name}`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)

const db = mongoose.connection
db.on('error', () => console.error('Unable to connect to database'))
db.once('open', () => console.info(`MongoDB connected on ${host}:${port}`))