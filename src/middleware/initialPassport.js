const passport = require("passport")
const { UserModel } = require("../models/user.model")
const GithubStrategy = require ('passport-github2')


function initializePassport(){
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.59ad9eab6fbabbf6',
        clientSecret: '93e7b88e0141b9bf55c1866bf04990bdcfea2c1a',
        callbackURL: 'http://localhost:8080/api/auth/githubcallback',
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('accessToken: ', accessToken)
        console.log('refreshToken ', refreshToken)
        console.log('Profile: ', profile)
        try {
            let user = await UserModel.findOne({email: profile._json.email})
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: 'sofi.rom.rott@gmail.com',
                    password: ''
                }
                let result= await UserModel.create(newUser)
                return done(null, result)
            }
            return done (null, user)
        } catch (error) {
            return done(error)
        }
    }))



        //guarda los datos de la session
    passport.serializeUser((user, done) =>{
        done(null, user.id)
    }) 

        //extrae los datos de la session
    passport.deserializeUser(async (id, done) =>{
        let user = await UserModel.findById(id)
        done(null, user)
    }) 
}
module.exports = {
    initializePassport
}