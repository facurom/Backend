const authorization = role => {
    return async ( req, res, next) => {
        // 
        console.log('role: ',role)
        console.log('req: ',req.user)
        if(!req.user) return  res.status(401).json({status: 'error', error: 'Unautorized'})
        if(req.user.role !== role) return res.status(403).json({status: 'error', error: 'No permissions'})
        next()
    }

}

module.exports = {
    authorization
}