const jwt = require ('jsonwebtoken')

// custorm auth middlware
exports.ifUserAuth = async (req, res, next) => {
    const { token } = req.body
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if (err) {
                return res.json({
                    error: err,
                    message: "You are not authenticated!, please sign up or login to make a request"
                })
            } else {
                next()
            }
        }) 
    } else {
        return res.status(400).json({
            error: "There is no auth token provided"
        })
    }
}