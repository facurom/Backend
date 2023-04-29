const { OrderModel } = require("./models/order.model")


class OrderDaoMongo {
    constructor(){
        this.orderModel = OrderModel
    }

    async get(){
        try {
            return await this.orderModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }
    async getById(oid){
        try {
            return await this.orderModel.findById(oid)
        } catch (error) {
            new Error(error)
        }
        
    }
    async create(newOrder){
        try {
            // const order = this.orderModel(newOrder)
            // order.save
            return await this.orderModel.create(newOrder)
            
        } catch (error) {
            new Error(error)
        }
    }
    async update(){}
    async delete(){}
}

module.exports = OrderDaoMongo