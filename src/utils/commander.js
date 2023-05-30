const { Command } = require('commander')
//nos permite trabajar 

const commander = new Command()

commander
    .option('--mode <mode>', 'Modo de ejecución de app', 'development')
    .parse()

module.exports = {
    commander
}

