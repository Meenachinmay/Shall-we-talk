const jwt = require ('jsonwebtoken')

// custorm auth middlware
exports.authenticated = async (req, res, next) => {
    let token  = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if (err) {
                return res.status(401).json({
                    error: err.message,
                    message: "You are not authenticated!"
                })
            } else {
                next()
            }
        }) 
    } else {
        return res.status(400).json({
            message: "There is no auth token provided"
        })
    }
}