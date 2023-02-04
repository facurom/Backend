const express = require('express')

const {Router} = express

const router =  Router()

router.get('/', )

router.get('/', (request, response) => {
    response.status(200).send('users')
})


router.post('/api/usuarios', (request, response) =>{
    let user = request.body
    if (user.name || !user.apellido) {
        return response.status(400).send({ mesagge: 'pasar los datos'})
        
    }
    arrayUsuarios.push(user)
    console.log(arrayUsuarios)
    response.status(201).send({
        user,
        message: 'usuario creado'
    })
})
router.put('/api/usuarios/: userId', (request, response) =>{
    const { userId } = request.params
    const index = arrayUsuarios.findIndex(user => user.id === userId)
    if (index === -1) {
        return response.status(400).send( {mesagge: 'No se encuentra el usuario'} )
    }
    
    let user = request.body
    if (!user.nombre || !user.apellido){
        return response.status(400).send({message:'pasar todos los datos'})
    }
    
    arrayUsuarios[index] = user
    console.log(arrayUsuarios)
    
    response.status(201).send({
        users: arrayUsuarios,
        message:'usuario Modificado'
    })

    
})
router.delete('/api/usuarios/:userId' , (request, response) =>{
    let arrayUsuarios = arrayUsuarios.lenght
    let users = arrayUsuarios.filter (user => user.id ===!userId)
    console.log(users.lenght)
    if (users.lenght === arrayTamanno) {
        res.status(404).send({ message: "Usuario no encontrado"})
    }
    res.status(200).send({ message: "Usuario borrado", users})    
})
module.exports = router
