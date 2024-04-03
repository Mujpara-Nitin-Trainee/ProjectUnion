const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {normalPagging,paggingOrderby} = require("../controllers/PaggingControllers/pageOrderbyController");

const {resultGrid,singleResult,singleAttendance} = require("../controllers/PaggingControllers/studentResultGridController");

const {pageWithAllFilter} = require("../controllers/PaggingControllers/paggingAllFilterController");

const {pageSearching,pageSearchFilter,pageSeachOptimium} = require("../controllers/PaggingControllers/searchingWithPaggingController");

const {pageDelimiterSearch} = require("../controllers/PaggingControllers/delimiterSearchingController");

router.get("/", auth, normalPagging);

router.get("/orderby", auth, paggingOrderby);

router.get("/resultgrid", auth, resultGrid);
router.get("/resultgrid/singleResult", auth, singleResult);
router.get("/resultgrid/attendanceReport", auth, singleAttendance);

router.get("/allFilter", auth, pageWithAllFilter);

router.get("/searching", auth, pageSearching);
router.post("/searching/filter",auth, pageSearchFilter);
router.get("/searching/optimalFilter",auth,pageSeachOptimium);

router.get("/searching/delimiterSearch",auth, (req,res) => {
    let rows;
    res.render('delimiterSearch',{rows});
})
router.post("/searching/delimiterSearch", auth, pageDelimiterSearch);

router.get("/frontside", auth, (req,res) => {
    res.render('frontPagging');
});

router.get("/comments", auth, (req,res) => {
    id = req.query.id || 1;
    res.render('comments',{id});
})

module.exports = router;
