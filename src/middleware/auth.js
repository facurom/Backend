function auth (req, res, next){
    if (req.session?.user.name ===! 'admin' || req.session?.admin ) {
        return res.send('No estas autorizado para ver la página')
    }
    return next()
}

module.exports = {
    auth
}