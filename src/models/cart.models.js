const {Schema, model} = require ('mongoose')

const collection = 'carts'

const CartSchema = new Schema({
    
    //userId: {
    //    type:Schema. Types.objectId
    //    ref: 'usuarios'
    //}
    
    products: {
        type: [{
            product: {
                type: Schema. Types.ObjectId,
                ref: 'products'
            },
            //quantify: {
            //    type: Number,
           // }
        }]
    }
})

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const CartModel = model(collection, CartSchema)

module.exports = {
    CartModel
}