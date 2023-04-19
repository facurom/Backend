const {Router } = require('express')
const {fork} = require('child_process')

const router = Router()

function operacionCompleja(params) {
    let result = 0
    for (let i = 0; i < 5e9; i++) {
        result += i        
    }
    return result
}

router.get('/block', (req, res) => {
    const result = operacionCompleja()
    res.send(`<center><h1>El resultadao es: ${result}</h1></center>`)
})

router.get('/noblock', (req, res) => {
    const child = fork('./src/routes/operacionCompleja.js')
    child.send('Inicia el cálculo por favor')
    child.on('message', result => {
        res.send(`<center><h1>El resultadao es: ${result}</h1></center>`)        
    })
})


module.exports= router