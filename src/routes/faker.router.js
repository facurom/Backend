const { Router } = require('express')
const { generateUser } = require('../utils/faker')

const router = Router()

router.get('/', (req, res)=>{
    let users = []

    // for la cantidad de usuario
    for(let i = 0; i<100; i++){
        // generateUser()
        users.push(generateUser())
    }

    res.send({
        status: 'success',
        payload: users
    })
})

module.exports = router