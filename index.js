require("dotenv").config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT
const mongoose = require('mongoose');
const router = require('./route/router')
const path = require('path')
const connection = "mongodb+srv://himani_09:egdGDupH03fSB06P@user.k9c1btl.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, '../first-task')))

console.log(__dirname)

app.use(bodyParser.json())
app.use(cors())
app.use('/signup', router)
mongoose.connect(connection, {
    useNewUrlParser: true, useUnifiedTopology: true 
})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})