const MongoStore = require('connect-mongo')
const { connect } = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const MongoSingleton = require('./MongoSingleton')

const { mode } =  commander.opts()

const enviroment = mode || "development"

dotenv.config({
    path: enviroment === 'development'? './.env.development' : './.env.production'
})


const url = process.env.MONGO_URL || 'mongodb://localhost:27017/backenddb'

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGO_URL: url,
    adminName: process.env.ADMIN_NAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin', 
    persistence: process.env.PERSISTENCE,  
    dbConnection: () => MongoSingleton.getInstance(),
    session: {
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15000000000
        }), 
        secret: 'secret0',
        resave: false,
        saveUninitialized: false,
    }
}


