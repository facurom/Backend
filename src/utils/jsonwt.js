const jwt = require ('jsonwebtoken')

const PRIVATE_KEY = 'CoderKeyQueFuncionaComoUnSecret'

const generateToken = (user) => { 
    const token = jwt.sign({user}, PRIVATE_KEY , {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    //const authHeader = req.headers.authorization
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({status:'error' , error: 'Not autenticated'})
    }

    const token = authHeader.split (' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, credential) =>{
        if (error) {
            return res.status(403).json({status: 'error', error: 'Not authorized'})
        }
        req.user = credential.user
        next()

    })
}

module.exports = {
    PRIVATE_KEY,
    generateToken,
    authToken
}