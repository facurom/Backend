const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'Usuarios'
const UserSchema = Schema({
    first_name: {
        type: String,
        index: true,
        require: true 
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
      type: String,
      required: true,
      unique: true

    },
    password: String
})

UserSchema.plugin(mongoosePaginate)

let UserModel = model(userCollection, UserSchema)

module.exports = {UserModel}
