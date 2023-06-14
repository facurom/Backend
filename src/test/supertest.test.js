const chai = require('chai')
const supertest = require('supertest')

const expect    = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de Commerce', ()=>{
    describe('test de EComm ', ()=>{
        // it('El endpoint POST /api/pets debe crear una mascota correctamente.', async ()=>{
        //     const petMock = {
        //         name: 'Mascotitas', 
        //         specie: 'Perro',
        //         birthDate: '10-10-2022'
        //     }
        //     const {
        //         statusCode,
        //         ok,
        //         _body
        //     } = await requester.post('/api/pets').send(petMock)
        //     // console.log(statusCode)
        //     // console.log(ok)
        //     // console.log(_body)

        //     expect(_body.payload).to.have.property('_id')
        // })
        // it('El metodo Get de mascotas debe obtener las mascotas correctamente', async ()=>{
        //     const {
        //         statusCode,
        //         ok,
        //         _body
        //     } = await requester.get('/api/pets')
        //     // console.log(statusCode, ok, _body)
        //     expect(ok).to.be.equal(true)
        // })
        it('Debe poder cargar un producto con la ruta de imagen', async ()=>{
            const productMock = {
                name: 'Crema hidratante',
                category: 'Dermocosmetica',
                price: '5000'
            }
            const result = await requester.post('/api/pets/withimage')
                                                .field('name', productMock.name)
                                                .field('category', productMock.category)
                                                .field('price', productMock.price)
                                                .attach('image', './test/patitas.jpeg')
            // console.log(result)
            expect(result.status).to.be.equal(200)
            expect(result._body.payload).to.have.property('_id')
            expect(result._body.payload.image).to.be.ok
            // expect()
        })

    })

    // describe('test de session', ()=>{
    //     let cookie
        // it('Debe registrar un usuario correctamente', async ()=>{
        //     const userMock = {
        //         first_name: 'Fede',
        //         last_name: 'Osandón',
        //         email: 'f@gmail.com',
        //         password: 'test123'
        //     }

        //     const {
        //         _body
        //     } = await requester.post('/api/sessions/register').send(userMock)

        //     expect(_body.payload).to.be.ok
        // })

    //     it('Se debe loguear un usuario correctamente y devolver una cookie', async ()=>{
    //         const userMock = {
    //             email: 'f@gmail.com', 
    //             password: 'test123'
    //         }

    //         const result       = await requester.post('/api/sessions/login').send(userMock)
    //         const cookieResult = result.headers['set-cookie'][0]
    //         // console.log(cookieResult)
    //         expect(cookieResult).to.be.ok

    //         cookie = {
    //             name: cookieResult.split('=')[0],
    //             value: cookieResult.split('=')[1]
    //         }

    //         expect(cookie.name).to.be.ok.and.equal('coderCookie')
    //         expect(cookie.value).to.be.ok
    //     })

    //     it('Debe enviar la cookie que contiene un user y extraer los datos correctamente', async ()=>{
    //         const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
    //         expect(_body.payload.email).to.be.eql('f@gmail.com')
    //     })


    // })
})