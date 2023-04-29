const { Router } = require('express')
//const { UserModel } = require('../models/user.model')
const { UserModel } = require('../Dao/mongo/models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptPass')
const passport = require('passport')
const { generateToken } = require('../utils/jsonwt')
const { token } = require('morgan')

const router = Router()

const products = [
    { title: 'Crema Hidratante', price: '4500', imageUrl: '' },
    { title: 'Crema contorno de ojos', price: '7500', imageUrl: '' },
    { title: 'Jabon en crema', price: '750', imageUrl: '' },

]
let users = [{first_name: 'Sofi', last_name: 'Romero', email:'sofi.rom.rott@gmail.com', password:'so123', role: 'admin'}]


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
//_________________________________________________________________________
router.get('/login', async (req, res)=>{    
    res.status(200).render('login')
})
router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    //  console.log(email, password)
    // encripar la contraseña que viene del formulario, comparar con la encriptada de la base de datos
    // const user = await UserModel.findOne({email, password})
    const user = await users.find(user => user.email === email && user.password === password)
    // console.log(user)

    if (!user) return res.status(401).send({status: 'error', error: 'Invalid credentials'})
    
    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email,
    //     role: 'user'
    // }

    const token = generateToken(user)

    // res.status(200).send({
    //     status: 'success',
    //     access_token,
    //     message: 'Login correcto',
    // })

    res.cookie('coderCookieToken', token, {
        maxAge: 60*60*1000,
        httpOnly: true
    }).send({message: 'logged in'})
})

router.get('/register', async (req, res)=>{
    
    res.status(200).render('register')
})

router.post('/register', async (req, res)=>{ // con base de datos
    const { first_name, last_name, email, password } = req.body

    // pregintar si existe el usuario
    // const exists = await UserModel.findOne({email})
    const exists = await users.find(user => user.email === email)

    if (exists) return res.status(401).send({status: 'error', error: 'El usuario ya existe'})

    const user = {
        first_name,
        last_name,
        email,
        password 
    }
    // let result = await UserModel.create(user)
    users.push(user)
    const access_token = generateToken(user)

    res.status(200).json({
        status: 'success',
        access_token
    })
})

router.get('/logout', async (req, res)=>{
    // session.destroy()
    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', message: err})           
    })
    res.status(200).redirect('/api/auth/login')
})

module.exports = router



