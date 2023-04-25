const toysDao =  require('../Dao/toysDaoMemory')

class ToysService {
    getAllToys= ()=>{
        return toysDao.getAllToys()
    }
    createToy= (toy)=>{
        return toysDao.createToy(toy)
    }
}

module.exports = new ToysService()