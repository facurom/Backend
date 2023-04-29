const { Router, response } = require('express')
const passport = require('passport')
const { passportCall } = require('../utils/passportCall')
const { authorization } = require('../middleware/authorization.middleware')
const { 
    getUsers, 
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller.js')

const router = Router()

router
    // .get('/', passportCall('jwt'), authorization('admin'),async (req, res) =>{
    .get('/', getUsers)
    .get('/:id', getUser)
    .post('/', createUser)
    .put('/:uid', updateUser)
    .delete('/:uid', deleteUser)

module.exports = router
