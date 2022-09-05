const User = require('../model/user');
const bcrypt = require('bcrypt');
const regValidation = require('../helper/registrationValidation')
const signValidation = require('../helper/signInValidation')
const jwt = require('jsonwebtoken')


const userController = {

    signup: async (req, res) => {
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
            const userOg = await newUser.save();
            const accesstoken = createAccessToken({ id: userOg._id })
            const refreshtoken = createRefreshToken({ id: userOg._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            return res.status(201).json({
                success: true,
                message: "signup successful",
                data: userOg,
                accesstoken
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
    },

    login: async (req, res) => {

        try {

            const { errors, isValid } = signValidation(req.body);
            if (!isValid) {
                return res.json({ status: 0, errors });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.json({
                    status: 0,
                    errors: { email: "you are not registered *" },
                });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({
                    status: 0,
                    errors: { password: "Invalid Password, please try again" },
                });
            }

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });


            var token = "refreshtoken";
            let maxage = 8 * 60 * 60 * 1000;
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/api/user/refresh_token",
                maxAge: maxage, //user will be logged out after for 8 hrs
            });


            return res.json({
                token: token,
                accesstoken: accesstoken,
                user: user,
                status: 1,
                msg: "Logged in",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    users: async (req, res) => {
        const users = await User.find()
        res.json(users)
    },

    delete: async (req, res) => {

        await User.findByIdAndDelete({ _id: req.params.id })
        res.json({ msg: "deleted successfully" })
    },

    update: async (req, res) => {
        const { username, email } = req.body.userDetail

        const user = await User.findByIdAndUpdate({ _id: req.params.id }, { username: username, email: email })
        res.json({ user, status: 200 })
    },

    singleUser: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id })
        res.json({ user })
    },

    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            // console.log(req.cookies, "cookieeesssss")
            if (!rf_token) {
                return res.json({ status: 0, msg: "Please Login or Register" })
            }

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err) {
                        return res.json({
                            status: 0,
                            msg: "an error occured while verifying referesh token",
                        });
                    }
                    if (!result) {
                        return res.json({ status: 0, msg: "user does not exist" });
                    }
                    // console.log(result, "result");
                    const user = await User.findById(result.id);
                    // console.log(user, "user");

                    let access_token;
                    if (user) {
                        access_token = createAccessToken({ id: user._id });
                    } else {
                        return res.json({ status: 0, msg: "error occured" });
                    }

                    res.json({
                        status: 1,
                        access_token: access_token,
                        user: user,
                    });
                }
            );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            const { email } = req.body

            await User.findOneAndUpdate({ email: email })

            await res.clearCookie('refreshtoken', {
                path: "/api/user/refresh_token"
            });

            return res.json({ status: 1, msg: 'Logged out' })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    }
}



const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
};

module.exports = userController;