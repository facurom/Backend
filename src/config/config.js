const MongoStore = require('connect-mongo')
const { connect } = require('mongoose')


const url = 'mongodb://localhost:27017/backenddb'

let configObject = {
    dbConnection:  async () => {
        try {
            await connect(url)
            console.log('DB conectada')  
        } catch (error) {
            console.log(error)
            process.exit()
        }        
    },
    session: {
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/backenddb',
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

module.exports = { configObject }