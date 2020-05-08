import axios from "axios";

export const GenerateJWT = (header, claims, key, callback) => {
    // Send POST request to /api/GenerateJWT
    axios
        .post("/api/GenerateJWT", {
            header,
            claims,
            key
        })
        .then(function(res) {
            callback(res);
        })
        .catch(function(err) {
            console.log(err);
        });
};
export const DecodeJWT = (sJWS, callback) => {
    // Send POST request to /api/DecodeJWT
    axios
        .post("/api/DecodeJWT", {
            sJWS
        })
        .then(function(res) {
            callback(res);
        })
        .catch(function(err) {
            console.log(err);
        });
};
export const ValidateJWT = (header, token, key, callback) => {
    // Send POST request to /api/ValidateJWT
    axios
        .post("/api/ValidateJWT", {
            header,
            token,
            key
        })
        .then(function(res) {
            callback(res);
        })
        .catch(function(err) {
            console.log(err);
        });
};