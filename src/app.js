//const express = require('express')
import express, { response } from 'express'
import { auth } from './middleware/auth'
import { uploader, uploeader } from './utils'
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const express = require ('express')
const usersRouter = require ('./routes/user.router')
const viewsRouter = require ('./routes/views.router')
const cookieRouter = require ('./routes/cookie.router')
const {uploader} = require('./utils')
const { Server } = require ('socket.io')
const {dbConnection} = require('./config/conectionDB')
const handlebars = require('express-handlebars')
const authRouter = require('./routes/auth.router')
const productsRouter = require('./routes/productos.router')



dbConnection()
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const fileStore = FileStore(session)
app.use('/virtual' , express.static(__dirname + '/public'))
app.use(cookieParser('p@l@bras3creta'))

// app.use(session({
//     store: new fileStore({
//         path: __dirname+'/sessions',
//         ttl: 100,
//         retries: 0,
//     }),


//     secret: 'secretCoder',
//     resave: true,
//     saveUninitialized: false,
// }))
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/backenddb',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl:15 
        
    }),
    
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: false,
}))

//----------------------------------------
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use('/cookie',cookieRouter)


app.use('/', viewsRouter)

function mid1(req, res, next) {
    req.dato1=' dato uno'
    next()
}
function mid2(req, res, next) {
    req.dato2=' dato dos'
    next()
}


app.use('/', authRouter)

app.use('/api/usuarios', auth , usersRouter)

app.use('/api/productos', auth ,productsRouter)

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

const io= new Server(httpServer)

const mensaje = [
   // {user:'Sofi', message:'Hola, como estan'}
]

io.on('connection', socket =>{
    console.log('Nuevo cliente conectado')

    socket.on('mensaje', data =>{
        console.log(data)
        mensaje.push(data)
        io.emit('messageLog', mensaje)
        
    })
    
    socket.emit('mensajeServer','El servidor te escucha')
    socket.broadcast.emit('evento_para_todos_menos_el_actual', 'Esto lo van a recibir todos los que esten conectados a la plataforma')
    socketServer.emit('evento_para_todos', 'Este mensaje es de manera global')
    
    socket.on('authenticated', data =>{
        socket.broadcast.emit('newUserConnected', data )
    })
    
    socket.on('disconnect', () =>{
        console.log('Disconnect')
    })
})

// httpServer.on('error', err =>{
//     console.log(err)
// })