//const express = require('express')
import express, { response } from 'express'
import { uploader, uploeader } from './utils'
const cookieParser = require('cookie-parser')
const express = require ('express')
const usersRouter = require ('./routes/user.router')
const viewsRouter = require ('./routes/views.router')
const {uploader} = require('./utils')
const {Server, Socket} = require ('socket.io')

const handlebars = require('express-handlebars')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/virtual' , express.static(__dirname + '/public'))
app.use(cookieParser())
//----------------------------------------
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')



app.use('/', viewsRouter)

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

app.post('single', uploader.single('myfile'),(req,res)=>{
    res.status(200).json({
        mensaje: 'se a subido el archivo'
    })
})


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


const httpServer = app.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando el puerto ${httpServer.address().port}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket =>{
    console.log('Nuevo cliente conectado')

    socket.on('mensaje', data =>{
        console.log(data)
        
    })

    socket.on('disconnect', () =>{
        console.log('Disconnect')
    })
})

// httpServer.on('error', err =>{
//     console.log(err)
// })