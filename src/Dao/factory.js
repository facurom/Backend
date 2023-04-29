const {persistence, dbConnection} = require('../config/config.js')

let ProductDao
let UserDao
let CartDao
let OrderDao

switch (persistence) {
    case 'MONGO':
        dbConnection() // 2 llamada a la conexión (la otra esta en server)
        const ProductDaoMongo = require('./mongo/product.mongo.js')
        ProductDao = ProductDaoMongo

        const UserDaoMongo = require('./mongo/user.mongo.js')
        UserDao = UserDaoMongo

        const OrderDaoMongo = require('./mongo/oder.mongo.js')
        OrderDao = OrderDaoMongo
        break;
    case 'MEMORY':
        const UserDaoMemory = require('./memory/user.memory.js')
        UserDao = UserDaoMemory
        break;
    case 'ARCHIVO':
        
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao
}