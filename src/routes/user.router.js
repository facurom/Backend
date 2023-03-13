const express = require('express')
import { Router} from 'express'
import UserModel from '../models/user.model'

const {Router, response} = require ('express')

const UserModel= requiere('../models/user.model.js')
const router =  Router()

router.get('/', )

router.get('/', async (request, res) => {
    try {
        let users = await UserModel.find({})
        if (!users) {
            
        }
        res.status(200).send({
            msg: 'succes',
            users
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/:id', (request, response = res ) =>{
    const {id} = request.params
    response.status(200).send(id)
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
router.put('/api/usuarios/: userId', (req, res = response) =>{
    const { userId } = request.params
    const index = arrayUsuarios.findIndex(user => user.id === userId)
    
    try {
        let (nombre, apellido, email) = request.body
        if (!nombre || !apellido || !email){
            return res.status(400).send({message:'pasar todos los datos'})
        }
        
        let result = await UserModel.create({
            nombre,
            apellido,
            email
        })
        res.status(201).send({
            status: 'success',
            result
        }) 
    } catch (error) {
        console.log(error)
    }
    

    
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
