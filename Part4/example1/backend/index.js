const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
})
