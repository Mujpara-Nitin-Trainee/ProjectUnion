const express = require('express');
const router = express.Router();

const {userRegister,userActivate,userRemove, userAuthenticatation,userCheck} = require('../controllers/registerController');

router.get("/register", (req,res) => {
    res.render("Register",{message:null});
})

router.post("/register", userRegister);

router.get("/activate", userAuthenticatation)

router.get("/error", (req,res) => {
    res.render('error');
})

router.post("/activate", userActivate)

router.post("/check", userCheck)

router.post("/remove", userRemove)

module.exports = router;