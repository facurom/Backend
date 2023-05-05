const { Router } = require('express')
const compression = require('express-compression')
const {faker} = require('@faker-js/faker')

const parametrosRouter  = require('./parametros.router.js')
const mailingRouter  = require('./mailing.router.js')
const forkRouter  = require('./fork.router.js')
const fakerRouter  = require('./faker.router.js')
const { uploader } = require('../utils/multerConfig.js')
const { loginUser, registerUser } = require('../controllers/prueba.controller.js')

const router = Router()


router.use('/fork', forkRouter)

// http://localhost:8080/api/param
router.use('/parametros', parametrosRouter)

router.use('/mailing', mailingRouter)

router.use('/faker', fakerRouter)
// router.use(compression())
router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))
router.get('/stingmuylargo', (req, res)=>{
    let string = 'Hola, este tring es muy largo'
    for( let i = 0; i < 5e4; i++){
        string += 'Hola, este tring es muy largo'
    }
    res.status(200).send(string)
})


router.post('/single', uploader.single('myfile') ,(req, res)=>{
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
})


module.exports = router

// artillery run config.yml --output testperformance.json
// artillery report testperformance.json -o testresult.html