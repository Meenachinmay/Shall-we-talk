// middleware to check if user is already activated the account
exports.alreadyAccountActivated = async (req, res, next) => {
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