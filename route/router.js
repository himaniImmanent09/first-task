const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
// const validation = require('../middleware/validation-middleware')
const regValidation = require('../helper/registrationValidation')
const signValidation = require('../helper/signInValidation')

router.post('/signup', async (req, res) => {
    try {

        const { errors, isValid } = regValidation(req.body)

        if (!isValid) {
            return res.json({ status: 0, errors })
        }

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        const user = await User.findOne({ email });
        if (user) {
            return res.json({
                status: 0,
                errors: { email: "email already exists" }
            })
        }


        const passwordHash = await bcrypt.hash(password, 10)
        var newUser = new User({
            username: username,
            email: email,
            password: passwordHash
        })
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "signup successful",
            data: newUser
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })

        //  // Create token
        //  const token = jwt.sign(
        //     { user_id: newUser._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //       expiresIn: "2h",
        //     }
        //   );
        //   // save user token
        //   newUser.token = token;

    }
}
)

router.post('/login', async (req, res) => {

    const { errors, isValid } = signValidation(req.body.formData)

    if (!isValid) {
        return res.json({ status: 0, errors })
    }


    var email = req.body.formData.email;
    var password = req.body.formData.password;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({
            status: 0,
            errors: { email: "incorrect email" }
        })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.json({
            status: 0,
            errors: { password: "incorrect password" }
        })

    } else {
        return res.json({
            status: 1
            // errors:{email:"user does not exists"}
        })
    }
})

router.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.delete('/delete/:id', async (req, res) => {

    await User.findByIdAndDelete({ _id: req.params.id })
    res.json({ msg: "deleted successfully" })
})

router.post('/update/:id', async (req, res) => {
    const { username, email, password } = req.body.userDetail
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { username: username, email: email, password: password })
    res.json({ user, status: 200 })
})

router.get('/user/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.json({ user })
})

module.exports = router;