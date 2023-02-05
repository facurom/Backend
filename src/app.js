//const express = require('express')
import express, { response } from 'express'
const cookieParser = require('cookie-parser')
const express = require ('express')
const usersRouter = require ('./routes/user.router')
const productsRouter = require ('./routes/productos.router')

const app = express()
const PORT = 8080

app.use(express.json())


app.use(express.urlencoded({extended: true}))
app.use('/virtual' , express.static(__dirname + '/public'))
app.use(cookieParser())

function mid1(req, res, next) {
    req.dato1=' dato uno'
    next()
}
function mid2(req, res, next) {
    req.dato2=' dato dos'
    next()
}



app.use('/api/usuarios', mid1 , usersRouter)

app.use('/api/productos', mid2 , productsRouter)


app.get('/', (request, response) => {
    response.send(arrayUsuarios)
})

app.get('/:idUser', (request, response) =>{ 
    const {idUser} = request.params
    const usuario = arrayUsuarios.find( user => user.id === idUser)
    if (!usuario) return response.send('No existe el usuario')
    response.send(usuario)
})








app.get('/saludo',(req, res) =>{
    res.send('Hola, saludos para todos')
})

app.get('/usuario',(req, res) => {
    res.send({
        nombre: 'usuario',
        apellido: 'usuario',
        edad: 25,
        correo: 'f@gmail.com'
    })
})
app.get ('/params/:nombre/id', ( req, res ) => {
    console.log(req.params)
    const {nombre, id } = req.params
    res.send({
        nombre: nombre,
        id: id, 
    })
})

app.get('/query', ( req, res ) =>{
    console.log(req.query)
    const {nombre, apellido} = req. query
    res.send({
        nombre,
        apellido
    })

})


app.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando el puerto ${PORT}`)
})