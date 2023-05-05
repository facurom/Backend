const { faker } = require('@faker-js/faker')

faker.local = 'es'

const generateProducts = ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departament: faker.commerce.department(),
        stock: faker.random.numeric(1),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image()
    }
}

exports.generateUser = ()=>{
    let numOfProductos = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}))
    let products = []
    for(let i=0; i<numOfProductos; i++){
        products.push(generateProducts())
    }

    return {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        sex: faker.name.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        imagen: faker.image.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}