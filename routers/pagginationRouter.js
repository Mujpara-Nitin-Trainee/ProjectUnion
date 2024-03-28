const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  pagging,
  pageOrderby,
  resultGrid,
  pageWithAllFilter,
  singleResult,
  singleAttendance,
  pageSearching,
  pageSearchFilter,
  pageSeachOptimium,
  pageDelimiterSearch
} = require("../controllers/paggingController");

router.get("/", auth, pagging);

router.get("/orderby", auth, pageOrderby);

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

router.post("/searching/delimiterSearch", auth, pageDelimiterSearch)

module.exports = router;
