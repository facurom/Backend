const { Router } = require('express')
const authRouter  = require('./auth.router.js')
const usersRouter  = require('./user.router.js')
const productsRouter  = require('./productos.router.js')
const { uploader } = require('../utils/multerConfig.js')

const router = Router()

router.use('/api/auth', authRouter)

// http://localhost:8080/api/usuarios
router.use('/api/usuarios', usersRouter)

// http://localhost:8080/api/productos
router.use('/api/productos', productsRouter)

router.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})

module.exports = {
    router
}