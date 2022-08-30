const validator = require('../helper/validator');
const signup = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "username": "required|string",
        "password": "required|string|min:6|confirmed",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    signup
};