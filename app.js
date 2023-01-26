//const express = require('express')
import express, { response } from 'express'


const app = express()
const PORT = 8080

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