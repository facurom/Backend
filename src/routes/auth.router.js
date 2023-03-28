const {Router} = require ('express')

const router = Router()

// router.get('/login', ( req, res ) =>{
//     res.render('login')

// })

router.post('/login', ( req, res ) =>{
    const data = req.body
    console.log(data)
    res.cookie('NatureCookie', data, {maxAge: 100000000}).send({
        status: 'success',
        message: 'Cookie creada'
    })

})
router.get('/login', ( req, res ) =>{
    const {username, password} = req.query      
    //console.log(data)
   if (username ===! 'admin' || password ===! 'admin') {
       return res.send ('login falló')
   } else { 
       req.session.user = username
       req.session.admin = true
       res.send ('login ok')
    
   }

})

router.get('/session', (req, res) =>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Bienvenido a tu visita número ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido a tu primera visita')
    }
})