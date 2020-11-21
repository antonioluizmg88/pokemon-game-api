const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const config = require('../config')

module.exports = new JsonDB(new Config(config.db.name, true, true, '/'))