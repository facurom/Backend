const { Router } = require('express')
const { UserModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptPass')

const router = Router()

const products = [
    { title: 'Crema Hidratante', price: '4500', imageUrl: '' },
    { title: 'Crema contorno de ojos', price: '7500', imageUrl: '' },
    { title: 'Jabon en crema', price: '750', imageUrl: '' },

]
router.get('/', async (req, res) => {
    let testUser = {
        name: 'Sofía',
        last_name: 'Romero',
        role: 'admin',
    }
    // req.session.user = testUser.name
    // req.session.admin = true

    res.status(200).render('index', {
        user: testUser,
        isAdmin: testUser.role === 'admin',
        products,
        style: 'index.css'
    })
})

// router.post('/login', ( req, res ) =>{
//     const data = req.body
//     console.log(data)
//     res.cookie('NatureCookie', data, {maxAge: 100000000}).send({
//         status: 'success',
//         message: 'Cookie creada'
//     })

// })

router.post('/login', async (req, res) => {
    res.status(200).render('login')

})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(401).send({status: 'error', message:'todos los campos son obligatorios'}) 

    

    //if (!user) return res.status(401).send({status: 'error', message: 'Usuario o contraseña incorrectos'})
    
    const user = await UserModel.findOne({email})
    
    console.log(isValidPassword(user, password))

    if (password === user.password) {
        
    }

    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email
        
    // }

    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message:'Login correcto',
    })
})

router.post('/register', async (req, res) => {
    
    res.status(200).render('register')

})

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password} = req.body
    const exist = await UserModel.findOne({email})
    if (exist) return res.status(401).send({status:'error', message:'El usuario ya existe'})

    
    if(!first_name|| !last_name || !email || !password ){
        return res.status(401).send({status: 'error', message: 'Todos los campos son obligatorios'})
    }
    const user = {
        fist_name,
       last_name,
        email,
       password: createHash(password) 
    }
    let result = await UserModel.create(user)


    res.status(200).json({
        status: 'succes',
        //message: 'Usuario creado correctamente',
        payload: result
    })

})
router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'Logout error', message: err })
    })
    res.status(200).redirect('/login')

})





// router.get('/session', (req, res) => {
//     if (req.session.counter) {
//         req.session.counter++
//         res.send(`Bienvenido a tu visita número ${req.session.counter}`)
//     } else {
//         req.session.counter = 1
//         res.send('Bienvenido a tu primera visita')
//     }
// })


module.exports = router