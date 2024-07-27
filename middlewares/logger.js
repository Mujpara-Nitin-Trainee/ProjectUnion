const pino = require('pino');

const logger = pino({
    transport:{
        target:"pino-pretty",
        options:{
            translateTime: "dd-mm-yyyy hh:mm:ss",
            ignore:"pid,hostname",
        }
    }
})

module.exports = logger;