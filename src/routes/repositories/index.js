const { UserDao, ProductDao, OrderDao } = require('../Dao/factory.js')
const { ProductModel } = require('../Dao/mongo/models/product.model.js')

const ProductRepositories = require('./product.respositories.js')
const UserRpositories = require('./user.respositories.js')
const OrderRepositories = require('./ordersService.js')

const userService = new UserRpositories(new UserDao())
const productService = new ProductRepositories(new ProductDao(ProductModel))
const orderService = new OrderRepositories(new OrderDao())

module.exports = {
    userService,
    productService,
    orderService
}