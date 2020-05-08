const express = require('express');
var morgan = require('morgan')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


var apiRouter = require('./routes/authApi');  //Import routes for "catalog" area of site
var usersRouter = require('./routes/usersApi');


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));






//app.use('/', indexRouter);
app.use('/api/Users', usersRouter);
app.use('/api', apiRouter);  // Add api routes to middleware chain.

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Server listening on port ${port}!`));