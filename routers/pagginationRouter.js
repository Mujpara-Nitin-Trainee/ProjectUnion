const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {pagging,pageOrderby} = require('../controllers/paggingController');

router.get('/',auth,pagging);

router.get('/orderby',auth,pageOrderby);

module.exports = router;