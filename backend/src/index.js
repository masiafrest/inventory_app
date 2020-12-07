const app = require('./app')
const logger = require('./lib/logger');

const port = process.env.PORT || 5050;

//const enviroment = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    logger.info(`Escuchando en el puerto ${port} and enviroment is ${process.env.NODE_ENV}`);
})