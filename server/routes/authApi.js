var express = require('express');
var router = express.Router();

const { GenerateJWT, DecodeJWT, ValidateJWT } = require("../dec-enc.js");
const welcomeMessage =
    "Welcome to the API Home Page. Please look at the documentation to learn how to use this web service.";

router.get('/', (req, res) => res.send(welcomeMessage));
router.post("/GenerateJWT", (req, res) =>{
    let { header, claims, key } = req.body;
    // In case, due to security reasons, if the client doesn't send a key,
    // use our default key.
    key = key || "$PoojaIsAwesome!";
    res.json(GenerateJWT(header, claims, key));
});
router.post("/DecodeJWT", (req, res) => {
    console.log("req in decode jwt");
    console.log(req.body);
    res.json(DecodeJWT(req.body.sJWS));
});
router.post("/ValidateJWT", (req, res) =>{
    let { header, token, key } = req.body;
    // In case, due to security reasons, if the client doesn't send a key,
    // use our default key.
    key = key || "$PoojaIsAwesome!";
    res.json(ValidateJWT(header, token, key));
});



module.exports = router;