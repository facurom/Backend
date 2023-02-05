const {Router} = require ('express')
import { response, Router } from 'express'

const router = Router()

router.get('/', (request, response) =>{
    response.status(200).send({dato2: request.dato2})
})

router.post('/.',(request, response) =>{
    const {name, price} = request.body
    response.status(200).send({name, price})
})
module.express = router