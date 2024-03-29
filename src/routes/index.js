const { Router } = require('express')
const authRouter  = require('./auth.router.js')
const usersRouter  = require('./users.router.js')
const productsRouter  = require('./productos.router.js')
const fakerRouter = require('../routes/faker.router.js')
//const cartRouter = require('./carrito.router.js')
const ordersRouter  = require('./orders.router.js')
const parametrosRouter = require('./params.routes.js')
const forkRouter  = require('./fork.router.js')
const { uploader } = require('../utils/multerConfig.js')
const UserRouter = require('./user.router.js')
const pruebaRouter = require('../routes/prueba.router.js')

const router = Router()
router.use('/fork', forkRouter)

router.use('/api/auth', authRouter)

// http://localhost:8080/api/usuarios
router.use('/api/usuarios', usersRouter)

// http://localhost:8080/api/productos
router.use('/api/productos', productsRouter)

router.use('/api/orders', ordersRouter)

//router.use('/carts', cartRouter)

router.use('/api/parametros', parametrosRouter)

router.use('/faker', fakerRouter)

router.use('/prueba', pruebaRouter)




let userRouter = new UserRouter()
router.use('/user', userRouter.getRouter())




router.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})

module.exports = {
    router
}