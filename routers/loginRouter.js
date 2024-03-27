const express = require('express');
const router = express.Router();

const {userLogin,userForgot,userSetPassword,userRemoveAccesscode} = require('../controllers/loginController');

router.get('/login', (req,res) => {
    res.render("login",{message:null});
})

router.post('/login',userLogin);

router.get('/forgot', (req,res) => {
    res.render("Email");
})

router.post('/forgot', userForgot);

router.post('/removeAccess', userRemoveAccesscode);

router.get('/setPassword', userSetPassword);

module.exports = router;