require("dotenv").config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT
const mongoose = require('mongoose');
const routerUser = require('./route/routerUser')
const routerBlog = require('./route/routerBlog')
const path = require('path')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')


app.use(express.static(path.join(__dirname, '../first-task')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())

app.use('/api', routerUser)
app.use('/api', routerBlog)



const connection = "mongodb+srv://himani_09:egdGDupH03fSB06P@user.k9c1btl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})