const router = require('express').Router();
const User = require('../model/user');

router.post('/signup', (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        username: username,
        email: email,
        password: password
    })


    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
}
)

module.exports = router;