const {Router} = require ('express')
import { response, Router } from 'express'

const router = Router()

router.get('/', (request, response) =>{
    response.status(200).send('productos')
})

module.express = router