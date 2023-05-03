const { userService } = require('../routes/repositories')

class UserController {

    getUsers = async (req, res) =>{    
        try {  
            const { limit, page }= req.query
            console.log('limit: ', limit)
            console.log('page: ', page)
            const result = await userService.getUsers(parseInt(limit), parseInt(page))            
            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error) 
        }
    }

    getUser = async (request, response) => {
        try {
            const {id} = request.params
            response.status(200).send(id)            
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (req, res = response) =>{
        //mada el  cliente request 
        try {
            let {nombre, apellido, email } = req.body
            if (!nombre || !apellido || !email) {
                return res.status(400).send({ message: 'Pasar todos los datos'})
            }
    
            let result  = await userService.createUser({            
                                nombre,
                                apellido,
                                email
                            })
            // validación
        
            res.status(201).send({ 
                status: 'success',
                result
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (request, response) =>{

        const { uid } = request.params
        // venga el id   
    
        //manda el  cliente request 
        let { nombre, apellido, email }  = request.body
    
        if (!nombre || !apellido || !email) {
            return response.status(400).send({ message: 'pasar todos los datos'})
        }
    
        // let result = await UsersModel.findByIdAndUpdate({_id: uid}, { nombre }, { new: true })
        let result = await UserModel.updateOne({_id: uid}, { nombre })
    
        response.status(201).send({ 
            status: 'success',
            result : result //-> result
        })
    }

    deleteUser = async (req, res)=> {
        const { uid } = req.params
        await UserModel.deleteOne({_id: uid})
        
        res.status(200).send({ 
            status: 'success',
            result: true
         })
    }

}









// const {request} = require('express')
// const usersService = require('../services/users.service.js')
// const usersDao = require ('../Dao/usersDaoMemory.js')

// class UserController {

//     getAllUsers = (req=request, res)=>{
//        const users = usersService.getAllUsers()
//        res.status(200).json(users)
//     }
    
//     createUser = (req, res) => {
//        const user = req.body
       
//        const newUser = usersService.createUser(user)
//        res.status(200).json(newUser)
//     }
// }

module.exports = new UserController()
