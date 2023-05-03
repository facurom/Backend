// const express = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const logger = require('morgan')
// session_______________________________________________________________
const session = require('express-session')
const cors = require('cors')
// socket io _______________________________________________________________
const  configObject  = require('./config/config.js')
// socket io ________________________________________________________
//require('dotenv').config()

const { Server: HttpServer } = require('http')
const { Server: ServerIo } = require('socket.io')
const { initProductsSocket } = require('./utils/productsSocketIo.js')
const { router } = require('./routes')
// passport_____________________________________________________________
const { initializePassport } = require('./middleware/initialPassport.js')
const passport = require('passport')

// const nodemailer = require('nodemailer')
const { createTransport } = require('nodemailer')
const twilio = require('twilio') 

const app = express()
const httpServer = new HttpServer(app)
const io = new ServerIo(httpServer)
const usersRouter = require('./routes/user.router.js')

// oncección con la base de datos mongo __________________________________________________________________
configObject.dbConnection()

app.use('/virtual' ,express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

//initializePassport_________________________________________--
// initializePassport()
// app.use(passport.initialize())
// app.use(passport.session())
//_____________________________________________________
app.use(logger('dev'))

// session mongo_______________________________________________________________
app.use(session(configObject.session))




// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
 
//toy____________________________________________________
// app.use('/api/users', usersRouter)
//app.use('/api/toys', toysRouter)

app.use(router)
const TEST_MAIL= process.env.TEST_MAIL_ADMIN
const transport = createTransport({
    service: 'gmail',
    port: 578,
    auth: {
        user: TEST_MAIL,
        pass: process.env.TEST_MAIL_PASS
    }
})


let user = {
    nombre: 'Sofía',
    apellido: 'Romero Rottela'
}

app.get('/api/mail', async (req, res) => {
    try {
        let result = await transport.sendMail({
            from:'Servicio de Node <sofi.rom.rott4@gmail.com>',
            to: TEST_MAIL,
            subject: 'Mail de prueba desde server',
            html: `<div>
                    <h1>Bienvenido ${user.nombre} - ${user.apellido}</h1>
                    <img src="cid:logo1"
                </div>`,
            attachments: [
                {
                    filename: 'Node.png',
                    path: `${__dirname}/public/images/Node.png`,
                    cid: 'logo1'
                }
            ]
        })
    } catch (error) {
        console.log(error)
    }
    res.send({
        status: 'success',
        payload: 'Mensaje enviado'
    })
})

const twilio_account_sid = process.env.TWILIO_ACCOUNT_SID
const twilio_auth_token = process.env.TWILIO_AUTH_TOKEN
const twilio_phone_num = process.env.TWILIO_PHONE_NUMBER
// console.log(twilio_account_sid)

const cliente = twilio(twilio_account_sid, twilio_auth_token)
app.get('/api/sms', async (req,res)=>{
    try {
        // await cliente.messages.create({
        //     body: 'Esto es un mensaje SMS',
        //     from: twilio_phone_num,
        //     to: process.env.NUMBER_MIO
        // })
        await cliente.messages.create({
            body: `Gracias ${user.nombre} ${user.apellido} por la compra`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.NUMBER_MIO}`
        })
        res.send({
            status: 'success',
            payload: 'mensaje enviado'
        })
    } catch (error) {
        console.log(error)
    }
})
app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

// socket_______________________________________________________________
initProductsSocket(io)

module.exports = {
    httpServer
}
