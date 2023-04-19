const { Command } = require('commander')

const program  = new Command()
//--version, -v
program
    .option('-d', 'Variable para debug', false)
    .option('-p, --port <port>', 'Puero para el servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'production')
    .requiredOption('-u <user>', 'Usuario utilizando el aplicativo', 'No se ha declarado un usuario')
    .option('-l, --letters [letters...]', 'specify the letters')



program.parse()

// node commander.js -d -p 3000 --mode development -u root --letters a b c
// node commander.js -d -p 3000 -u root 2 a 5 --letters 

console.log('Options: ', program.opts())
console.log('Remaining Arguments: ', program.args)