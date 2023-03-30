const {Router} = require ('express')

const router = Router()

const products = [
    {title: 'Crema Hidratante', price: '4500', imageUrl: ''},
    {title: 'Crema contorno de ojos', price: '7500', imageUrl: ''},
    {title: 'Jabon en crema', price: '750', imageUrl: ''},

]

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
router.get('/', async(req,res) =>{
    let testUser = {
        name: 'Sofía',
        last_name: 'Romero',
        role: 'admin',
    }
    req.session.user = testUser.name
    req.session.admin = true
    
    res.status(200).render('index', {
        user: testUser,
        isAdmin: testUser.role==='admin',
        products,
        style: 'index.css'
    })
})

module.exports = router