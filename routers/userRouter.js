const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/home',auth,(req,res) => {
    res.render('Home');
})

router.get('/dynamic_table',auth,(req,res) => {
    res.render('dynamic_table');
})

router.get('/kuku_cube',auth,(req,res) => {
    res.render('kuku_cube');
})

router.get('/tic_tac_toe',auth, (req,res) => {
    res.render('tic_tac_toe');
})

router.get('/logout',auth,(req,res) => {
    res.clearCookie('token');
    res.redirect('/api/user/login');
})

module.exports = router;