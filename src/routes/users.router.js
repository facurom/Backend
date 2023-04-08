const passport = require ('passport')

const {Router, response} = require ('express')
const {passportCall} = require ('../utils/passportCall')
const { UserModel } = require('../models/user.model')
const router =  Router()
const {authorization} = require ('../middleware/authorization.middleware.js.js')

router.get('/', )
// get http://localhost:8080/api/usuarios /
router.get('/', passportCall('jwt'), authorization('admin') ,async (req, res) =>{
    try {
        const { page = 1 } = req.query
        const {  docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await UserModel.paginate({ },{limit: 10, page, lean: true})
        // console.log(users)
        // const users = docs
        res.status(200).render('users', {
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
    } catch (error) {
        console.log(error) 
    }
})



router.get('/:id', (request, response = res ) =>{
    const {id} = request.params
    response.status(200).send(id)
})
router.post('/', async (request, response) =>{
    try {
        let {nombre, apellido, email } = req.body
        if (!nombre || !apellido || !email) {
            return res.status(400).send({ message: 'Pasar todos los datos'})
        }
        
        let result  = await UsersModel.create({
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
    
})
router.put('/:uid',async (req, res) =>{
    const { uid } = request.params
    let (nombre, apellido, email) = request.body
    
    
    if (!nombre || !apellido || !email){
            return res.status(400).send({message:'pasar todos los datos'})
        }
        
        let result = await UsersModel.updateOne({ _id: uid }, { nombre })
        res.status(201).send({
            status: 'success',
            result
        }) 
     
        console.log(error)
    
    

    
})
router.delete('/:uid' , async (req, res) =>{
    const { uid } = req.params
    await UsersModel.deleteOne({_id: uid})
    
    res.status(200).send({ 
        status: 'success',
        result: true
     })
    
})
module.exports = router
