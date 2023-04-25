const usersDao = require("../Dao/usersDaoMemory");


class UsersSevice {
    getAllUsers(){
        return usersDao.getAllUsers()
    }

    createUser(user){
        return usersDao.createUser(user)
    }
}

module.exports = new UsersSevice()