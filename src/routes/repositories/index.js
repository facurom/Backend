const { UserDao, ProductDao, OrderDao } = require('../../Dao/factory')
const { ProductModel } = require('../../Dao/mongo/models/product.model.js')

const ProductRepositories = require('./product.repositories')
const UserRpositories = require('./user.repositories')
const OrderRepositories = require('./ordersService')

const userService = new UserRpositories(new UserDao())
const productService = new ProductRepositories(new ProductDao(ProductModel))
const orderService = new OrderRepositories(new OrderDao())

module.exports = {
    userService,
    productService,
    orderService
}