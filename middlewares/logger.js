const pino = require('pino');

const fileTransport = pino.destination({
    dest: `logs/app.log`
})

const logger = pino(fileTransport,{
    transport:{
        target:"pino-pretty",
        options:{
            translateTime: "dd-mm-yyyy hh:mm:ss",
            ignore:"pid,hostname",
        }
    }
})

module.exports = logger;