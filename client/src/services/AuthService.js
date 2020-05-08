import axios from "axios";

export const AuthUser = (Username, Password, callback) => {
    console.log("in authUser:");
    console.log(Username);
    axios
        .post("/api/Users/SignIn", {
            Username,
            Password
        })
        .then(function(res) {
            callback(res);
        })
        .catch(function(err) {
            callback(err, true);
        });
};
export const RegisterUser = (name, email, password, history, callback) => {
    console.log("in RegisterUser:");
    console.log(name);
    axios
        .post("/api/Users/SignUp", {
            name,
            email,
            password,
        })
        .then(function(res) {
            callback(res);
        })
        .catch(function(err) {
            callback(err, true);
        });
};