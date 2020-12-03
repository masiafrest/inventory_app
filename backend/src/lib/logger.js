const util = require('util');

const createLogger = (type) => (...arg) => {
    console[type](
        ...arg.map(item => {
            if (typeof item === 'object') {
                return util.inspect(item, {depth: 5, colors: true}) 
            }
            return item;
        })
    )
}

module.exports = {
    info: createLogger('log'),
    warn: createLogger('warning'),
    error: createLogger('error')
}