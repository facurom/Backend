const toysDao =  require('../persistence/toysDaoMemory.js')

class ToysService {
    getAllToys= ()=>{
        return toysDao.getAllToys()
    }
    createToy= (toy)=>{
        return toysDao.createToy(toy)
    }
}

module.exports = new ToysService()