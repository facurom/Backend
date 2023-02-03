//const express = require('express')
import express, { response } from 'express'


const app = express()
const PORT = 8080

app.use(express.json())


app.use(express.urlencoded({extended: true}))

const arrayUsuarios = [
    {id:'1', nombre:'nombre 1', apellido:'apellido 1'},
    {id:'2', nombre:'nombre 2', apellido:'apellido 2'},
    {id:'3', nombre:'nombre 3', apellido:'apellido 3'},
    {id:'4', nombre:'nombre 4', apellido:'apellido 4'},
]

app.get('/', (request, response) => {
    response.send(arrayUsuarios)
})

app.get('/:idUser', (request, response) =>{ 
    const {idUser} = request.params
    const usuario = arrayUsuarios.find( user => user.id === idUser)
    if (!usuario) return response.send('No existe el usuario')
    response.send(usuario)
})








app.get('/saludo',(req, res) =>{
    res.send('Hola, saludos para todos')
})

app.get('/usuario',(req, res) => {
    res.send({
        nombre: 'usuario',
        apellido: 'usuario',
        edad: 25,
        correo: 'f@gmail.com'
    })
})
app.get ('/params/:nombre/id', ( req, res ) => {
    console.log(req.params)
    const {nombre, id } = req.params
    res.send({
        nombre: nombre,
        id: id, 
    })
})

app.get('/query', ( req, res ) =>{
    console.log(req.query)
    const {nombre, apellido} = req. query
    res.send({
        nombre,
        apellido
    })

})

app.post('/api/usuarios/: userId', (request, response) =>{
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

    app.delete('/api/usuarios/:userId' , (request, response) =>{
        let arrayUsuarios = arrayUsuarios.lenght
        let users = arrayUsuarios.filter (user => user.id ===!userId)
        console.log(users.lenght)
        if (users.lenght === arrayTamanno) {
            res.status(404).send({ message: "Usuario no encontrado"})
        }
        res.status(200).send({ message: "Usuario borrado", users})    
    })
})
