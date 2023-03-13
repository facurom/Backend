const { CartModel } = require("../models/cart.models")
const { UserModel } = require("../models/user.model")

const { connect } = requiere('mongoose')
//const url = 'mongodb+srv://facurom:15408212Fa@cluster0.by1ojdz.mongodb.net/Backend?retryWrites=true&w=majority'
const url_local = 'mongodb://localhost:27017/backenddb'
const dbConnection = async () => {
    try {
        await connect(url)
        console.log('DB conectada')
       // let resp = await UserModel.find().explain('executionStars')
       // let resp = await UserModel.find ({first_name: 'Cecilia'}). explain('executionStars')

     //  const resp = await CartModel.create({})
      
     //  await ProductModel.create ({
     //   tittle: 'Product 1',
     //   description: 'Esto es un producto',
     //   category: 'productos',
     //   code: '0010',
     //   stock: 100,
     //   price: 6000
      // })
        //cart.products.push({product:''})
        //let resp = await CartModel.findOneAndUpdate({_id:''}, cart)
        //console.log(resp)
      
      
      
        const cart = await CartModel.find({_id:'640f435bce83afac1b0b08ca'})
       console.log(JSON.stringify(cart, null, 2))

      


    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = {dbConnection}