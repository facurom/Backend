const { Router } = require('express')
const { UserModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptPass')
const passport = require('passport')
const { generateToken } = require('../utils/jsonwt')

const router = Router()

const products = [
    { title: 'Crema Hidratante', price: '4500', imageUrl: '' },
    { title: 'Crema contorno de ojos', price: '7500', imageUrl: '' },
    { title: 'Jabon en crema', price: '750', imageUrl: '' },

]
let users = [

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
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/auth/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/products')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    // encripar la contraseña que viene del formulario, comparar con la encriptada de la base de datos
    const user = await users.find(user => user.email === email && user.password === password)
    //const user = await users.find(user => user.email === email && user.password === password)
    if (!user) return res.status(401).send({ status: 'error', error: 'Credentials incorrect' })

    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,

    //     email: user.email,
    // }

    const access_token = generateToken(user)



    // const { email, password } = req.body

    // if (!email || !password) return res.status(401).send({status: 'error', message:'todos los campos son obligatorios'}) 



    // //if (!user) return res.status(401).send({status: 'error', message: 'Usuario o contraseña incorrectos'})

    // const user = await UserModel.findOne({email})

    // console.log(isValidPassword(user, password))

    // console.log(isValidPassword(user, password))

    // if (!isValidPassword (user.password)) {
    //     return res.status(401).send({status: 'error', message: 'Usuario o contraseña incorrectos'})
    // }


    res.status(200).send({
        status: 'success',
        token,
        message: 'Login correcto',
    })
})

router.get('/faillogin', async (req, res) => {
    res.status(400).json({ error: 'failed login' })
})

router.post('/register', async (req, res) => {

    res.status(200).render('register')

})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const exist = await users.find(user => user.email === email)
    if (exist) return res.status(401).send({ status: 'error', error: 'El usuario ya existe' })


    //     if(!first_name|| !last_name || !email || !password ){
    //         return res.status(401).send({status: 'error', message: 'Todos los campos son obligatorios'})
    //     }
    const user = {
        fist_name,
        last_name,
        email,
        password: createHash(password)
    }
    //     let result = await UserModel.create(user)
    users.push(user)
    const access_token = generateToken (user)

    res.status(200).json({
        status: 'succes',
        //message: 'Usuario registrado correctamente',
        access_token,

    })

})
router.get('/failregister', async (req, res) => {
    console.log('failregister')
    res.status(400).json({ error: 'failer register' })
})
router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'Logout error', message: err })
    })
    res.status(200).redirect('/login')

})





router.get('/restaurarpass', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).send({ status: 'error', message: 'El usuario no existe' })
    }

    //Hashear = actualizar la contraseña del usuario
    user.password = createHash(password)
    await user.save()
})


module.exports = router