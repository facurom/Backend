const express = require('express')

const {Router} = express

const router =  Router()

router.get('/', )

app.get('/api/usuarios', (request, response) => {
    response.status(200).send(arrayUsuarios)
})

module.exports = router
