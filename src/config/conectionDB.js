const { connect } = requiere('mongoose')
const url = 'mongodb+srv://facurom:15408212Fa@cluster0.by1ojdz.mongodb.net/Backend?retryWrites=true&w=majority'
const url_local = ' mongodb//facurom:<password>@cluster0.by1ojdz.mongodb.net/?retryWrites=true&w=majority '
const dbConnection = async () => {
    return await connect(url, err => {
        if (err) {
           console.log('No se puede conectar mongodb:', err) 
           process.exit()
        }
        console.log('DB conectada') 
    })
}

module.exports = {dbConnection}