// const express = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const logger = require('morgan')
// session_______________________________________________________________
const session = require('express-session')
// socket io _______________________________________________________________
const { configObject } = require('./config/config.js')
// socket io _______________________________________________________________
require('dotenv').config()

const { Server: HttpServer } = require('http')
const { Server: ServerIo } = require('socket.io')
const { initProductsSocket } = require('./utils/productsSocketIo.js')
const { router } = require('./routes')
const { initializePassport } = require('./middleware/initialPassport.js')
const passport = require('passport')


const app = express()
const httpServer = new HttpServer(app)
const io = new ServerIo(httpServer)

// oncección con la base de datos mongo __________________________________________________________________
configObject.dbConnection()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

// session mongo_______________________________________________________________
app.use(session(configObject.session))

app.use('/virtual' ,express.static(__dirname+'/public'))
app.use(cookieParser())


//initializePassport_________________________________________--
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
passport()

// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
 

app.use(router)

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

// socket_______________________________________________________________
initProductsSocket(io)

module.exports = {
    httpServer
}
