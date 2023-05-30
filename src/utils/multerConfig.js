const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, filte, cb){
        cb(null, `${__dirname}/public/images`)
    },
    filename: function(req, file, cb) {
        console.log('file: ', file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage, 
    onError: function(err,next){console.log(err)
        next()
    }
    
})
module.exports = {uploader}