const { Router } = require ('express')
const { route } = require('./views.router')

const router = Router()

router.get('/set', (req,res)=>{
    res.cookie('Naturepharma', 'Cookie 01', {maxAge: 100000000}).send('cookie seteada')
})

router.get('/setSigned', (req,res)=>{
    res.cookie('Naturepharma', 'Otra cookie', {maxAge:100000 ,signed:true}).send('cookie firmada')
})

router.get('/get', (req,res)=>{
    res.send(req.cookies)
})

router.get('/delete', (req,res)=>{
    res.clearCookie('Naturepharma').send('cookie borrada')
})


module.exports = router