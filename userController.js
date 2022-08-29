const User = require('./model/user')

const userControllor = {
    signUp: async (req, res) => {


        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var newUser = new User({
            username: username,
            email: email,
            password: password
        })


        newUser.save()
            .then(() => res.json({
                message: "Created account successfully"
            }))
            .catch(err => res.status(400).json({
                "error": err,
                "message": "Error creating account"
            }))


    }
}

module.exports = userControllor