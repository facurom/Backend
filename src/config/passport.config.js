const passport = require('passport')
const local = require('passport-local')
const {UserModel} = require ('../models/user.model')
const {createHash, isValidPassword} = require('../utils/bcryptPass')

const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true, //acceso a la request (req)
            usernameField: 'email',
        },
        async (req, username, password, done) => {
            const { first_name, last_name, email} = req.body 
            try {
                //verifico si el usuario existe
              let user = await UserModel.findOne({email: username})
              console.log(user)
              if (user) {
                console.log('El usuario ya existe')
                return done(null, false)
              }

              //si valida, crea el usuario
              let newUser ={
                first_name,
                last_name,
                email,
                password: createHash(password)
              }
              let result = await UserModel.create(newUser)
              return done (null, result)
            } catch (error) {
               return done('Error al obtener el usuario'+error) 
            }
        }
    ))
    passport.deserializeUser((user, done) =>{
        done(null, user.id)
    })

    passport.deserializeUser(async(id, done) =>{
        try {
            let user = await UserModel.findById(id)
            done(null, user)
        
        } catch (error) {
            done(error)
        }
    })
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
           const user= await UserModel.findOne({email: username}) 
           if (!user) {
                console.log('Usuario no encontrado')
                return done(null, false)         
           }
           if(!isValidPassword(user, password)) return done(null, false)
        } catch (error) {
            return done (error)
        }
    }))
}
module.exports = {
    initPassport
}