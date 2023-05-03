const {Router} = require ('express')
const { authToken } = require ('../utils/jsonwt')
//const { ProductModel } = require('../models/product.model')
//const router = Router()
const {
    getProdutcs,
    createProdutcs,
    getProdutc,
    updateProduct,
    deleteProduct
} = require('../Controllers/products.controller')

const router = Router()


router
    .get('/',       getProdutcs)
    .get('/:id',    getProdutc)
    .post('/',      createProdutcs)
    .put('/:id',    updateProduct) 
    .delete('/:id', deleteProduct)



// router.use((req, res, next)=>{
//     console.log('Time: ', Date())
//     next()
// })

// GET api/productos /
// router.get('/', authToken ,async (request, response) =>{
//     const productos = await ProductModel.find({})
//     response.status(200).json({
//         status: 'success',
//         payload: productos
//     })
// })

// router.get('/', (request, response) =>{
//     response.status(200).send({dato2: request.dato2})
// })



// router.post('/.',(request, response) =>{
//     const {name, price} = request.body
//     response.status(200).send({name, price})
// })

// router.get('/', authToken, async (request, response) =>{
//     const productos = await ProductModel.find({})
//     response.status(200).json({
//         status: 'success',
//         payload: productos
//     })
// })



module.exports= router