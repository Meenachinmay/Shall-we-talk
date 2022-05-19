// This middleware will try to strict user by sending more than one new register request in one hour. So user can send only one request within one hour.
// So this will prevent system in some cases.

const NewRegistrationRequestData = require('../models/NewRegistrationRequestData.model')

exports.preventFromManyRegisterRequests = async (req, res, next) => {
    const { name, email } = req.body

    //check for new request if its before one hour
    try {
        // check if user already tried with the email
        const checkForTryingInLessThanOneHour = await NewRegistrationRequestData.findOne({email: email})
        if (checkForTryingInLessThanOneHour) {
            const time1 = checkForTryingInLessThanOneHour.triedTime
            const currentTime = new Date().getTime()

            const difference = Math.abs(currentTime - time1) / 3600000
            if (difference < 1) {
                return res.status(400).json({
                    message: "You cannot apply now for new account activation link.",
                    hours: difference
                })
            } else {
                // delete old try
                await NewRegistrationRequestData.deleteOne({email: email})
                // save the email in record table with trying time
                const savedAccountActivationData = new NewRegistrationRequestData({email, triedTime: new Date().getTime()})
                await savedAccountActivationData.save()

            }
        } else {
            // save the email in record table with trying time
            const tempData = new NewRegistrationRequestData({email, triedTime: new Date().getTime()})
            await tempData.save()
        }

        // send here request only
        // const newUser = new User({name, email, savedTime: new Date().getTime()})
        // await newUser.save()
        // return res.status(200).json({
        //     message: "Saved",
        //     user: newUser
        // })
        next()
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}