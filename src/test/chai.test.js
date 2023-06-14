const mongoose  = require('mongoose')
const User = require('../Dao/memory/user.memory.js')
const Assert = require('assert')

mongoose.connect('mongodb://localhost:27017/backenddb')

const assert = Assert.strict

describe('Testing Users Dao', ()=>{
    before(function(){
        this.userDao = new User()
    })
    beforeEach(function(){
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })
    // it('Nuestro dao debe poder obtener un array con Usuario', async function(){
    //     const result = await this.userDao.get()
    //     assert.strictEqual(Array.isArray(result), true)
    // })
    // it('El dao debe agregar un usuario correctamente a la base de datos', async function () {
    //     let mockUser = {
    //         first_name : 'Coder',
    //         last_name : 'Test',
    //         email: 'codertest@gmail.com',
    //         password: '123456'
    //     }
    //     const result = await this.userDao.save(mockUser)
    //     assert.ok(result._id)
    // })
    // it('El dao agregará al documento instertado un arrego de mascota vaciío por defecto', async function () {
    //     let mockUser = {
    //         first_name : 'Coder',
    //         last_name : 'Test',
    //         email: 'codertest@gmail.com',
    //         password: '123456'
    //     }
    //     const result = await this.userDao.save(mockUser)
    //     assert.deepStrictEqual(result.pets, [])
    // })
    it('El dao puede obtener un usuario por email', async function () {
        let mockUser = {
            first_name : 'Coder',
            last_name : 'Test',
            email: 'codertest@gmail.com',
            password: '123456'
        }
        const result = await this.userDao.save(mockUser)

        const user = await this.userDao.getBy({email: result.email})
        console.log(user)
        assert.strictEqual(typeof user, 'object')
    })

})