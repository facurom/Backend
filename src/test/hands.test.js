const chai = require('chai')
const {createHash, passwordValidation} = require('../src/utils/index')
const UserDTO = require('../dto/user.dto.js')

const expect = chai.expect

describe('Testing Bcrypt utilidad', ()=>{
    it('El servicio debe devolver un hasheo efectivo del pass', async ()=>{
        const password       = 'password123'
        const hashedPassword = await  createHash(password)
        console.log(hashedPassword)
        expect(hashedPassword).to.not.equal(password)

    })
    it('El hasheo realizado debe poder compararse de manera efectiva con el pass original', async ()=>{
        const password       = 'password123'
        const hashedPassword = await  createHash(password)

        const isPassValid = await passwordValidation({password: hashedPassword}, password)
        expect(isPassValid).to.be.true
    })
    it('Si el pass hasheado se altera, debe fallar la comparación con el pass original', async ()=>{
        const password       = 'password123'
        const hashedPassword = await  createHash(password)

        const passAlterado = hashedPassword+'1'

        const isPassValid = await passwordValidation({password: passAlterado}, password)
        expect(isPassValid).to.be.false
    })
})


describe('Testing del UserDTO', ()=>{
    before(function(){
        this.userDto = UserDTO
    })
    it('El DTO debe unificar el nombre y el apellido en una unica propiedad llamada name', ()=>{
        const userMock = {
            first_name: 'Sofi',
            last_name: 'Romero',
            email: 'sofi.rom.rott@gmail.com',
            role: 'user'
        }
        const userDtoToken = UserDTO.getUserTokenFrom(userMock)

        expect(userDtoToken).to.have.property('name', 'Fede Elmejor')
    })
    it('El Dto debe eliminar las propiedades innecesarias', ()=>{
        const userMock = {
            first_name: 'Sofi',
            last_name: 'Romero',
            email: 'sofi.rom.rott@gmail.com',
            role: 'user',
            password: 'SofiaRomRott123'
        }

        const userToken = UserDTO.getUserTokenFrom(userMock)

        expect(userToken).to.not.have.property('first_name')
        expect(userToken).to.not.have.property('last_name')
        expect(userToken).to.not.have.property('password')
    })
    
})