const MongoStore = require('connect-mongo')
const { connect, default: mongoose } = require('mongoose')


let url = 'mongodb://localhost:27017/backenddb'

const configObject = {
    dbConnection:  async () => {
        try {
            // set('stictQuery', set) // sacar leyenda en la consola de deprecado
            await mongoose.connect(url, {
                useNewUrlParser: true,   // mongodb mongodb+srv://
                useUnifiedTopology: true
            })
            // conección base de dato
            console.log('base de dato conectada')
            
        } catch (error) {
            console.log(error)
            
        }        
    },
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
        //saveUninitialized: false,
    }
}

module.exports = { 
    configObject 
}