let usersDao
let toysDao

switch (condition) {
    case 'memory':
           usersDao= require('../persistence/usersDaoMemory.js') 
           toysDao= require('../persistence/toysDaoMemory.js') 
        break;
    case 'mongo':
        
        break;
    case 'archivo':
        
        break;

    default:
        break;
}

module.exports = {
    usersDao,
    toysDao
}