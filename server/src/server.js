const config = require('./config')
const app = require('./app')

const { port } = config.app

app.listen(port, () => console.log(`Server listen on port ${port}`))
