const MongoStore = require('connect-mongo')
const { connect, default: mongoose } = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const MongoSingleton = require('./MongoSingleton')
// const environment = 'development'


const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

const url = process.env.MONGO_URL 









const configObject = {
    port: process.env.PORT || 8080, 
    mongoUrl: process.env.MONGO_URL, 
    adminName:process.env.ADMIN_NAME || 'admin',
    adminPassword:process.env.ADMIN_PASSWORD || 'admin',
    // dbConnection:  async () => {
    //     try {
    //         // set('stictQuery', set) // sacar leyenda en la consola de deprecado
    //         await connect(url)
    //          console.log('base de dato conectada')
            
    //     } catch (error) {
    //         console.log(error)
            
    //     }        
    // },
    dbConnection: () => MongoSingleton.getInstance(),
    session: {
        store: MongoStore.create({    // new MongoStore === new require('connect-mongo')
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15000000000
        }), 
        secret: 's3cr3t0',
        resave: false,
        saveUninitialized: false,
    }
}

module.exports = { 
    configObject 
}