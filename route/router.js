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

router.post('/login', async (req, res) => {
    var email = req.body.formData.email;
    var password = req.body.formData.password;

    const user = await User.findOne({ email });

    if (user.password === password) {
        res.json(200)
    }
})

router.get('/users', async (req, res) => {
    const users = await User.find()
    //    console.log(users)
    res.json(users)
})

router.delete('/delete/:id', async (req, res) => {

    await User.findByIdAndDelete({ _id: req.params.id })
    res.json({ msg: "deleted successfully" })
})

router.post('/update/:id', async(req,res)=>{
    const{username, email, password} = req.body.userDetail
    const user = await User.findByIdAndUpdate({_id: req.params.id},{username:username, email:email, password: password})
    res.json({user, status:200})
})

router.get('/user/:id', async(req, res)=>{
   const user =  await User.findOne({_id:req.params.id})
   res.json({user})
})

module.exports = router;