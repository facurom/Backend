// console.log('cwd: ',process.cwd())
// console.log('pid : ',process.pid)
// console.log('memory : ',process.memoryUsage())
// console.log('env : ',process.env)
// console.log('argv : ',process.argv)
// console.log('version : ',process.version)

// 1- node .\process.js 1 2 3 4 5
// 2- node .\process.js a 2 -a
// 3-  node .\process.js 
// 4- node .\process.js --mode development

// console.log('argv: ', process.argv)
// console.log('argv: ', process.argv.slice(2))

process.on('exit', code => {
    console.log('Este cód se ejecutará justo antes de salir del proceso')
})


process.on('uncaughtException', exception => {
    console.log('Este cód atrapa todas las excepciones no controladas como llamar a una función que no haya sido declarada')
})
// process.on('exit', code => {
//     console.log('Este cód se ejecutará justo antes de salir del proceso')
// })

console('excepción')