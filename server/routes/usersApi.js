const {GenerateJWT} =require ("../dec-enc");
const UsersApi = require("../users");
var express = require('express');
var usersRouter = express.Router();
const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

usersRouter.post("/SignIn", (req, res) => {
    const { Username, Password } = req.body;
    // Check if the Username is present in the database.
    console.log("here");
    if (typeof UsersApi[req.body.Username] !== "undefined") {
        // Check if the password is right.
        if (UsersApi[req.body.Username] === req.body.Password) {
            const header = {
                alg: "HS512",
                typ: "JWT"
            };
            // Now we need to make the claims based on Username provided by the user.
            const claims = {
                Username
            };
            // Finally, we need to have the key saved on the server side.
            const key = "$PoojaIsAwesome!";
            // Send a success message.
            // By default, the status code will be 200.
            // Send a success message.
            // By default, the status code will be 200.
            res.json({
                Message: "Successfully Signed In!",
                JWT: GenerateJWT(header, claims, key)
            });
        } else {
            // Send a forbidden error if incorrect credentials.
            res.status(403).json({
                Message: "Invalid Username or Password!"
            });
        }
    } else {
        // Send a forbidden error if invalid username.
        res.status(403).json({
            Message: "User Not Found!"
        });
    }
});


usersRouter.post("/SignUp", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(403).json({
            Message: errors,
        });
    }
    const { name, email, password } = req.body;
    // Check if the Username is present in the database.
    console.log("Sign Up here");
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
// Hash password before saving in database
/*            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });*/

        }
    });

    if (typeof UsersApi[req.body.email] !== "undefined") {
        // Check if the password is right.
        if (UsersApi[req.body.Username] === req.body.Password) {
            const header = {
                alg: "HS512",
                typ: "JWT"
            };
            // Now we need to make the claims based on Username provided by the user.
            const claims = {
                Username
            };
            // Finally, we need to have the key saved on the server side.
            const key = "$PoojaIsAwesome!";
            // Send a success message.
            // By default, the status code will be 200.
            // Send a success message.
            // By default, the status code will be 200.
            res.json({
                Message: "Successfully Signed In!",
                JWT: GenerateJWT(header, claims, key)
            });
        } else {
            // Send a forbidden error if incorrect credentials.
            res.status(403).json({
                Message: "Invalid Username or Password!"
            });
        }
    } else {
        // Send a forbidden error if invalid username.
        res.status(403).json({
            Message: "User Not Found!"
        });
    }
});
module.exports = usersRouter;

