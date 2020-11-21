const express = require('express')
const server = express()
const port = 3000


server.get('/', function(req, res) {
    const user = {
        name: 'Antonio',
        spouse: 'Patricia'
    }
    res.json(user)
})

server.listen(port, () => console.log('Server está rolando'))