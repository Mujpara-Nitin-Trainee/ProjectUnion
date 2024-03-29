const express = require('express');
const router = express.Router();

const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const pagginationRouter = require('./pagginationRouter');
const jobFormRouter = require('./JobFormRouter');

router.use('/user',registerRouter);
router.use('/user',loginRouter);
router.use('/user',userRouter);
router.use('/user/pagging',pagginationRouter);

router.use('/user/jobForm',jobFormRouter);

module.exports = router;