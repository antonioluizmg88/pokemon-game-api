const mongoose = require('mongoose')

const connectToMongoDb = async ({ host, port, name }) => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.info('Database connection established')
  } catch (e) {
    console.error('Failed to connect to database')
  }
}

module.exports = {
  connectToMongoDb,
}
