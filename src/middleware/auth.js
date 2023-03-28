function auth (req, res, next){
    if (req.session?.user === 'admin' && req.session?.admin ) {
        return next()
    }
    return res.status(401).send('No autorizado')
}

module.exports = {
    auth
}