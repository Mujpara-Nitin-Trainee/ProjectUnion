const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {pagging,pageOrderby,resultGrid,pageWithAllFilter,singleResult,singleAttendance} = require('../controllers/paggingController');

router.get('/',auth,pagging);

router.get('/orderby',auth,pageOrderby);

router.get('/resultgrid',auth,resultGrid);
router.get('/resultgrid/singleResult',auth,singleResult);
router.get('/resultgrid/attendanceReport',auth,singleAttendance);

router.get('/allFilter',auth,pageWithAllFilter);

module.exports = router;