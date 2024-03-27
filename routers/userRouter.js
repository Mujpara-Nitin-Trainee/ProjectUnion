const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/home',auth,(req,res) => {
    res.render('Home');
})

router.get('/logout',auth,(req,res) => {
    res.clearCookie('token');
    res.redirect('/api/user/login');
})

module.exports = router;