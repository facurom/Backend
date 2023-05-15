const { UserModel} = require ("../Dao/mongo/models/user.model")
const {createHash, isValidPassword} = require ("../utils/bcryptPass")


const registerUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body

    const exist = await UserModel.findOne({email})

    if (exist) return res.status(401).send ({status: 'error', message: 'El usuario ya existe'})
    const hashedPassword = createHash(password)

    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    let result = await UserModel.create(user)

    res.status(200).json({
        status: 'succes',
        message: 'Usuario creado correctamente',
        payload: result
    })

}
const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)

    const user = await UserModel.findOne({email})

    console.log(user)
    if (!user) return res.status(401).send({status: 'error', error:'Usuario o contraseña incorrecto'})

    console.log('logged in!')

    res.send({status: 'succes', message: 'Usuario logueado correctamente'})
}

module.exports = {
    loginUser,
    registerUser
}