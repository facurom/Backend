const {request} = require('express')
const usersService = require('../services/users.service.js')
const usersDao = require ('../Dao/usersDaoMemory.js')

class UserController {

    getAllUsers = (req=request, res)=>{
       const users = usersService.getAllUsers()
       res.status(200).json(users)
    }
    
    createUser = (req, res) => {
       const user = req.body
       
       const newUser = usersService.createUser(user)
       res.status(200).json(newUser)
    }
}

module.exports = new UserController()
