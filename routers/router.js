const express = require('express');
const router = express.Router();

const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const pagginationRouter = require('./pagginationRouter');

router.use('/user',registerRouter);
router.use('/user',loginRouter);
router.use('/user',userRouter);
router.use('/user/pagging',pagginationRouter);

module.exports = router;