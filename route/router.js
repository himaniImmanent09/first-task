const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    const passwordHash = await bcrypt.hash(password, 10)
    var newUser = new User({
        username: username,
        email: email,
        password: passwordHash
    })
    try {
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
    var email = req.body.formData.email;
    var password = req.body.formData.password;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password)

       

    if (!isMatch) {
        return res.json(400)

    } else {
  
          return res.json(200)

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