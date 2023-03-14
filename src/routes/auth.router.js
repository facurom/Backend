const {Router} = require ('express')

const router = Router()

router.get('/login', ( req, res ) =>{
    res.render('login')

})

router.post('/login', ( req, res ) =>{
    const data = req.body
    console.log(data)
    res.cookie('NatureCookie', data, {maxAge: 100000000}).send({
        status: 'success',
        message: 'Cookie creada'
    })

})