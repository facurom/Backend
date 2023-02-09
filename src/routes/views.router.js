const { Router } = require('express')

const router = Router()
const fakeApi = [
    { name:'producto 1', price:'400'},
    { name:'producto 2', price:'200'},
    { name:'producto 3', price:'450'},
    { name:'producto 4', price:'100'},
]
router.get('/', (req, res)=>{
    let testUser = {
        name:'Sofia',
        last_name:'Romero',
        role: 'admin'
    }
    res.render('Index', {
        user: testUser,
        isAdmin: testUser.role==='admin',
        fakeApi,
        style: 'index.css'
    })
})
router.get('/', (req, res)=>{
    res.render('register')
})
module.exports = router
