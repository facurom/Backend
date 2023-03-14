const { CartModel } = require("../models/cart.models")
const { orderModel } = require("../models/order.models")
const { UserModel } = require("../models/user.model")
const { connect } = requiere('mongoose')



//const url = 'mongodb+srv://facurom:15408212Fa@cluster0.by1ojdz.mongodb.net/Backend?retryWrites=true&w=majority'
const url_local = 'mongodb://localhost:27017/backenddb'

const ordenes = [

    {

      name: "Margherita",

      size: "small",

      price: 8,

      quantity: 2,

      date: "2021-01-13T09:08:13Z"

    },

    {

      name: "Pepperoni",

      size: "medium",

      price: 12,

      quantity: 1,

      date: "2020-05-13T09:08:13Z"

    },

    {

      name: "Hawaiian",

      size: "medium",

      price: 16,

      quantity: 3,

      date: "2022-03-11T09:08:13Z"

    },

 

    {

        name: "Hawaiian",

        size: "large",

        price: 16,

        quantity: 3,

        date: "2022-03-14T09:08:13Z"

    },

    {

        name: "Margherita",

        size: "large",

        price: 16,

        quantity: 3,

        date: "2022-03-11T09:08:12Z"

    },

    {

        name: "Pepperoni",

        size: "large",

        price: 16,

        quantity: 3,

        date: "2022-03-15T09:08:13Z"

    },

    {

        name: "Pepperoni",

        size: "large",

        price: 25,

        quantity: 3,

        date: "2022-03-18T09:08:12Z"

    },

    {

        name: "Margherita",

        size: "large",

        price: 30,

        quantity: 3,

        date: "2022-03-21T09:08:12Z"

    }

  ];




const dbConnection = async () => {
    try {
        await connect(url)
        console.log('DB conectada')
       // let resp = await UserModel.find().explain('executionStars')
       // let resp = await UserModel.find ({first_name: 'Cecilia'}). explain('executionStars')

       //const resp = await CartModel.create({})
      
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
      
      
      
       //const cart = await CartModel.find({_id:'640f435bce83afac1b0b08ca'})
       //console.log(JSON.stringify(cart, null, 2))
       let result = await orderModel.insertMany(ordenes)
       console.log(result)
      let orders = await orderModel.aggregate([
        {
            $match: { size: 'medium'}
        },
        {
            $group: {_id: "$name", totalQuantify:{$sum:"$quantity"} }
        },
        {
            $sort: {totalQuantity: -1}
        },
        {
            $group: {_id:1, orders: {$push: "$$ROOT"}}
        },
        {
            $project:{
                "_id": 0,
                orders: "$orders"
            }
        },
        {
            $merge: {
                into: 'reports'
            }
        }
      ])

      let users = await UserModel.paginate({gender:'Femenino'},{limit:20,page:1})
      


    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = {dbConnection}