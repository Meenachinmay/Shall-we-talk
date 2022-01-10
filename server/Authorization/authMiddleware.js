// custorm auth middlware
exports.ifUserAuth = async (req, res, next) => {
    const { token } = req.body

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if (err) {
                return res.json({
                    error: err
                })
            }
        }) 
    }
    next()
}